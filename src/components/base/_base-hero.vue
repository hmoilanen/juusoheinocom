<template>
  <!-- TÄMÄ ON TÄLLÄ HETKELLÄ IHAN TURHA -> TEE JOTAIN TAI DELETOI KOKO PASKA! -->
  <!-- TÄMÄ ON TÄLLÄ HETKELLÄ IHAN TURHA -> TEE JOTAIN TAI DELETOI KOKO PASKA! -->
  <!-- TÄMÄ ON TÄLLÄ HETKELLÄ IHAN TURHA -> TEE JOTAIN TAI DELETOI KOKO PASKA! -->
  <div class="base-hero" :style="styling">
    <slot></slot>
  </div>
</template>

<script>
// NOTE! TÄMÄ ON TÄYSIN KESKEN... KTS. constlet/hero
// import customComponent from '@/components/customComponent'
export default {
  name: "baseHero",

  /* components: {
    customComponent: () => import('@/components/customComponent')
  }, */

  props: {
    height: {
      type: String,
      default: "70vmin"
    }
  },

  /* data() {
    return {}
  }, */

  computed: {
    styling() {
      return {
        height: this.height
      };
    }
  }

  //methods: {}

  // IN-COMPONENT ROUTE GUARDS:
  // See: https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards
  // beforeRouteEnter (to, from, next) {}
  // beforeRouteUpdate (to, from, next) {}
  // beforeRouteLeave (to, from, next) {}
};
</script>

<style lang="scss" scoped>
.base-hero {
  background: pink;
  position: relative;
  //height: ; // see: this.height
}
</style>
