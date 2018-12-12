import Vue from 'vue';
import router from "./router";
import axios from "axios";
import "./plugins/vuetify";
import "./plugins/filter";
import "./plugins/element";
import RouterVue from './views/router.vue';

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(RouterVue),
}).$mount('#app')