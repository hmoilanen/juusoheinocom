
<template>
  <component
    :is="tag"
    class="base-text"
    :class="classing"
    :style="[styling, mixinMargins, mixinPaddings]"
    v-on="listeners"
  >
    <slot>{{ this.textContent }}</slot>
  </component>
</template>

<script>
// TODOS:
// PROP: ROWS (-> MÄÄRITÄ NÄYTETTÄVIEN RIVIEN MAKSIMIMÄÄRÄ)
// PROP: TURNCATE -> IMPLEMENTOI shave.js
// PROP: QUOTE -> VRT. HANDLE!
// PROP: CODE -> VRT. HANDLE!
// PROP: LINK -> VRT. HANDLE!

import { sizing, margins, paddings, dynamicStyleSet } from '@/utils/mixins'

export default {
  name: 'baseText',

  mixins: [sizing, margins, paddings, dynamicStyleSet],

  props: {
    tag: {
      type: String,
      default: 'p'
    },
    lorem: [Boolean, Number],
    display: String, // for css: block / inline-block / inline / ...
    weight: Number, // for css: font-weight
    //isHandle: Boolean,
  },

  data() {
    return {
      mixinSizeCategories: { s: 7, m: 8, l: 9, xl: 10 },
      loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus risus sit amet aliquet laoreet. Sed accumsan lectus ac est commodo, a molestie urna placerat. Phasellus scelerisque tempor sagittis. Fusce ipsum turpis, blandit sit amet eleifend vitae, sagittis ac neque. Morbi finibus consectetur pellentesque. Etiam tortor mauris, faucibus quis vestibulum ut, cursus ac ante. Duis non vehicula mi. Etiam nec erat viverra, luctus tortor sit amet, eleifend est. Curabitur vel neque facilisis, mollis erat ac, viverra purus. Duis imperdiet molestie purus sed tempor. Mauris in pharetra erat. Pellentesque nisi felis, blandit id viverra id, interdum sit amet nunc. Donec quis eleifend dui. Mauris pellentesque quam nibh, sed mollis ipsum pulvinar sed. Praesent mattis egestas odio ut lobortis. Suspendisse pretium quam ac tellus laoreet volutpat. Fusce sollicitudin at tellus eget ultricies. Vestibulum blandit elit ex, a luctus massa rutrum quis. Proin eget ex ac sapien finibus sed urna ultricies.' // length = 1000
    }
  },

  computed: {
    textContent() {
      if (this.lorem && typeof this.lorem === 'boolean') {        
        return this.loremIpsum
      } else if (this.lorem && typeof this.lorem === 'number') { // if number
        let length = this.lorem > this.loremIpsum.length - 1
          ? this.loremIpsum.length
          : this.lorem

        return this.loremIpsum.substring(0, length)
      } else {
        return this.$options.name
      }
    },

    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
        handle: this.isHandle
      }
    },

    styling() {
      return {
        fontSize: this.mixinSizing,
        lineHeight: '1.3em',
        fontWeight: this.weight ? this.weight : false,
        display: this.display ? this.display : false
      }
    },

    listeners() {
      return { ...this.$listeners }
    }
  }
}
</script>

<style lang="scss" scoped>
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
    
    /* &.handle {
      font-family: $text-font--handle;
      color: $text-color--handle;
    } */
  }

  /* &.style-set-1 {
    @extend .style-set-0; // optional
    // customize here!
  } */
}
</style>
