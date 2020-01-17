import Vue from 'vue'
import Vuex from 'vuex'

//1.使用vuex插件
Vue.use(Vuex)

//2.创建Store对象
const store = new Vuex.Store({
  //单一状态树-------------------------------------------------------
  state: {
    cartList: []
  },
  //需要修改state中的状态的唯一提交方法------------------------------
  mutations: {

  },
  //相当于计算属性--------------------------------------------
  getters: {

  },
  //actions异步改变时--------------------------------------------
  actions: {

  },
  //模块--------------------------------------------
  modules: {

  }
})

//3.挂载到Vue实例上
export default store
