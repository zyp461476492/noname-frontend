import Vue from "vue";
import Router from "vue-router";
import App from './views/App.vue';
import Login from './views/login.vue';
Vue.use(Router);

export default new Router({
  routes: [{
    name: "App",
    path: "/main",
    component: App
  }, {
    name: "Login",
    path: '/login',
    component: Login
  }]
});