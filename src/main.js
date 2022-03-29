import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/en"; // lang i18n

import "@/styles/index.scss"; // global css

import App from "./App";
import store from "./store";
import router from "./router";

import "@/icons"; // icon
import "@/permission"; // permission control

if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

// 注册全局组件 chart
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
Vue.component("chart", ECharts);

Vue.use(ElementUI, { locale });

new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
