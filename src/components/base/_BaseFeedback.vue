<template>
  <div
		class="base-feedback"
		:class="classing"
		:style="[styling, mixinMargins]"
	>
    <component class="text" :is="tag">
      <slot></slot>
    </component>
  </div>
</template>

<script>
import { sizing, margins } from '@/utils/mixins'
import { camelToKebab } from '@/utils/strings'

export default {
  name: 'baseFeedback',

  mixins: [sizing, margins],

  props: {
    tag: {
      type: String,
      default: 'p',
    }
  },

  data() {
    return {
      mixinSizeCategories: { s: 7, m: 8, l: 9, xl: 10 }
    }
  },

  computed: {
    classing() {
			const parent = camelToKebab(this.$parent.$options.name)  
			    
      return {
        [`child-of--${parent}`]: true
      }
    },

    styling() {
      return {
        fontSize: this.mixinSizing
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$base-feedback--color-error: $app-color--input-feedback;

.base-feedback {
  line-height: 1.4em;

  &.child-of--base-dropdown,
  &.child-of--base-input,
  &.child-of--base-textarea {
    color: $base-feedback--color-error;
    font-weight: 500;
  }
}
</style>
