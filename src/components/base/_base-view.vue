<template>
  <div class="base-view" :style="styling.root">
    <div class="content" :style="styling.content">
      <slot>{{ $options.name }}</slot>
      <!-- <base-wrapper :maxWidth="true">
      </base-wrapper> -->
      <div class="scroll-indicator"></div>
    </div>
    <app-footer v-if="displayFooter"></app-footer>
    <!-- <app-ui></app-ui> -->
  </div>
</template>

<script>
//import appCurtain from '@/components/appCurtain'

export default {
  name: 'baseView',

  components: {
    //appCurtain,
    appFooter: () => import('@/components/appFooter'),
    //appUi: () => import('@/components/appUi'),
    //appCurtain: () => import('@/components/appCurtain')
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

    styling() {
      let breakpoint = this.$store.getters['ui/GET_BREAKPOINT']
      let ui = this.$store.state.ui
      let navTopHeight = ui.navTopHeight || 50
      let footerHeight = ui.footerHeight || 50
      let contentMinHeight = ui.window.height
      let contentPaddingTop = false
      let contentPaddingBottom = false

      if (ui.navTopDisplayed && this.compensateNavTop) {
        contentMinHeight -= navTopHeight
      }

      if (this.displayFooter) {
        contentMinHeight -= footerHeight 
      }
      
      let ps = 5 // = 'vmax'
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
$base-view--scroll-indicator--width: 5px;
$base-view--scroll-indicator--height: 27px;

.base-view {
  //.content {}

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
