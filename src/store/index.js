import Vue from "vue";
import Vuex from "vuex";

import request from "./modules/request";
import modal from "./modules/modal";
import adminAuth from "./modules/adminAuth";
import auth from "./modules/auth";
import afisha from "./modules/afisha";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  modules: {
    request,
    modal,
    adminAuth,
    auth,
    afisha
  }
});

export default store;
