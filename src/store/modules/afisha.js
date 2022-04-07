"use strict";

import {createRequestAction} from "@/store/utils/storeRequest";
import BrowserStore from "store";
import tokenNoJsonRequest from "@/utils/tokenNoJsonRequest";
const password = BrowserStore.get('password');

const state = {
  userImageLoadingId: null
};
const actions = {
  async addUserImage({dispatch, commit}, {id, file}) {
    commit("setUserImageLoadingId", id);
    const formData = new FormData();
    formData.append('file', file);
    await tokenNoJsonRequest('events/images/' + id, {
      method: "POST",
      body: formData
    });
    const r = await dispatch('fetchOne', id);
    commit("setUserImageLoadingId", null);
    return r;
  },
  async deleteUserImage({dispatch}, {eventId, imageId}) {
    await dispatch("_deleteUserImage", imageId);
    return await dispatch("fetchOne", eventId);
  },
  async fetchOne({dispatch, commit}, id) {
    const item = await dispatch("_fetchOne", id);
    commit("replaceItem", item);
    return item;
  },
  async createEvent({dispatch, commit}, id) {
    const item = await dispatch("_createEvent", id);
    commit("addItem", item);
    return item;
  },
  async updateEvent({dispatch, commit}, id) {
    const item = await dispatch("_updateEvent", id);
    commit("replaceItem", item);
    return item;
  },
  async removeEvent({dispatch, commit}, id) {
    await dispatch("_removeEvent", id);
    commit("removeItem", id);
  }
};

const mutations = {
  replaceItem(state, item) {
    state.fetchResult = state.fetchResult.map(v => {
      if (v.id === item.id) {
        return item;
      }
      return v;
    });
    state.fetchLastUpdatedResult = state.fetchLastUpdatedResult.map(v => {
      if (v.id === item.id) {
        return item;
      }
      return v;
    });
  },
  removeItem(state, id) {
    state.fetchResult = state.fetchResult.filter(v => {
      console.log(v.id, id);
      return v.id !== id;
    });
  },
  addItem(state, item) {
    // console.log(item);
    state.fetchResult.push(item);
  },
  setUserImageLoadingId(state, eventId) {
    state.userImageLoadingId = eventId;
  }
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
  paramsToPath: function (params, path) {
    return path + "/" + params;
  }
});

createRequestAction({
  prefix: "_fetchOne",
  requestType: "no-token",
  apiPath: "event/{id}",
  state,
  mutations,
  actions,
  options: {
    method: "GET"
  },
  defaultResultValue: [],
  paramsToPath: function (params, path) {
    return path.replace(/{id}/, params);
  }
});

createRequestAction({
  prefix: "_updateEvent",
  requestType: "token",
  apiPath: "admin/events/{id}",
  state,
  mutations,
  actions,
  options: {
    method: "POST"
  },
  paramsToPath: function (params, path) {
    return path.replace(/{id}/, params.id);
  },
  paramsToOptions: function (params, options) {
    options.data = params.data;
    return options;
  }
});

createRequestAction({
  prefix: "_removeEvent",
  requestType: "token",
  apiPath: "admin/events/{id}",
  state,
  mutations,
  actions,
  options: {
    method: "DELETE"
  },
  paramsToPath: function (id, path) {
    return path.replace(/{id}/, id);
  }
});

createRequestAction({
  prefix: "_createEvent",
  requestType: "token",
  apiPath: "admin/events",
  state,
  mutations,
  actions,
  options: {
    method: "POST"
  },
  paramsToOptions: function (params, options) {
    console.log(params.data);
    options.data = params.data;
    return options;
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
  paramsToPath: function (params, path) {
    return path.replace(/{month}/, params);
  }
});

createRequestAction({
  prefix: "_deleteUserImage",
  requestType: "no-token",
  apiPath: "events/images/{id}",
  state,
  mutations,
  actions,
  options: {
    method: "DELETE"
  },
  paramsToPath: function (params, path) {
    return path.replace(/{id}/, params) + "?access_token=" + password;
  }
});


export default {
  namespaced: true,
  state,
  actions,
  mutations
};
