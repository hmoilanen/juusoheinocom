<template>
  <div class="app-title" :style="mixinMargins">
    <div class="line"></div>
    <base-title :size="size" :scaling="1">
      <slot>appTitle.vue</slot>
    </base-title>
  </div>
</template>

<script>
import { margins } from '@/utils/mixins'

export default {
  name: 'appTitle',

  mixins: [margins],

  /* components: {
    customComponent: () => import('@/components/customComponent')
  }, */

  /* props: {
    size: [String, Number]
  }, */

  data() {
    return {
      size: 's'
    }
  },

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
.app-title {
  margin-bottom: 1em;
  display: flex;
  align-items: center;

  .line {
    margin-right: 0.5rem;
    width: 6vmin;
    min-width: 20px;
    max-width: 30px;
    height: 4px;
    background: black;
  }
}
</style>
