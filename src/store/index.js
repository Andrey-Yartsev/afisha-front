import request from "./modules/request";
import modal from "./modules/modal";
import adminAuth from "./modules/adminAuth";
import auth from "./modules/auth";
import afisha from "./modules/afisha";
import places from "./modules/places";

import {createStore} from "vuex";

export default createStore({
  modules: {
    request,
    modal,
    adminAuth,
    auth,
    afisha,
    places
  }
})