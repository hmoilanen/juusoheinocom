<template>
  <div class="app-ui">
    <nav-top v-if="displayNav.top"></nav-top>
    <!-- <nav-left></nav-left> -->
    <!-- <nav-right></nav-right> -->
  </div>
</template>

<script>
export default {
  name: 'appUi',

  components: {
    navTop: () => import('@/components/navTop'),
    //navLeft: () => import('@/components/navLeft'),
    //navRight: () => import('@/components/navRight'),
  },

  computed: {
    displayNav() {
      let ui = this.$store.state.ui
      
      return {
        top: ui.navTopDisplayed,
        //left: ui.navLeftDisplayed,
        //right: ui.navRightDisplayed,
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
