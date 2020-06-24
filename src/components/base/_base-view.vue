<template>
  <div class="base-view" :style="styling.root">
    <slot name="hero"></slot>
    <div class="content" :style="styling.content">
      <base-wrapper :maxWidth="true">
        <slot>{{ $options.name }}</slot>
      </base-wrapper>
    </div>
    <app-footer v-if="displayFooter"></app-footer>
    <app-ui></app-ui>
  </div>
</template>

<script>
import appCurtain from '@/components/appCurtain'

export default {
  name: 'baseView',

  components: {
    appCurtain,
    appFooter: () => import('@/components/appFooter'),
    appUi: () => import('@/components/appUi'),
    //appCurtain: () => import('@/components/appCurtain')
  },

  props: {
    compensateNavTop: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    displayFooter() {
      return this.$route.meta.displayFooter || false
    },

    styling() {
      let ui = this.$store.state.ui
      let navTopHeight = ui.navTopHeight || 50
      let footerHeight = ui.footerHeight || 50
      let contentMinHeight = ui.window.height
      let breakpoint = this.$store.getters['ui/GET_BREAKPOINT']
      let padding = ui.contentPaddingDefault

      if (ui.navTopDisplayed && this.compensateNavTop) {
        contentMinHeight -= navTopHeight
      }

      if (this.displayFooter) {
        contentMinHeight -= footerHeight 
      }

      /* if (breakpoint.index === 1) { padding = 32 } // = 'm'
      else if (breakpoint.index === 2) { padding = 64 } // = 'l'
      else if (breakpoint.index >= 3) { padding = 96 } // = 'xl' */
      if (breakpoint.index === 1) { padding *= 2 } // = 'm'
      else if (breakpoint.index === 2) { padding *= 4 } // = 'l'
      else if (breakpoint.index >= 3) { padding *= 6 } // = 'xl'

      return {
        root: {
          paddingTop: this.compensateNavTop
            ? navTopHeight + 'px'
            : false
        },
        content: {
          minHeight: contentMinHeight + 'px',
          //padding: `0 ${padding}px`
          padding: `${padding}px`
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-view {
  /* .content {
    padding: 16px;
  } */
}
</style>
