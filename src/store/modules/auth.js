"use strict";

import { createRequestAction } from "@/store/utils/storeRequest";
import BrowserStore from "store";

const state = {
  authorized: false
};

const actions = {
  init({ dispatch, commit }) {
    const password = BrowserStore.get('password');
    console.log('password', password);
    if (password) {
      dispatch("_login", { password }).then(r => {
        if (r.error) {
          BrowserStore.remove('password');
        } else {
          commit("setAuthorized", true);
        }
      });
    }
  },
  login({ dispatch, commit }, data) {
    return new Promise((accept, reject) => {
      dispatch("_login", data).then(r => {
        if (r.error) {
          reject(r.error);
        } else {
          BrowserStore.set("password", data.password);
          commit("setAuthorized", true);
          accept();
        }
      });
    });
  },
  logout({ commit }) {
    BrowserStore.remove("password");
    commit("setAuthorized", false);
  }
};
const mutations = {
  setAuthorized(state, flag) {
    state.authorized = flag;
  }
};

createRequestAction({
  prefix: "_login",
  requestType: "no-token",
  apiPath: "admin/login",
  state,
  mutations,
  actions,
  options: {
    method: "POST"
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
