
"use strict";

import {createRequestAction} from "@/store/utils/storeRequest";
import tokenNoJsonRequest from "@/utils/tokenNoJsonRequest";

const state = {
  imageLoading: false
};
const actions = {
  async updateImage({commit, dispatch}, {id, file}) {
    commit("setImageLoading", true);
    const formData = new FormData();
    formData.append('file', file);
    await tokenNoJsonRequest('places/images/' + id, {
      method: "POST",
      body: formData
    });
    await dispatch('fetch');
    commit("setImageLoading", false);
  },
  async deleteImage({ dispatch }, params) {
    await dispatch("_deleteImage", params);
    await dispatch("fetch");
  }
};
const mutations = {
  setImageLoading(state, flag) {
    state.imageLoading = flag;
  }
};

createRequestAction({
  prefix: "fetch",
  requestType: "no-token",
  apiPath: "places",
  state,
  mutations,
  actions,
  options: {
    method: "GET"
  },
  defaultResultValue: [],
  paramsToPath: function (params, path) {
    return path + "/" + params;
  }
});

createRequestAction({
  prefix: "_deleteImage",
  requestType: "token",
  apiPath: "places/images",
  state,
  mutations,
  actions,
  options: {
    method: "DELETE"
  },
  defaultResultValue: [],
  paramsToPath: function (params, path) {
    return path + "/" + params.id;
  }
});

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
