<template>
  <div
    class="base-spacer"
    :style="[mixinMargins, mixinPaddings, cssVars]"
  >
    <slot></slot>
  </div>
</template>

<script>
//LISÄÄ SCRIPTAAN TARKASTELU, ONKO LAPSI JOO VALMIIKSI BLOCK / FLEX / TMV...
//JOS EI OLE, ANNA TYYLINÄ display: block;
//MUUTA KOKO KOMPONENTTI RENDERLESSIKSI ?!

import { sizing, margins, paddings } from '@/utils/mixins'

export default {
  name: 'baseSpacer',

  mixins: [sizing, margins, paddings],

  props: {
    // uses $prop.size from mixin, see: @/utils/mixins
  },

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
