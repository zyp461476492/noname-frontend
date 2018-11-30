import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import "vuetify/dist/vuetify.min.css";
// Translation provided by Vuetify (javascript)
import zhHans from "vuetify/es5/locale/zh-Hans";

// 注入axios
Vue.prototype.$vuetify = Vuetify;
Vue.use(Vuetify, {
  iconfont: "md",
  lang: {
    locales: {
      "zh-Hans": zhHans
    },
    current: "zh-Hans"
  }
});