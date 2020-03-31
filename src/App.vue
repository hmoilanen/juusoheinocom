<template>
  <div id="app" :class="appClassing">
    <router-view></router-view>

    <nav-top></nav-top>
    <nav-left></nav-left>

    <app-handler></app-handler>
    <content-handler v-if="handlerControl.contentHandler"></content-handler>
    <modal-handler v-if="handlerControl.modalHandler"></modal-handler>
    <error-handler v-if="handlerControl.errorHandler"></error-handler>
  </div>
</template>

<script>
import navTop from '@/components/navTop'
import navLeft from '@/components/navLeft'
import appHandler from '@/components/appHandler'

export default {
  name: 'app',

  components: {
    navTop,
    navLeft,
    appHandler,
    contentHandler: () => import('@/components/contentHandler'),
    modalHandler: () => import('@/components/modalHandler'),
    errorHandler: () => import('@/components/errorHandler')
  },

  computed: {
    handlerControl() {      
      return {
        contentHandler: this.$store.state.content.showContentHandler,
        modalHandler: this.$store.state.modals.showModal,
        errorHandler: this.$store.state.app.errors.length >= 1
      }
    },
    appClassing() {
      let darkMode = this.$store.state.app.ui.darkMode

      return {
        'dark-mode': darkMode
      }
    }
  }
}
</script>

<style lang="scss">
// TODO!: TEE ERILLINEN CSS-RESET -FILU JOKA IMPORTATAAN TÄHÄN (= 'cssReset.scss') ?!?!?!
*,
*::before,
*::after { box-sizing: border-box; }

body {
  margin: 0;
  padding: 0;
  font-size: 1rem;
  line-height: 1.25em;
  background-color: $app-color--bg;
}

h1, h2, h3, h4, h5, h6 { margin: 0; }

ul, li, p {
  margin: 0;
  padding: 0;
}

#app {
  // optional:
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-family: $app-font--base;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $app-color--text-base;
  position: relative;
}
</style>
