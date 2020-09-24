<template>
  <div class="app-ui">
    <nav-top v-if="displayNav.top"></nav-top>
    <contact-link></contact-link>
  </div>
</template>

<script>
import ContactLink from '@/components/ContactLink'

export default {
  name: 'AppUi',

  components: {
    navTop: () => import('@/components/NavTop'),
    ContactLink
  },

  computed: {
    displayNav() {
      return {
        top: this.$store.state.ui.navTopDisplayed
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
