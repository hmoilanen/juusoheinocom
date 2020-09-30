<template>
  <div class="base-view" :style="styling.root">
		<home-canvas v-if="displayCanvas"></home-canvas>
    <div class="content" :style="styling.content">
      <slot>{{ $options.name }}</slot>
			<scroll-indicator v-if="displayScrollIndicator"></scroll-indicator>
    </div>
    <app-footer v-if="displayFooter"></app-footer>
  </div>
</template>

<script>
import ScrollIndicator from '@/components/ScrollIndicator'

export default {
  name: 'BaseView',

  components: {
		ScrollIndicator,
		HomeCanvas: () => import('@/components/HomeCanvas'),
		appFooter: () => import('@/components/AppFooter')
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
		displayCanvas() {
			return !this.$app.isLoading() && this.$route.name === 'home'
				?	true
				: false
		},

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
.base-view {
	position: relative;

	.hero-canvas {
		position: fixed;
		top: 0;
	}
}
</style>