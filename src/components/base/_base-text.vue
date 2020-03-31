
<template>
  <component
    :is="tag"
    class="base-text"
    :class="classing"
    :style="[styling, mixinMargins, mixinPaddings]"
    v-on="listeners"
  >
    <slot>{{ this.editableInnerContent }}</slot>
  </component>
</template>

<script>
// TODOS:
// PROP: MÄÄRITÄ NÄYTETTÄVIEN RIVIEN MAKSIMIMÄÄRÄ
// PROP: TURNCATE -> IMPLEMENTOI shave()
// PROP: QUOTE -> VRT. HANDLE!

import { sizing, margins, paddings, dynamicStyleSet, editableContent } from '@/utils/mixins'

export default {
  name: 'baseTexti',

  mixins: [sizing, margins, paddings, dynamicStyleSet, editableContent],

  props: {
    tag: {
      type: String,
      default: 'p'
    },
    isHandle: Boolean,
    weight: Number,
    lorem: Boolean,
    loremLength: Number,
    inheritStyle: Boolean
  },

  data() {
    return {
      mixinSizeCategories: { s: 7, m: 8, l: 9, xl: 10 },
      loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Volutpat odio facilisis mauris sit. Rhoncus dolor purus non enim praesent elementum facilisis leo. In eu mi bibendum neque. Phasellus vestibulum lorem sed risus ultricies tristique nulla. Quisque egestas diam in arcu cursus. Mattis rhoncus urna neque viverra justo. Iaculis nunc sed augue lacus viverra vitae congue eu. Sagittis aliquam malesuada bibendum arcu vitae elementum. Nibh mauris cursus mattis molestie a iaculis at erat. Risus quis varius quam quisque id diam.'
    }
  },

  computed: {
    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
        handle: this.isHandle
      }
    },

    styling() {
      return {
        fontSize: this.mixinSizing,
        lineHeight: '1.25em',
        fontWeight: this.weight ? this.weight : 400
      }
    },

    listeners() {
      return { ...this.$listeners }
    }
  }
}
</script>

<style lang="scss" scoped>
// TODO:! TEE NÄILLE OMA TOIMINNALLISUUS JOKA SÄÄDETÄÄN PROPILLA! (prop.truncate)
//overflow-x: auto;
//white-space: pre-wrap;
//word-wrap: break-word;

$text-color: $app-color--text-base;
$text-color--selection: $app-color--text-base;
$text-color--selection-bg: $app-color--hl;
$text-color--handle: $app-color--text-handle;
$text-font: $app-font--base;
$text-font--handle: $app-font--handle;

.base-text {
  position: relative;

  &.style-set-0 {
    font-family: $text-font;
    color: $text-color;
    &::selection {
      background: $text-color--selection-bg;
      color: $text-color--selection;
    }
    
    &.handle {
      font-family: $text-font--handle;
      color: $text-color--handle;
    }
  }

  /* &.style-set-1 {
    @extend .style-set-0; // optional
    // customize here!
  } */
}
</style>
