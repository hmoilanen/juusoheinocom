<template>
  <div
    class="base-tag"
    :style="[styling, mixinMargins]"
    v-on="listeners"
  >
    <slot>default tag</slot>
  </div>
</template>

<script>
import { sizing, margins } from '@/utils/mixins'

export default {
  name: 'baseTag',

  mixins: [sizing, margins],

  data() {
    return {
      mixinSizeCategories: { s: 5, m: 6, l: 7, xl: 8 }
    }
  },

  computed: {
    styling() {
      return {
        fontSize: this.mixinSizing
      }
    },

    listeners() {
      return { ...this.$listeners }
    }
  }
}
</script>

<style lang="scss" scoped>
$tag-color: $app-color--text-base;
$tag-color--bg: lighten($tag-color, 80%);
$tag-font: $app-font--tag;

.base-tag {
  display: inline-block;
  padding: 0.25em 0.7em;
  border-radius: 2px;
  background: $tag-color--bg;
  font-family: $tag-font;
  font-weight: 500;
  color: $tag-color;
}
</style>