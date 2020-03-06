import Toast from "./Toast.vue";
const obj = {};

// 当安装插件Vue.use()时，本质上是执行obj.install函数
obj.install = function(Vue) {
  // 1.创建组件构造器
  const toastConstructor = Vue.extend(Toast);
  //2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor();
  //3.将组件对象，手动挂载到某个元素上
  toast.$mount(document.createElement("div"));
  //4.toast.$el对应的就是div
  document.body.appendChild(toast.$el);
  //5.把创建出来的插件映射到Vue原型中
  Vue.prototype.$toast = toast;
};

export default obj;
