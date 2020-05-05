<template>
  <div id="app">
    <router-view :key="$route.fullPath"></router-view>
    <app-curtain v-if="componentControl.curtain"></app-curtain>
    <app-handler></app-handler>

    <!-- <content-handler v-if="coomponentControl.contentHandler"></content-handler> --> <!-- OLISIKO PAREMPI LEIPOA VIEWEIHIN?!?! -->
    <!-- <modal-handler v-if="coomponentControl.modalHandler"></modal-handler> -->
  </div>
</template>

<script>
import appCurtain from '@/components/appCurtain'
import appHandler from '@/components/appHandler'

export default {
  name: 'app',

  components: {
    appCurtain,
    appHandler
    //contentHandler: () => import('@/components/contentHandler'),
    //modalHandler: () => import('@/components/modalHandler'),
  },

  computed: {
    componentControl() {      
      return {
        curtain: this.$store.state.ui.curtainDisplayed
        //contentHandler: this.$store.state.content.showContentHandler, // TÄTÄ E ENÄÄ OLE
        //modalHandler: this.$store.state.modals.showModal
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

body {
  margin: 0;
  padding: 0;
  background-color: $app-color--bg;
  font-size: 1rem;
  line-height: 1.25em;
  font-family: $app-font--base;
  color: $app-color--text-base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-variant-ligatures: none;
}

h1,
h2,
h3,
h4,
h5,
h6 { margin: 0; }

ol,
ul,
li {
  margin: 0;
  padding: 0;
}

p {
  margin: 0;
  padding: 0;
}
</style>
