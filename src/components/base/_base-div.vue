<template>
  <div
    class="base-div"
    :class="classing"
    :style="[mixinMargins, mixinPaddings]"
    v-on="listeners"
  >
    <slot></slot>
  </div>
</template>

<script>
import { margins, paddings } from '@/utils/mixins'

export default {
  name: "baseDiv",

  mixins: [ margins, paddings],

  props: {
    card: Boolean,
    cover: Boolean
  },

  computed: {
    classing() {
      return {
        card: this.card,
        cover: this.cover
      }
    },

    listeners() {
      return { ...this.$listeners }
    },
  }
}
</script>

<style lang="scss" scoped>
$div-color--bg: $app-color--theme;
$div-color--border: $app-color--main;

.base-div {
  &.card {
    @extend %app-default--border-radius;
    border: 1px solid $div-color--border;
    background: $div-color--bg;
  }
  &.cover { @extend %absolute-0000; }
}
</style>
