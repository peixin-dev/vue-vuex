import Vue from 'vue'
import Vuex from 'vuex'


// use  插件的使用  会默认调用这个库的install 方法
Vue.use(Vuex)     

export default new Vuex.Store({

  modules: {
    a: {
      state: {x: 1}
    },
    b: {
      state: {y: 'abc'}
    }
  },
  state: {
    name: 'wq',
    num: 3
  },
  getters:{
    myString(state){
      return state.name + '123'
    }
  },
  mutations: {
    syncAdd(state, payload){
      return state.num += payload
    },
    syncMinus(state, payload){
      return state.num -= payload
    }
  },
  actions: {
    asyncMinus({dispatch, commit}, payload){
      setTimeout(() => {
        commit('syncMinus', payload)
      },2000)
      
    }
  },
})
