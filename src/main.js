
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index'
import store from '@/store/index'
import api from '@/api'
import '@/components/base/_globals'
//import '@/registerServiceWorker'

// Plugins
Vue.use(api)

// For component performance tracking, see: https://vuedose.tips/tips/measure-runtime-performance-in-vue-js-apps/
Vue.config.performance = process.env.NODE_ENV !== 'production' ? true : false
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
