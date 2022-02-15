"use strict";

import modalTypes from "@/components/modal/types";

function initState(data) {
  if (!data.length) {
    return {};
  }
  const state = {};
  data.forEach(item => {
    if (!state[item.storeName]) {
      state[item.storeName] = {
        show: false,
        data: {}
      };
    }
  });
  return state;
}

const state = {
  ...initState(modalTypes)
};

const mutations = {
  show(state, { name, data }) {
    state[name].show = true;
    if (data) {
      state[name].data = data;
    }
  },
  hide(state, name) {
    state[name].show = false;
    state[name].data = {};
  },
  hideSafe(state, { name }) {
    state[name].show = false;
  },
  hideAll(state) {
    for (let name in state) {
      state[name].show = false;
      state[name].data = {};
    }
  }
};

const actions = {
  show({ commit }, { name, data }) {
    commit("show", { name, data });
  },

  hide({ commit }, name) {
    commit("hide", name);
  },

  hideAll({ commit }) {
    commit("hideAll");
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
