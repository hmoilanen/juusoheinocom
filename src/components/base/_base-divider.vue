<template>
  <div
    class="base-divider"
    :style="[mixinMargins, mixinPaddings]"
  >
    <div :style="styling"></div>
  </div>
</template>

<script>
import { margins, paddings } from '@/utils/mixins'

export default {
  name: 'baseDivider',

  mixins: [margins, paddings],

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
		max-width: 100%; // can be overridden with prop.maxWidth
		height: 1.1px; // sometimes '1px' would be rendered as '0.99px' so it couldn't be seen
		width: 100%;
		background: $divider-color;
	}
}
</style>
