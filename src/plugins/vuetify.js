import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import "vuetify/dist/vuetify.min.css";
// Translation provided by Vuetify (javascript)
import zhHans from "vuetify/es5/locale/zh-Hans";

// 注入vuetify
Vue.prototype.$vuetify = Vuetify;
Vue.use(Vuetify, {
  iconfont: "mdi",
  lang: {
    locales: {
      "zh-Hans": zhHans
    },
    current: "zh-Hans"
  }
});