<template>
  <base-text
    class="app-text"
    :size="size"
    :scaling="scaling"
    :weight="weight"
    :style="mixinMargins"
  >
    <slot>appText.vue</slot>
  </base-text>
</template>

<script>
import { margins } from '@/utils/mixins'

export default {
  name: 'appText',

  mixins: [margins],

  props: {
    size: {
      type: [Number, String],
      default: 7,
      validator(prop) {
        if (typeof prop === 'string') {
          return ['s', 'm', 'l', 'xl'].indexOf(prop) !== -1
        } else return true
      }
    },
    scaling: [Boolean, Array, Object, Number],
    weight: {
      type: Number,
      default: 500
    }
  }
}
</script>

<style lang="scss" scoped>
.app-text {
  &.base-text { line-height: 1.7em !important; }
}
</style>
