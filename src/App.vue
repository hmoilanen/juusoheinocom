<template>
  <div id="app">
    <router-view v-if="!$app.isLoading()"></router-view>
    <app-curtain v-if="componentControl.curtain"></app-curtain>
    <app-ui></app-ui>
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
// TODO!: TEE ERILLINEN CSS-RESET -FILU JOKA IMPORTATAAN TÄHÄN (= 'cssReset.scss') ?!?!?!
// KOITIN MUTTA TEKI JOSTAIN SYYSTÄ ISON MÄÄRÄN DUPLIKAATTITYYLEJÄ INSPECTIIN -> SELVITÄ

*,
*::before,
*::after { box-sizing: border-box; }
//VAI PITÄISKÖ TÄHÄN LAITTAA SUORAAN MYÖS MARGNI/PADDING: 0 ???

body {
  margin: 0;
  padding: 0;
  background-color: $app-color--bg;
  font-size: 1rem;
  line-height: 1.35em;
  font-family: $app-font--base;
  color: $app-color--text-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	font-variant-ligatures: none;
}

h1, h2, h3, h4, h5, h6 { margin: 0; }

ol, ul, li {
  margin: 0;
  padding: 0;
}

p {
  margin: 0;
  padding: 0;
}

canvas { display: block; }
</style>
