import Vue from 'vue';
import RouterVue from './views/router.vue';
// import App from './views/App.vue';
import {formatDate} from '@/plugins/dateFormate.js';
import router from "./router";
import axios from "axios";
import "./plugins/vuetify";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false

// 添加全局过滤器
Vue.filter('formateDate', function (value) {
  let date = new Date(value);
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
})

new Vue({
  router,
  render: h => h(RouterVue),
}).$mount('#app')