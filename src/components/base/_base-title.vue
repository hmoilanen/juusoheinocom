<template>
  <component
    :is="tag"
    class="base-title"
    :class="classing"
    :style="[styling, mixinMargins]"
    v-on="listeners"
  >
    <slot>{{ this.editableInnerContent }}</slot>
  </component>
</template>

<script>
// TODOS:
// CLASS/JS: lisää hoveriin tooltip
// PROP: LAITA GENEERINEN PROP.DYNAMIC KONDIKSEEN
// JS: lisää truncate / wordwrap / ...
// MIXIN/JS: lisää fontin dynaaminen skaalautuvuus viewportin koon perusteella!!! (variaatio s/m/l/xl -kokoihin!)

import { sizing, margins, dynamicStyleSet, editableContent } from '@/utils/mixins'

export default {
  name: 'baseTitle',

  mixins: [sizing, margins, dynamicStyleSet, editableContent],

  props: {
    tag: {
      type: String,
      default: 'h2'
    },
    center: Boolean,
    break: Boolean,
    truncate: Boolean
    //dynamic: Boolean // Sizing is based on ui break points // TEE/LISÄÄ TÄMÄ MYÖHEMMIN UUDELLEEN?!?!
  },

  data() {
    return {
      mixinSizeCategories: { s: 9, m: 13, l: 17, xl: 24 }
    }
  },

  computed: {
    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
        breakWord: this.break,
        truncate: this.truncate,
        center: this.center
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

  &.break-word { word-break: break-all; }
  &.truncate { @extend %truncate; }
  &.center { text-align: center; }

  &.style-set-0 {
    font-weight: 700;
    font-family: $title-font;
    letter-spacing: 0.075em;
    color: $title-color;
  }

  /* &.style-set-1 {
    @extend .style-set-0; // optional
    // customize here!
  } */
}
</style>
