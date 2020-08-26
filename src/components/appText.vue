<template>
  <base-text
    class="app-text"
    :size="size"
    :scaling="scaling"
    :weight="weight"
    :style="mixinMargins"
  >
    <slot>{{ $options.name }}</slot>
  </base-text>
</template>

<script>
import { margins } from '@/utils/mixins'

export default {
  name: 'AppText',

  mixins: [margins],

  props: {
    size: {
      type: [Number, String],
      default: 7
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
  &.base-text { line-height: 1.6em !important; }
}
</style>
