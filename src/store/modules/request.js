"use strict";

const state = {
  error: null,
};

const actions = {
  setError({commit}, error) {
    if (error && error.message === "cancelled") {
      return;
    }
    commit("setError", error);
  }
};

const mutations = {
  setError(state, error) {
    state.error = error;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
