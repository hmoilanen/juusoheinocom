<template>
  <div id="app">
    <!-- LISÄÄ TÄHÄN appCurtain !!! -->

    <router-view></router-view>

    <nav-top></nav-top>
    <!-- <nav-left></nav-left> -->
    <!-- VAI OLISIKO PAREMPI JOS TÄSSÄ OLISI <app-ui> TILALLA? -->

    <app-handler></app-handler>
    <!-- <content-handler v-if="handlerControl.contentHandler"></content-handler> --> <!-- OLISIKO PAREMPI LEIPOA VIEWEIHIN?!?! -->
    <!-- <modal-handler v-if="handlerControl.modalHandler"></modal-handler> -->
  </div>
</template>

<script>
import navTop from '@/components/navTop'
//import navLeft from '@/components/navLeft'
import appHandler from '@/components/appHandler'

export default {
  name: 'app',

  components: {
    navTop,
    //navLeft,
    appHandler,
    //contentHandler: () => import('@/components/contentHandler'),
    //modalHandler: () => import('@/components/modalHandler'),
  },

  computed: {
    handlerControl() {      
      return {
        //contentHandler: this.$store.state.content.showContentHandler,
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
}

h1,
h2,
h3,
h4,
h5,
h6 { margin: 0; }

ol,
ul,
li { margin: 0; }

p {
  margin: 0;
  padding: 0;
}

#app {
  // optional:
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  //font-family: $app-font--base;
  //-webkit-font-smoothing: antialiased;
  //-moz-osx-font-smoothing: grayscale;
  //color: $app-color--text-base;
  //position: relative;
}
</style>
