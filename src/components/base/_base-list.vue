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
      validator: prop => { return ['disc', 'circle', 'square', 'decimal', 'decimal-leading-zero', 'lower-alpha', 'lower-roman', 'upper-alpha', 'upper-roman', 'initial', 'none'].indexOf(prop) !== -1 }
    },
    position: {
      type: String,
      validator: prop => { return ['outside', 'inside'].indexOf(prop) !== -1 }
    },
  },

  data() {
    return {
      fontSize: ''
    }
  },

  mounted() {
    // get child component / element font size
    this.$nextTick(() => {
      let isSlotted = this.$el.lastElementChild.firstElementChild
      
      if (isSlotted) {
        if (isSlotted.style.fontSize) {
          console.log('löyty', isSlotted.style.fontSize);
          
          this.fontSize = isSlotted.style.fontSize
        }
      }

      /* if (this.$children[0]) {
        this.fontSize = this.$children[0].$el.style.fontSize
        let jaa = this
        let jaa2 = this.$el.lastElementChild.firstElementChild.style.fontSize
        console.log('component', jaa);
        console.log('component2', jaa2);
      } else {
        let joo = this
        //let joo2 = this.$el.lastElementChild.firstElementChild
        let joo2 = this.$el.lastElementChild
        console.log('element', joo);
        console.log('element2', joo2);
      } */
    })
  },

  computed: {
    styling() {
      return {
        'list-style-type': this.marker ? this.marker : false,
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

  @at-root {
    ol#{&} { color: red; }
    ul#{&} { color: blue; }
  }

  li { line-height: 1.6em; }
}
</style>
