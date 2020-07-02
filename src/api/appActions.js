import store from '@/store'

const isLoading = () => {
  return store.state.app.isLoading
}

const isLogged = () => {
  return store.state.app.isLogged
}

const locale = () => {
  return store.state.app.locale
}

export default {
  isLoading,
  isLogged,
  locale
}