<template>
  <component
    :is="type"
    class="base-list"
    :style="[styling, mixinMargins, mixinPaddings]"
  >
    <li v-for="(item, index) in list" :key="index">
      <slot :item="item">{{ item }}</slot>
    </li>
  </component>
</template>

<script>
// TODOS:
// -CHANGE BINDED KEY SO IT CAN BE DECIDED BY USER FROM LIST-PROP VALUES

import { sizing, margins, paddings } from '@/utils/mixins'

export default {
  name: 'baseList',

  mixins: [sizing, margins, paddings],

  props: {
    list: [Array, Object],
    type: {
      type: String,
      default: 'ul',
      validator: prop => { return ['ol', 'ul', 'o', 'u'].indexOf(prop) !== -1 }
    },
    marker: {
      type: String,
      //validator: prop => { return ['disc', 'circle', 'square', 'decimal', 'decimal-leading-zero', 'lower-alpha', 'lower-roman', 'upper-alpha', 'upper-roman', 'initial', 'none'].indexOf(prop) !== -1 }
    },
    position: {
      type: String,
      default: 'outside',
      validator: prop => { return ['outside', 'inside'].indexOf(prop) !== -1 }
    },
  },

  data() {
    return {
      fontSize: ''
    }
  },

  mounted() {
    // get child component / element font size for base-list
    this.$nextTick(() => {
      let isSlotted = this.$el.lastElementChild.firstElementChild
      
      if (isSlotted) {
        if (isSlotted.style.fontSize) {          
          this.fontSize = isSlotted.style.fontSize
        }
      }
    })
  },

  computed: {
    styling() {
      let marker

      if (this.marker) {
        marker = this.marker
      } else { // set default markers for unifying list styles for different browsers
        if (this.type[0] === 'o') {
          marker = 'decimal'
        } else {
          marker = 'disc'
        }
      }

      return {
        'list-style-type': marker,
        'list-style-position': this.position ? this.position : false,
        fontSize: this.fontSize ? this.fontSize : false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-list {
  padding-left: 2em;

  li { line-height: 1.6em; }

  /* @at-root {
    ol#{&} {}
    ul#{&} {}
  } */
}
</style>
