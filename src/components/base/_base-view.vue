<template>
  <div class="base-view" :style="styling.root">
    <div class="content" :style="styling.content">
      <slot>{{ $options.name }}</slot>
    </div>

    <app-footer v-if="displayFooter"></app-footer>

    <app-ui></app-ui>
  </div>
</template>

<script>
export default {
  name: 'baseView',

  components: {
    appFooter: () => import('@/components/appFooter'),
    appUi: () => import('@/components/appUi')
  },

  props: {
    compensateNavTop: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    displayFooter() {
      return this.$route.meta.displayFooter
    },

    styling() {
      let ui = this.$store.state.ui
      let footerHeight = ui.footerHeight || 50
      let navTopHeight = ui.navTopHeight || 50
      let contentMinHeight = ui.window.height

      if (ui.navTopDisplayed && this.compensateNavTop) {
        contentMinHeight -= navTopHeight
      }
      if (this.displayFooter) {
        contentMinHeight -= footerHeight 
      }

      return {
        root: {
          paddingTop: this.compensateNavTop
            ? navTopHeight + 'px'
            : false
        },
        content: {
          minHeight: contentMinHeight + 'px'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-view {
  .content {
    padding: 16px;
  }
}
</style>
