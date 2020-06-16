import store from '@/store'

const locale = () => {
  return store.state.app.locale
}

export default {
  locale
}