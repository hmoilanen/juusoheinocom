import store from '@/store'

const isLoading = () => store.state.app.isLoading

const isLogged = () => store.state.app.isLogged

const locale = () => store.state.app.locale

export default {
  isLoading,
  isLogged,
  locale
}