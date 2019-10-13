import Vue from "vue";
import Vuex from "vuex";

import afisha from "./modules/afisha";

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",

  modules: {
    afisha
  }
});

export default store;
