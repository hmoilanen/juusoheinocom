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
      type: [String, Number, Object],
      default: '1.4rem',
      validator(prop) {
        if (typeof prop === 'object') {
          const keys = Object.keys(prop)
          for (let i = 0; i < keys.length; i++) {
            return ['x', 'y'].indexOf(keys[i]) !== -1
          }
        } else return true
      }
    },
    fillType: {
      type: String,
      default: 'fit' // 'fit' / 'fill'
    }
  },

  computed: {
    styling() {
      let gap = false

      if (typeof this.gap === 'number') {
        gap = this.gap * 0.125 + 'rem'
      } else if (typeof this.gap === 'string') {
        gap = this.gap
      } else { // if object
        gap = {}
        for (let key in this.gap) {
          if (typeof this.gap[key] === 'number') {
            gap[key] = this.gap[key] * 0.125 + 'rem'
          } else if (typeof this.gap[key] === 'string') {
            gap[key] = this.gap[key]
          } else {
            //console.log('is else / object');
            console.log('baseGrid: provide $props.gap values as strings or numbers!')
          }
        }
      }

      return {
        gridTemplateColumns: `repeat(auto-${this.fillType}, minmax(${this.colMin}, ${this.colMax}))`,
        gridGap: typeof this.gap !== 'object'
          ? gap
          : false,
        gridColumnGap: typeof this.gap === 'object' && gap.y
          ? gap.y
          : false,
        gridRowGap: typeof this.gap === 'object' && gap.x
          ? gap.x
          : false,
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
