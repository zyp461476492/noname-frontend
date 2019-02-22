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
  notifyMsg,
  ajaxSuccess,
  now,
  msg
} from "@/plugins/common.js";
import "./assets/iconfont/iconfont.css";

// JWT 用户权限校验，判断 TOKEN 是否在 localStorage 当中
router.beforeEach(({
  name
}, from, next) => {
  // 获取 JWT Token
  if (sessionStorage.getItem('JWT_TOKEN')) {
    // 如果用户在Login页面
    if (name === 'Login') {
      next({
        name: 'App'
      });
    } else {
      next();
    }
  } else {
    if (name === 'Login') {
      next();
    } else {
      next({
        name: 'Login'
      });
    }
  }
});

// 配置axios
// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (sessionStorage.JWT_TOKEN) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.user_token = `${sessionStorage.JWT_TOKEN}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    switch (response.data.code) {
      case 1:
        // 认证失败，此时要退回登录，清除数据
        msg("登录信息已过期", "error");
        sessionStorage.removeItem('JWT_TOKEN');
        router.replace({
          path: '/login'
        });
        break;
      case 0xFFFF:
        // 统一提示，数据请求失败
        msg("数据请求(操作)失败", "error");
        break;
    }
    return response;
  },
  error => {
    if (error.response) {
      // 请求发生异常时，有可能是后台服务异常，此时不需要回退至登录页面
      msg("数据请求发生异常，请稍后重试", "error");
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  });


// 注入ajax
Vue.prototype.$getDataByApi = getDataByApi;
Vue.prototype.$ajaxSuccess = ajaxSuccess;
Vue.prototype.$now = now;
// 注入全局通知方法
Vue.prototype.$notifyMsg = notifyMsg;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(RouterVue),
}).$mount('#app')