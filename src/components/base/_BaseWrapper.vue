<template>
  <div class="base-wrapper" :class="classing" :style="[styling, mixinMargins]">
    <slot>{{ $options.name }}</slot>
  </div>
</template>

<script>
import { sizing, margins } from '@/utils/mixins'

export default {
  name: 'BaseWrapper',

  mixins: [sizing, margins],

  props: {
    maxWidth: [Boolean, String],
    padding: [Boolean, String],
    center: Boolean,
    disableMargins: Boolean
  },

  computed: {
    classing() {
      return {
        center: this.center,
        'margin-disabled': this.disableMargins
      }
    },

    styling() {
      let ui = this.$store.state.ui
      let maxWidth = false
      let maxWidthDefault = 1200
      let padding = false
      let widths = Object.keys(ui.contentWidth)

      if (this.maxWidth) {
        if (typeof this.maxWidth === 'boolean') {
          maxWidth = ui.contentWidth.max + 'px' || maxWidthDefault + 'px'
        } else if (typeof this.maxWidth === 'string') {
          if (widths.indexOf(this.maxWidth) !== -1) {
            maxWidth = ui.contentWidth[this.maxWidth] + 'px'
          } else {
            maxWidth = this.maxWidth
          }
        }
      }

      if (this.padding) {
        if (typeof this.padding === 'boolean') {
          padding = ui.contentPaddingDefault + 'px'
        } else if (typeof this.padding === 'string') {
          padding = this.padding
        }
      }
      
      return {
        maxWidth: maxWidth,
        padding: padding
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-wrapper {
  &:not(.margin-disabled) {
    margin: 0 auto;
  }
  &.center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
