import Vue from "vue";
import Vuex from "vuex";

import request from "./modules/request";
import afisha from "./modules/afisha";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  modules: {
    request,
    afisha
  }
});

export default store;
