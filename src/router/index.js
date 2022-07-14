import Vue from "vue";
import Router from "vue-router";

import Afisha from "../components/afisha/Scene";
import AfishaSearch from "../components/afisha/afishaSearch/Scene";
import Contacts from "../components/contacts/Scene";
import Places from "../components/places/Scene";
import Place from "../components/place/Scene";

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
    path: "/afisha/search/:word",
    component: AfishaSearch
  },  {
    path: "/contacts",
    component: Contacts
  },
  {
    path: "/places",
    component: Places
  },
  {
    path: "/place/:id",
    component: Place
  },
];

export default new Router({
  mode: "history",
  base: __dirname,
  routes
});


