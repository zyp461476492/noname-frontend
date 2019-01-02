import Vue from 'vue';
import router from "./router";
import axios from "axios";
import "./plugins/filter";
import "./plugins/element";
import "./plugins/common";
import RouterVue from './views/router.vue';
import {
  getDataByApi
} from "@/plugins/ajax.js";
import {
  notifyMsg
} from "@/plugins/common.js";

// 注入ajax
Vue.prototype.$getDataByApi = getDataByApi;
// 注入全局通知方法
Vue.prototype.$notifyMsg = notifyMsg;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(RouterVue),
}).$mount('#app')