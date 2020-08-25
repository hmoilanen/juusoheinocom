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
import appCurtain from '@/components/appCurtain'
import appUi from '@/components/appUi'
import appHandler from '@/components/appHandler'

export default {
  name: 'app',

  components: {
    appCurtain,
    appUi,
    appHandler,
    modalHandler: () => import('@/components/modalHandler')
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
