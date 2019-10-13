"use strict";

import { createRequestAction } from "@/store/utils/storeRequest";

const state = {};
const actions = {};

const mutations = {
};

createRequestAction({
  prefix: "fetch",
  requestType: "no-token",
  apiPath: "events",
  state,
  mutations,
  actions,
  options: {
    method: "GET"
  },
  defaultResultValue: [],
  paramsToPath: function(params, path) {
    return path + "/" + params;
  }
});

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
