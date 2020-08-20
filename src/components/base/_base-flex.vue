<template>
  <div
    class="base-flex"
    :style="[styling, mixinMargins]"
    v-on="listeners"
  >
    <slot></slot>
  </div>
</template>

<script>
import { margins } from '@/utils/mixins'

export default {
  name: 'baseFlex',

  mixins: [margins],

  props: {
    center: { // Center content base on axis (Note!: could be overwritten if this.align of this.justify is specified)
      type: String,
      validator: prop => { return ['x', 'y', 'xy'].indexOf(prop) !== -1 }
    },
    direction: { // Set flex-direction
      type: String,
      validator: prop => { return ['row', 'row-reverse', 'column', 'column-reverse', 'inherit', 'initial', 'unset'].indexOf(prop) !== -1 }
    },
    wrap: { // Set flex-wrap
      type: [Boolean, String],
      validator: prop => { return typeof prop === 'string' ? (prop === 'nowrap' || prop === 'wrap' || prop === 'wrap-reverse') : true }
    },
    justify: { // Position children based on flex box's main axis
      type: String,
      validator: prop => { return ['start', 'end', 'center', 'around', 'between', 'evenly', 'inherit', 'initial', 'unset'].indexOf(prop) !== -1 }
    },
    align: { // Position children based on flex box's cross axis
      type: String,
      validator: prop => { return ['start', 'end', 'center', 'baseline', 'inherit', 'initial', 'unset'].indexOf(prop) !== -1 }
    },
    // 'Quick' options:
    column: Boolean, // Set flex-direction as column (= simplified option for $props.direction)
    reverse: Boolean, // Reverse flex-direction (= simplified option for $props.direction BUT doesn't affect on flex-wrap!)
    width: String // Set width of flex manually (e.g. width: 100%;)
  },

  computed: {
    listeners() {
      return { ...this.$listeners }
    },
    
    styling () {
      let flexOptions = {
        flexDirection: false,
        flexWrap: 'nowrap',
        justifyContent: false,
        alignItems: false,
        width: this.width ? this.width : null
      }

      // Set flex-direction
      if (this.direction) {
        flexOptions.flexDirection = this.direction
      } else if (this.column) {
        if (this.reverse) {
          flexOptions.flexDirection = 'column-reverse'
        } else {
          flexOptions.flexDirection = 'column'
        }
      } else if (this.reverse) {
        flexOptions.flexDirection = 'row-reverse'
      }

      // Set flex-wrap
      if (this.wrap) {
        if (typeof this.wrap === 'boolean' && this.wrap === true) {
          flexOptions.flexWrap = 'wrap'
        } else flexOptions.flexWrap = this.wrap
      }

      // Centering
      if (this.center) {
        if (this.center === 'x') {
          if (this.column || this.direction === 'column' || this.direction === 'column-reverse') {flexOptions.alignItems = 'center' }
          else { flexOptions.justifyContent = 'center' }
        }
        if (this.center === 'y') {
          if (this.column || this.direction === 'column' || this.direction === 'column-reverse') {flexOptions.justifyContent = 'center' }
          else { flexOptions.alignItems = 'center' }
        }
        if (this.center === 'xy' || this.center === 'yx') {
          flexOptions.justifyContent = 'center'
          flexOptions.alignItems = 'center'
        }
      } 

      // Distribute content in flex box based on it's axis (could affect on this.center !)
      if (this.justify) { // On main axis of flex box
        if (this.justify === 'start') { flexOptions.justifyContent = 'flex-start' }
        else if (this.justify === 'end') { flexOptions.justifyContent = 'flex-end' }
        else if (this.justify === 'around') { flexOptions.justifyContent = 'space-around' }
        else if (this.justify === 'between') { flexOptions.justifyContent = 'space-between' }
        else if (this.justify === 'evenly') { flexOptions.justifyContent = 'space-evenly' }
        else { flexOptions.justifyContent = this.justify }
      }
      if (this.align) { // On cross axis of flex box
        if (this.align === 'start') { flexOptions.alignItems = 'flex-start' }
        else if (this.justify === 'end') { flexOptions.alignItems = 'flex-end' }
        else { flexOptions.alignItems = this.align }
      }

      return flexOptions
    }
  }
}
</script>

<style lang="scss" scoped>
.base-flex {
  display: flex !important;
  & > *[flex-1] { flex: 1; }
  & > *[shrink-0] { flex-shrink: 0; }
}
</style>
