import { createRouter, createWebHistory } from 'vue-router'

import Afisha from "../components/afisha/Scene.vue";
import AfishaSearch from "../components/afisha/afishaSearch/Scene.vue";
import Contacts from "../components/contacts/Scene.vue";
import Places from "../components/places/Scene.vue";
import Place from "../components/place/Scene.vue";

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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;