import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  name: 'root',
  router,
  store,   // 每个组件插入$store 属性
  render: h => h(App)
}).$mount('#app')
