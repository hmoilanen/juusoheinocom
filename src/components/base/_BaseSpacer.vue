<template>
  <div
    class="base-spacer"
    :style="[mixinMargins, cssVars]"
  >
    <slot></slot>
  </div>
</template>

<script>
// Todo:
// Turn this component into renderless
// Add script which gives children style 'display: block' if they don't behave as such, etc. is 'display: flex'
	// Now done with css and might cause problems f eg. flex is changed as block)

import { sizing, margins } from '@/utils/mixins'

export default {
  name: 'BaseSpacer',

  mixins: [sizing, margins],

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
