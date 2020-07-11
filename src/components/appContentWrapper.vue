<template>
  <div class="app-content-wrapper" :style="styling">
    <base-wrapper :maxWidth="maxWidth">
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
    size: {
      type: [Number, String],
      default: 8,
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
    minHeight: {
      type: [String, Boolean],
      default: '100vh'
    },
    maxHeight: {
      type: String,
      default: true
    }
  },

  computed: {
    styling() {
      let minHeight = '100vh'
      let maxHeight = false

      if (typeof this.minHeight === 'string') {  
        minHeight = this.minHeight
      } else if (!this.miinHeight) {
        minHeight = false
      }

      if (this.maxHeight) {  
        maxHeight = this.maxHeight
      }

      console.log('this.maxHeight', this.maxHeight);
      console.log('maxHeight', maxHeight);

      return {
        padding: `0 ${this.mixinSizing}`,
        minHeight: minHeight,
        maxHeight: maxHeight
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-content-wrapper {
  //background: lightblue;
  border-bottom: solid 1px rgba(0,0,0,0.15);

  //min-height: ; // see: this.styling
  //max-height: ; // see: this.styling
  //display: flex;
  //align-items: center;
}
</style>
