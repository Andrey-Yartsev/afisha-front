import anyRequest from "@/utils/anyRequest";
import tokenRequest from "../../utils/tokenRequest";
import request from "../../utils/request";
import userTokenRequest from "../../utils/userTokenRequest";
import BrowserStore from "store";
// import Router from "@/router";

const isOffline = () => {
  return true;
  return global.navigator && global.navigator.onLine === false;
};

const storeRequest = (
  requestType,
  prefix,
  commit,
  dispatch,
  apiPath,
  options,
  { state, localError, resultKey, resultConvert, throw400, debugLoading }
) => {
  return new Promise((accept, reject) => {
    commit(prefix + "ResetError");
    commit(prefix + "Request");
    commit(prefix + "Success", false);

    if (isOffline()) {
      // dispatch(
      //   "global/flashToast",
      //   { text: "Internet connection problems" },
      //   {
      //     root: true
      //   }
      // );
      commit(prefix + "Requested");
      return;
    }

    const requests = {
      any: anyRequest,
      token: tokenRequest,
      "no-token": request,
      "user-token": userTokenRequest
    };
    const Request = requests[requestType];
    Request(apiPath, options)
      .then(async response => {
        if (response.status === 401) {
          BrowserStore.remove("vk-token");
          // Router.push("/login");
          return;
        }
        if (response.status === 200) {
          const done = async () => {
            commit(prefix + "Success", true);
            let r = await response.json();
            accept(r);
            if (resultConvert) {
              r = resultConvert(r, state);
            }
            commit(resultKey, r);
            commit(prefix + "Requested");
          };
          if (debugLoading) {
            setTimeout(done, 5000);
          } else {
            done();
          }
        } else {
          let r;
          try {
            r = await response.json();
          } catch (e) {
            dispatch(
              "request/setError",
              { message: "Server error" },
              { root: true }
            );
            commit(prefix + "Success", false);
            commit(prefix + "Requested");
            return;
          }
          if (localError) {
            commit(prefix + "Error", r.error);
          } else {
            dispatch("request/setError", r.error, { root: true });
          }
          commit(prefix + "Success", false);
          commit(prefix + "Requested");

          if (response.status !== 400 || throw400) {
            reject(r.error);
          }
        }
      })
      .catch(error => {
        commit(prefix + "Requested");
        if (error.name === "TypeError") {
          console.error(error);
          error = { message: error.toString() };
        }
        if (localError) {
          commit(prefix + "Error", error);
        } else {
          dispatch("request/setError", error, { root: true });
        }
        reject(error);
      });
  });
};

const buildInitState = (
  prefix,
  state,
  resultKey,
  defaultResultValue,
  defaultLoading
) => {
  state[prefix + "Error"] = null;
  state[prefix + "Loading"] = defaultLoading || false;
  state[prefix + "Success"] = null;
  if (resultKey && !state[resultKey]) {
    state[resultKey] = defaultResultValue;
  }
};

const buildMutations = (prefix, mutations, resultKey) => {
  mutations[prefix + "Error"] = (state, error) => {
    state[prefix + "Error"] = error;
  };
  mutations[prefix + "ResetError"] = state => {
    state[prefix + "Error"] = null;
  };
  mutations[prefix + "Request"] = state => {
    state[prefix + "Loading"] = true;
  };
  mutations[prefix + "Requested"] = state => {
    state[prefix + "Loading"] = false;
  };
  mutations[prefix + "Success"] = (state, value) => {
    state[prefix + "Success"] = value;
  };
  mutations[prefix + "Reset"] = (state, value) => {
    state[prefix + "Error"] = null;
    state[prefix + "Loading"] = false;
    state[prefix + "Success"] = null;
    if (resultKey) {
      state[resultKey] = value;
    } else {
      state[prefix + "Result"] = null;
    }
  };
  if (resultKey) {
    mutations[resultKey] = (state, value) => {
      state[resultKey] = value;
    };
  }
};

const createRequestAction = ({
  requestType,
  prefix,
  apiPath,
  state,
  mutations,
  actions,
  options,
  localError,
  resultKey,
  resultConvert,
  defaultResultValue,
  defaultLoading,
  paramsToOptions,
  paramsToPath,
  throw400,
  debugLoading
}) => {
  if (!resultKey) {
    resultKey = prefix + "Result";
  }

  actions[prefix] = function({ commit, dispatch, state }, params) {
    if (params !== undefined && paramsToOptions) {
      options = paramsToOptions(params, options, state);
    }
    let _apiPath = null;
    if (params !== undefined && paramsToPath) {
      _apiPath = paramsToPath(params, apiPath);
    }
    if (!requestType) {
      requestType = "token";
    }
    return storeRequest(
      requestType,
      prefix,
      commit,
      dispatch,
      _apiPath || apiPath,
      options,
      {
        state,
        localError,
        resultKey,
        resultConvert,
        throw400,
        debugLoading
      }
    );
  };

  actions[prefix + "Reset"] = function({ commit }) {
    if (defaultResultValue) {
      commit(prefix + "Reset", defaultResultValue);
    } else {
      commit(prefix + "Reset", null);
    }
  };

  if (!defaultResultValue) {
    defaultResultValue = null;
  }

  buildInitState(prefix, state, resultKey, defaultResultValue, defaultLoading);
  buildMutations(prefix, mutations, resultKey);
};

export { createRequestAction, storeRequest, buildMutations, buildInitState };
