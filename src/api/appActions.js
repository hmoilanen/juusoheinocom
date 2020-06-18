import store from '@/store'

const isLoading = () => {
  return store.state.app.isLoading
}

const locale = () => {
  return store.state.app.locale
}

export default {
  isLoading,
  locale
}