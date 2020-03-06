import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 1.引入fastClick解决移动端300ms延迟问题
import FastClick from "fastclick";
//toast插件引入
import toast from "@/components/common/toast/index";
// lazyload图片懒加载模块的导入
import VueLazyLoad from "vue-lazyload";

Vue.config.productionTip = false;

//事件总线
Vue.prototype.$bus = new Vue();
// 安装toast插件
Vue.use(toast);
// 2.引入fastClick解决移动端300ms延迟问题
FastClick.attach(document.body);
// 图片懒加载插件的安装
Vue.use(VueLazyLoad);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
