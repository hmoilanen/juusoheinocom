<template>
  <div class="base-view">
    <base-wrapper :compensateNavTop="true">
      <slot></slot>
    </base-wrapper>
    <app-footer v-if="displayFooter"></app-footer>
  </div>
</template>

<script>
export default {
  name: 'baseView',

  components: {
    appFooter: () => import('@/components/appFooter')
  },

  computed: {
    displayFooter() {
      return this.$route.meta.displayFooter
    }
  }
}
</script>

<style lang="scss" scoped>
.base-view {
  & > *:not(.app-footer) {
    min-height: calc(100vh - 100px);
  }
}
</style>
