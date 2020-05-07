/* eslint-disable no-console */
import apiActions from './apiActions'

export default {
  install(Vue, options) {
    Vue.prototype.$api = apiActions
  }
}
