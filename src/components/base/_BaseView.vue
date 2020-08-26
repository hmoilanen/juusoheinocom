<template>
  <div class="base-view" :style="styling.root">
    <div class="content" :style="styling.content">
      <slot>{{ $options.name }}</slot>
      <div v-if="displayScrollIndicator" class="scroll-indicator"></div>
    </div>
    <app-footer v-if="displayFooter"></app-footer>
  </div>
</template>

<script>
export default {
  name: 'BaseView',

  components: {
    appFooter: () => import('@/components/AppFooter'),
  },

  props: {
    compensateNavTop: {
      type: Boolean,
      default: true
    },
    contentPaddingY: {
      type: String,
      validator(prop) {
        return ['top', 'bottom', 'both', 'y'].indexOf(prop) !== -1
      }
    }
  },

  computed: {
    displayFooter() {
      return this.$route.meta.displayFooter || false
    },

    displayScrollIndicator() {
      if (this.$route.name === 'gallery' || this.$route.name === 'project') {
        return false
      } else return true
    },

    styling() {
      let breakpoint = this.$store.getters['ui/GET_BREAKPOINT']
      let ui = this.$store.state.ui
      let navTopHeight = ui.navTopHeight || 50
      let footerHeight = ui.footerHeight || 50
      let contentMinHeight = window.innerHeight
      let contentPaddingTop = false
      let contentPaddingBottom = false

      if (ui.navTopDisplayed && this.compensateNavTop) {
        contentMinHeight -= navTopHeight
      }

      if (this.displayFooter) {
        contentMinHeight -= footerHeight 
      }
      
      let ps = 5 // = vmax
      if (this.contentPaddingY) {
        if (this.contentPaddingY === 'top') {
          contentPaddingTop = ps
        } else if (this.contentPaddingY === 'top') {
          contentPaddingBottom = ps * 2
        } else {
          contentPaddingTop = ps
          contentPaddingBottom = ps * 2
        }
      }

      return {
        root: {
          paddingTop: this.compensateNavTop
            ? navTopHeight + 'px'
            : false
        },
        content: {
          minHeight: contentMinHeight + 'px',
          paddingTop: contentPaddingTop + 'vmax',
          paddingBottom: contentPaddingBottom + 'vmax'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$base-view--color-secondary: $app-color--secondary;
$base-view--color-hl: $app-color--hl;
$base-view--scroll-indicator--width: 2px;
$base-view--scroll-indicator--height: 25px;

.base-view {
  .scroll-indicator {
    overflow: hidden;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: $base-view--scroll-indicator--width;
    height: $base-view--scroll-indicator--height;
    background: $base-view--color-secondary;
    &::after {
      content: "";
      position: absolute;
      width: $base-view--scroll-indicator--width;
      height: $base-view--scroll-indicator--width;
      background: $base-view--color-hl;
      animation: scroll 1.6s ease-out infinite;
    }

    @keyframes scroll {
      0%, 10% { transform: translateY(-#{$base-view--scroll-indicator--width}); }
      80%, 100% { transform: translateY(#{$base-view--scroll-indicator--height}); }
    }
  }
}
</style>
