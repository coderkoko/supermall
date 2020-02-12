import Vue from "vue";
import Vuex from "vuex";

import mutations from "./mutations";
import actions from "./actions";

//1.安装vuex插件
Vue.use(Vuex);

//2.创建Store对象
const state = {
  cartList: []
};

const store = new Vuex.Store({
  //单一状态树-------------------------------------------------------
  state,
  //需要修改state中的状态的唯一提交方法------------------------------
  mutations,
  //相当于计算属性--------------------------------------------
  getters: {},
  //actions异步改变时--------------------------------------------
  //在mutations中存在一些复杂的方法也可以放到actions中
  actions,
  //模块--------------------------------------------
  modules: {}
});

//3.挂载到Vue实例上
export default store;
