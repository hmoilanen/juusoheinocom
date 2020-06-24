<template>
  <div class="base-wrapper" :style="styling.outer">
    <div class="base-wrapper-inner" :style="styling.inner">
      <slot>{{ $options.name }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'baseWrapper',

  props: {
    maxWidth: [Boolean, String],
    compensateNavTop: Boolean,
    padding: [Boolean, String],

    // TEE VALMIIKSI!
    dynamic: Boolean, // makes predefined paddings to scale with viewport size

    /* resetPadding: { // TEE TÄMÄ KONDIKSEEN / PÄÄTÄ TOTEUTUSTAPA!!!
      type: Boolean,
      default: false
    } */
  },

  computed: {
    styling() {
      let ui = this.$store.state.ui
      let maxWidth = false
      let padding = false

      if (this.maxWidth) {
        if (typeof this.maxWidth === 'boolean' && this.maxWidth === true) {
          maxWidth = ui.contentMaxWidth + 'px'
        } else if (typeof this.maxWidth === 'string') {
          maxWidth = this.maxWidth
        }
      }

      // MIKSEI TÄTÄ OLLE TEHTY miixinPAddings:LLÄ?
      // MIKSEI TÄTÄ OLLE TEHTY miixinPAddings:LLÄ?
      if (this.padding) {
        if (typeof this.padding === 'boolean' && this.padding === true) {
          padding = ui.contentPaddingDefault + 'px'
        } else if (typeof this.padding === 'string') {
          padding = this.padding
        }
      }

      return {
        outer: {
          paddingTop: this.compensateNavTop
            ? ui.navTopHeight + 'px'
            : false
        },
        inner: {
          maxWidth: maxWidth,
          padding: padding
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-wrapper {
  position: relative;
}
.base-wrapper-inner {
  position: relative;
  margin: 0 auto;
}
</style>
