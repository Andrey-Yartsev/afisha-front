"use strict";

import BrowserStore from "store";
import {createRequestAction} from "@/store/utils/storeRequest";

const findGetParameter = (parameterName) => {
  let result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

const state = {
  user: null
};

const actions = {
  async init({ dispatch, commit }) {
    let token = findGetParameter("vk-token");
    if (!token) {
      token = BrowserStore.get("vk-token", token);
      if (!token) {
        return;
      }
    } else {
      console.trace("XXXX")
      window.location.replace(window.location.origin);
    }
    BrowserStore.set("vk-token", token);
    console.log("vk-token set ", token);
    const user = await dispatch("auth");
    commit("setUser", user);
  },
  logout({ commit }) {
    BrowserStore.remove("vk-token");
    commit("setUser", null);
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  }
};

createRequestAction({
  prefix: "auth",
  requestType: "user-token",
  apiPath: "me",
  state,
  mutations,
  actions,
  options: {
    method: "GET"
  },
  paramsToOptions: function(params, options) {
    options.data = params;
    return options;
  }
});

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
