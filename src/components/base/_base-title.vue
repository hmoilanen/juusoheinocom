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
// TODOS:
// PROP: DYNAMIC

import { sizing, margins, dynamicStyleSet } from '@/utils/mixins'

export default {
  name: 'baseTitle',

  mixins: [sizing, margins, dynamicStyleSet],

  props: {
    tag: {
      type: String,
      default: 'h2'
    },
    center: Boolean, // for css
    truncate: Boolean, // for css
    //main: Boolean // about styling
  },

  data() {
    return {
      mixinSizeCategories: { s: 9, m: 13, l: 17, xl: 23 }
    }
  },

  watch: {
    '$store.state.base.sizing.baseTitle': {
      immediate: true,
      handler: function() {
        this.mixinSizeCategories = this.$store.state.base.sizing.baseTitle
      }
    }
  },

  computed: {
    /* mixinSizeCategories() {
      return this.$store.state.base.sizing.baseTitle
    }, */

    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
        truncate: this.truncate,
        center: this.center,
        main: this.main
      }
    },

    styling() {
      return {
        fontSize: this.mixinSizing,
        lineHeight: '1.4em',
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
  overflow-wrap: break-word; // !

  &.break-word { word-break: break-all; }
  &.truncate { @extend %truncate; }
  &.center { text-align: center; }
  
  /* &.main {
    &::before {
      content: "";
      position: relative;
      top: 50%;
      width: 50px;
      height: 5px;
      background: black;
    }
  } */

  &.style-set-0 {
    font-weight: 900;
    font-family: $title-font;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: $title-color;
    &::selection {
      background: $title-color--active;
      //color: $text-color--selection;
    }
  }

  /* &.style-set-1 {
    @extend .style-set-0; // optional
    // customize here!
  } */
}
</style>
