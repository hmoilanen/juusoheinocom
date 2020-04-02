<template>
  <div class="base-spacer" :style="[mixinMargins, mixinPaddings, cssVars]">
    <slot></slot>
  </div>
</template>

<script>
import { sizing, margins, paddings } from '@/utils/mixins'

export default {
  name: 'baseSpacer',

  mixins: [sizing, margins, paddings],

  props: {
    // uses prop "size" from mixin
  },

  computed: {
    cssVars() {
      return {
        '--margin-bottom': this.mixinSizing
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-spacer {
  & > * {
    display: block;
    &:not(:last-child) {
      margin-bottom: var(--margin-bottom) !important;
    }
  }
}
</style>
