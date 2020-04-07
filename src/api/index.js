/* eslint-disable no-console */
import api_actions from './api_actions'

export default {
  install(Vue, options) {
    Vue.prototype.$api = api_actions;
  }
};
