<template>
  <div class="base-feedback" :class="classing" :style="[styling, mixinMargins]">
    <component class="text" :is="tag">
      <slot></slot>
    </component>
  </div>
</template>

<script>
//PITÄISIKÖ TÄHÄN RAKENTAA SISÄÄN JOTAIN ESIMERKKIVASTAUKSIA?!?!

import { sizing, margins } from '@/utils/mixins'
import { camelToKebab } from '@/utils/strings'

export default {
  name: 'baseFeedback',

  mixins: [sizing, margins],

  props: {
    tag: {
      type: String,
      default: 'p',
      /* validator: prop => {
        return ['p', 'span', 'pre', 'blockquote', 'dd'].indexOf(prop) !== -1
      } */
    },
    type: {
      type: String,
      default: 'default',
      validator: prop => {
        return ['error'].indexOf(prop) !== -1
      }
    }
  },

  computed: {
    classing() {
      let parent = camelToKebab(this.$parent.$options.name)
      
      return {
        //error: this.type === 'error',
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
  
  &.child-of--base-input {
    color: $base-feedback--color-error;
  }
}
</style>
