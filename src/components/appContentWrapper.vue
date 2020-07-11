<template>
  <div class="app-content-wrapper" :style="styling.outer">
    <base-wrapper :style="styling.inner" :max-width="maxWidth">
      <slot></slot>
    </base-wrapper>
  </div>

</template>

<script>
import { sizing } from '@/utils/mixins'

export default {
  name: 'appContentWrapper',

  mixins: [sizing],

  props: {
    size: { // = dynamic size of side paddings
      type: [Number, String],
      default: 8, // 8 * 0.125rem = 1rem = 16px
      validator(prop) {
        if (typeof prop === 'string') {
          return ['s', 'm', 'l', 'xl'].indexOf(prop) !== -1
        } else return true
      }
    },
    scaling: {
      type: [Boolean, Array, Object, Number],
      default: 5
    },
    maxWidth: {
      type: [Boolean, String],
      default: true
    },
    center: { // center content base on axis (Note!: could be overwritten if this.align of this.justify is specified)
      type: String,
      validator: prop => { return ['x', 'y', 'xy'].indexOf(prop) !== -1 }
    }
  },

  computed: {
    styling() {
      let justifyContent = this.center === 'x' || this.center === 'xy'
        ? 'center'
        : false
      let alignItems = this.center === 'y' || this.center === 'xy'
        ? 'center'
        : false

      return {
        outer: {
          padding: `0 ${this.mixinSizing}`
        },
        /* inner: {
          display: this.center ? 'flex' : false,
          justifyContent: justifyContent,
          alignItems: alignItems
        } */
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-content-wrapper {
  position: relative; // for enabling centering of inner content with transform
  display: flex;
  align-items: stretch;
  .base-wrapper {
    flex: 1;
    width: 100%;
    //background: pink;
  }
}
</style>
