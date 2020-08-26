<template>
  <div
    class="base-divider"
    :style="[mixinMargins]"
  >
    <div :style="styling"></div>
  </div>
</template>

<script>
import { margins } from '@/utils/mixins'

export default {
  name: 'BaseDivider',

  mixins: [margins],

  props: {
    maxWidth: String
  },

  computed: {
    styling() {
      return { maxWidth: this.maxWidth ? this.maxWidth : false }
    }
  }
}
</script>

<style lang="scss" scoped>
$divider-color: darken($app-color--theme, 25%);

.base-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4px;
  
	div {
		max-width: 100%; // Can be overridden with prop.maxWidth
		height: 1.1px; // Prevents element to be rendered with height of 0.99px = invisible
		width: 100%;
		background: $divider-color;
	}
}
</style>
