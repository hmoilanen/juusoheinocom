<template>
  <component
    :is="tag"
    class="base-title"
    :class="classing"
    :style="[styling, mixinMargins]"
    v-on="listeners"
  >
    <slot>{{ $options.name }}</slot>
  </component>
</template>

<script>
import { sizing, margins } from '@/utils/mixins'

export default {
  name: 'BaseTitle',

  mixins: [sizing, margins],

  props: {
    tag: {
      type: String,
      default: 'h2'
    },
    center: Boolean, // For css
    truncate: Boolean, // For css
    lineHeight: { // For css
      type: [String, Number],
      default: '1.4em'
    },
    uppercase: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      mixinSizeCategories: { s: 9, m: 13, l: 17, xl: 23 }
    }
	},
	
  computed: {
    classing() {
      return {
        truncate: this.truncate,
        center: this.center
      }
    },

    styling() {
      const lineHeight = this.lineHeight
      
      if (typeof this.lineHeight === 'number') {
        lineHeight += 'em'
      }

      return {
        fontSize: this.mixinSizing,
        lineHeight: lineHeight,
        textTransform: this.uppercase
          ? 'uppercase'
          : false
      }
    },

    listeners() {
      return { ...this.$listeners }
    }
  }
}
</script>

<style lang="scss" scoped>
$title-color: $app-color--text-title;
$title-color--active: $app-color--hl;
$title-color--inactive: lighten(desaturate($title-color--active, 100%), 20%);
$title-font: $app-font--title;
$title-indicator-width: 0.2em;

.base-title {
  position: relative;
  word-break: break-word;
  overflow-wrap: break-word; // !
	font-weight: 900;
	font-family: $title-font;
	letter-spacing: 0.02em;
	color: $title-color;
	&::selection { background: $title-color--active; }

  &.truncate { @extend %truncate; }
  &.center { text-align: center; }
}
</style>
