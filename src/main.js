import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router/index';
import store from '@/store/index';
import api from "@/api"
//import appActions from "@/api/appActions.js"
//import VueHead from 'vue-head'
import '@/components/base/_globals'; // global base components
import '@/registerServiceWorker';
//import axios from 'axios' // htpmathtps://github.com/axios/axios

//Vue.use(api, 'firebase')
Vue.use(api)

//Vue.prototype.$app = appActions

//Vue.use(VueHead);

Vue.config.productionTip = false;
Vue.config.performance = process.env.NODE_ENV !== 'production' ? true : false;
// for component performance tracking, see: https://vuedose.tips/tips/measure-runtime-performance-in-vue-js-apps/

new Vue({
  router,
  store,
  //axios
  render: h => h(App)
}).$mount('#app');
