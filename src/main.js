import Vue from 'vue';
import RouterVue from './views/router.vue';
// import App from './views/App.vue';
import router from "./router";
import axios from "axios";
import "./plugins/vuetify";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(RouterVue),
}).$mount('#app')