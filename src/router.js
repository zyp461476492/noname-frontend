import Vue from "vue";
import Router from "vue-router";
import App from './views/App.vue';
import Login from './views/login.vue';
import UserConfig from './views/sys/user/userList.vue';
import TreeConfig from './views/sys/org/orgList.vue';
import MenuConfig from './views/sys/menu/menuView.vue';
Vue.use(Router);

export default new Router({
  routes: [{
    name: "App",
    path: "/main",
    component: App,
    children: [{
        path: 'userConfig',
        component: UserConfig
      },
      {
        path: 'treeConfig',
        component: TreeConfig
      },
      {
        path: 'menuConfig',
        component: MenuConfig
      }
    ]
  }, {
    name: "Login",
    path: '/login',
    component: Login
  }]
});