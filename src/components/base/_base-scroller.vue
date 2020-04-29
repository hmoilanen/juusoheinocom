<template>
  <div class="base-scroller" :style="[styling, cssVars]">
    <div ref="inner" class="inner">
      <slot></slot>
    </div>
    <div v-if="!hideScrollbar" class="track">
      <div ref="thumb" class="thumb"></div>
    </div>
  </div>
</template>

<script>
//TEE MYÖHEMMIN MYÖS HORISONTAALISKROLLAUS (X) !!!

export default {
  name: 'baseScroller',

  props: {
    height: String,
    hideScrollbar: Boolean,
    scrollbarWidth: {
      type: String,
      default: '4px'
    }
  },


  mounted() {
    this.handleElementProperties()

    let inner = this.$refs.inner
    inner.addEventListener('scroll', this.handleElementProperties)
    this.$on('hook:beforeDestroy', () => {
      inner.removeEventListener('scroll', this.handleElementProperties)
    })
  },

  methods: {
    handleElementProperties() {
      let inner = this.$refs.inner
      let thumb = this.$refs.thumb
      let thumbHeight = inner.offsetHeight / inner.scrollHeight * inner.offsetHeight
      let thumbMaxFromTop = inner.offsetHeight - thumbHeight
      let relativeScrollPosition = inner.scrollTop / (inner.scrollHeight - inner.offsetHeight)

      thumb.style.height = thumbHeight + 'px'
      thumb.style.top = thumbMaxFromTop * relativeScrollPosition + 'px'
    }
  },

  computed: {
    styling() {
      return {
        maxHeight: this.height ? this.height : false
      }
    },

    cssVars() {
      return {
        '--scrolbar-width': this.hideScrollbar ? '0px' : this.scrollbarWidth
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$base-scroller--color-track: transparentize($app-color--main, 0.95);
$base-scroller--color-thumb: $app-color--hl;

.base-scroller {
  overflow: hidden;
  position: relative;

  .inner {
    overflow-y: auto;
    height: 100%;
    margin-right: -50px;
    padding-right: calc(50px + var(--scrolbar-width));
  }

  .track {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: var(--scrolbar-width);
    background: $base-scroller--color-track;
  }
  .thumb {
    position: absolute;
    left: 0;
    //top, see: this.handleElementProperties()
    //height, see: this.handleElementProperties()
    width: 100%;
    background: $base-scroller--color-thumb;
    transition: top 0.05s ease;
  }
}
</style>
