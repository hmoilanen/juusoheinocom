<template>
  <div class="base-grid" :style="styling">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'baseGrid',

  props: {
    colMin: {
      type: String,
      default: '200px'
    },
    colMax: {
      type: String,
      default: '1fr'
    },
    gap: {
      type: [String, Number],
      default: '1.4rem'
    },
    fillType: {
      type: String,
      default: 'fit' // 'fit' / 'fill'
    }
  },

  computed: {
    styling() {
      return {
        gridTemplateColumns: `repeat(auto-${this.fillType}, minmax(${this.colMin}, ${this.colMax}))`,
        gridGap: typeof this.gap === 'string'
          ? this.gap
          : this.gap * 0.125 + 'rem'
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-grid {
  display: grid;
  //grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  //grid-gap: 15px;
}
</style>
