import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "@/store";
import VueQuillEditor from 'vue-quill-editor'
const VueInputMask = require('vue-inputmask').default;

Vue.use(VueInputMask);
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false

Vue.use(router);

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
