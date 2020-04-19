<template>
  <div class="index-indicator" :class="classing" :style="mixinMargins">
    <div
      v-for="(item, index) in list"
      :key="index"
      @click="newIndex(index)"
      class="indicator"
      :class="{ active: index === activeIndex }"
    ></div>
  </div>
</template>

<script>
import { margins, dynamicStyleSet } from '@/utils/mixins'

export default {
  name: 'indexIndicator',

  mixins: [margins, dynamicStyleSet],

  props: {
    list: {
      type: [Array, Object],
      default: () => {
        return [1, 2, 3]
      }
    }
  },

  data() {
    return {
      activeIndex: 0
    }
  },

  methods: {
    newIndex(index) {
      this.activeIndex = index
      this.$emit('new-index', index)
    }
  },

  computed: {
    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$indicator-size--base: 10px;
$indicator-color: $app-color--hl; // MUUTA!
//$indicator-color--active: grey; // MUUTA!
//$indicator-color--border: grey; // MUUTA

.index-indicator {
  display: flex;
  justify-content: center;

  &.style-set-0 {
    .indicator {
      width: $indicator-size--base;
      height: $indicator-size--base;
      //border: 1px solid $indicator-color--border;
      border-radius: calc(#{$indicator-size--base} / 2);
      background: $indicator-color;
      opacity: 0.4;
      transition: background 0.5s ease;
      @extend %clickable;

      &:not(:last-child) { margin-right: 0.35rem; }
      //&.active { background: $indicator-color--active; }
      &.active { opacity: 1; }
    }
  }
}
</style>
