import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
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