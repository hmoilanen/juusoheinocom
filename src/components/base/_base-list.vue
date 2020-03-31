<template>
  <ul class="base-list" :style="[mixinMargins, mixinPaddings, cssVars]">
    <slot></slot>
  </ul>
</template>

<script>
import { sizing, margins, paddings } from '@/utils/mixins'

export default {
  name: 'baseList',

  mixins: [sizing, margins, paddings],

  props: {
    gap: {
      type: [String, Number]
    }
  },

  watch: {
    gap: {
      immediate: true,
      handler: function() {
        this.size = this.gap // for this.mixinSizing
      }
    }
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
.base-list {

  //& > *[style*="display: inline-block;"] {} // EN AANU TÄTÄ TOIMIMAAN ESIM SPANIN KANSSA -> FIKAA MYÖHEMMIN JOS KIINNOSSTAA
  & > * {
    display: block; // TÄSTÄ VOI TULLA MYÖHEMMIN ONGELMIA (SIKSI TESTASIN TOTA YLEMPÄÄ KIKKAA) -< TWIIKKAA JOS TULEE ONGELMIA
    &:not(:last-child) {
      margin-bottom: var(--margin-bottom) !important;
    }
  }
}
</style>
