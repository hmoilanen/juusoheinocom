/* eslint-disable no-console */
import protoApi from './protoApi'
import protoApp from './protoApp'

export default {
  install(Vue, options) {
    Vue.prototype.$api = protoApi
    Vue.prototype.$app = protoApp
  }
}
