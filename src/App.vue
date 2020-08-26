<template>
  <div id="app">
    <router-view v-if="!$app.isLoading()"></router-view>
    <app-ui></app-ui>
    <app-curtain v-if="componentControl.curtain"></app-curtain>
    <modal-handler v-if="componentControl.modalHandler"></modal-handler>
    <app-handler></app-handler>
  </div>
</template>

<script>
import AppCurtain from '@/components/AppCurtain'
import AppUi from '@/components/AppUi'
import AppHandler from '@/components/AppHandler'

export default {
  name: 'App',

  components: {
    AppCurtain,
    AppUi,
    AppHandler,
    modalHandler: () => import('@/components/ModalHandler')
	},

  computed: {
    componentControl() {      
      return {
        curtain: this.$store.state.ui.curtainDisplayed,
        modalHandler: this.$store.state.modals.showModal
      }
    }
  }
}
</script>

<style lang="scss">
@import "./styles/cssReset.scss"
</style>
