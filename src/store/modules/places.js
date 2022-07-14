
"use strict";

import {createRequestAction} from "@/store/utils/storeRequest";
import tokenNoJsonRequest from "@/utils/tokenNoJsonRequest";

const state = {
  imageLoading: false
};
const actions = {
  async updateImage({commit}, {id, file}) {
    commit("setImageLoading", true);
    const formData = new FormData();
    formData.append('file', file);
    await tokenNoJsonRequest('places/images/' + id, {
      method: "POST",
      body: formData
    });
    //const r = await dispatch('fetchOne', id);
    commit("setImageLoading", false);
    //return r;
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

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
