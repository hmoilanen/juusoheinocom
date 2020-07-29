<template>
  <div class="app-ui">
    <nav-top v-if="displayNav.top"></nav-top>
    <contact-link v-if="!$app.isLoading"></contact-link>
  </div>
</template>

<script>
import contactLink from '@/components/contactLink'

export default {
  name: 'appUi',

  components: {
    navTop: () => import('@/components/navTop'),
    contactLink
  },

  computed: {
    displayNav() {
      let ui = this.$store.state.ui
      
      return {
        top: ui.navTopDisplayed
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-ui {
  position: fixed;
  top: 0;
  left: 0;
}
</style>
