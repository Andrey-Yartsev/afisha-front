import Vue from "vue";
import Router from "vue-router";

import Afisha from "../components/afisha/Scene";
import Contacts from "../components/contacts/Scene";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: Afisha
  },
  {
    path: "/afisha/:dt",
    component: Afisha
  },
  {
    path: "/contacts",
    component: Contacts
  }
];

export default new Router({
  mode: "history",
  base: __dirname,
  routes
});


