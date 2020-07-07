<template>
  <div class="nav-top-logo" :class="{ alternative: alternative }">
    <base-icon size="xl">juusoheino</base-icon>
  </div>
</template>

<script>
// import customComponent from '@/components/customComponent'

export default {
  name: 'navTopLogo',

  /* components: {
    customComponent: () => import('@/components/customComponent')
  }, */

  props: {
    alternative: Boolean
  },

  /* data() {
    return {}
  }, */

  //computed: {},

  //methods: {}

  // IN-COMPONENT ROUTE GUARDS:
  // See: https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
  // beforeRouteEnter (to, from, next) {}
  // beforeRouteUpdate (to, from, next) {}
  // beforeRouteLeave (to, from, next) {}
}
</script>

<style lang="scss" scoped>
$nav-to-logo--color-alternative: $app-color--theme;
.nav-top-logo {
  position: relative;
  display: flex;
  align-items: center;
  &.alternative {
    .base-icon {
      &::v-deep path { fill: $nav-to-logo--color-alternative; }
    }
  }
}
</style>
