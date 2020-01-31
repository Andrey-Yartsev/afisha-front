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

createRequestAction({
  prefix: "fetchLastUpdated",
  requestType: "no-token",
  apiPath: "events/last-updated",
  state,
  mutations,
  actions,
  options: {
    method: "GET"
  },
  defaultResultValue: []
});

createRequestAction({
  prefix: "fetchExists",
  requestType: "no-token",
  apiPath: "events/exists/{month}",
  state,
  mutations,
  actions,
  options: {
    method: "GET"
  },
  defaultResultValue: [],
  paramsToPath: function(params, path) {
    return path.replace(/{month}/, params);
  }
});

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
