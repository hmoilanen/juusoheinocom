<template>
  <div class="base-wrapper" :class="classing" :style="[styling, mixinMargins]">
    <slot>{{ $options.name }}</slot>
  </div>
</template>

<script>
// TARVIIKO SIZINGIA OLLENKAAN TÄSSÄ -> PADDIINGSIT?
import { sizing, margins, paddings } from '@/utils/mixins'

export default {
  name: 'baseWrapper',

  mixins: [sizing, margins, paddings],

  props: {
    // TEE VALMIIKSI!
    dynamic: Boolean, // makes predefined paddings to scale with viewport size
    maxWidth: [Boolean, String],
    padding: [Boolean, String],
    center: Boolean
    //compensateNavTop: Boolean,
    /* resetPadding: { // TEE TÄMÄ KONDIKSEEN / PÄÄTÄ TOTEUTUSTAPA!!!
      type: Boolean,
      default: false
    } */
  },

  computed: {
    classing() {
      return {
        center: this.center
      }
    },

    styling() {
      let ui = this.$store.state.ui
      let maxWidth = false
      let maxWidthDefault = 1200
      let padding = false

      if (this.maxWidth) {
        if (typeof this.maxWidth === 'boolean') {
          maxWidth = ui.contentWidth.max + 'px' || maxWidthDefault + 'px'
        } else if (typeof this.maxWidth === 'string') {
          if (this.maxWidth === 'paragraph') {
            maxWidth = ui.contentWidth.paragraph + 'px'
          } else if (this.maxWidth === 'medium') {
            maxWidth = ui.contentWidth.medium + 'px'
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
  margin: 0 auto;
  &.center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
