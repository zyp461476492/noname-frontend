import Vue from 'vue';
import router from "./router";
import axios from "axios";
import "./plugins/filter";
import "./plugins/element";
import RouterVue from './views/router.vue';
import { getDataByApi } from "@/plugins/ajax.js";

// 注入axios
Vue.prototype.$getDataByApi = getDataByApi;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(RouterVue),
}).$mount('#app')