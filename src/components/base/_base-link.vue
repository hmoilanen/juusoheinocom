<template>
  <component
    :is="linkIs"
    :to="linkTo.to"
    :href="linkTo.href"
    :target="newTab.target"
    :rel="newTab.rel"
    class="base-link"
    :style="[styling, mixinMargins]"
    v-on="listeners"
  >
    <slot>{{ $options.name }}</slot>
  </component>
</template>

<script>
import { sizing, margins } from "@/utils/mixins";

export default {
  name: "baseLink",

  mixins: [sizing, margins],

  props: {
    to: {
      type: [String, Object],
      default: "https://constlet.com/"
    },
    mode: {
      type: String,
      default: 'router', // '' or 'a' = <a/> / 'tab' =  <a/> -> open new tab / 'router' = <router-link/>
      validator(prop) {
        return ['', 'a', 'tab', 'router'].indexOf(prop) !== -1
      }
    },
    display: String
  },

  data() {
    return {
      mixinSizeCategories: { s: 7, m: 8, l: 9, xl: 10 },
    }
  },

  computed: {
    linkIs() {
      if (this.mode === 'router') return 'router-link'
      else return 'a'
    },

    linkTo() {
      let to
      
      if (typeof this.to === 'object') {
        to = {}
        let keys = Object.keys(this.to)
        keys.forEach(key => {
          to[key] = this.to[key]
        })
      } else { // if string        
        to = this.to
      }

      return {
        href: this.mode !== 'router' ? to : false,
        to: this.mode === 'router' ? this.to : false,
      }
    },

    newTab() {
      if (this.mode === 'tab') {
        return {
          target: this.mode === 'tab' ? '_blank' : false,
          rel: this.mode === 'tab' ? 'noopener noreferrer' : false,
        }
      } else return {}
    },

    styling() {
      return {
        fontSize: this.mixinSizing,
        display: this.display ? this.display : false
      };
    },

    listeners() {
      return { ...this.$listeners }
    }
  }
};
</script>

<style lang="scss" scoped>
.base-link {
  @extend %clickable;
	text-decoration: none;    

	&:hover { color: initial; }
	&:link { color: initial; } // Unvisited link
	&:visited { color: initial; } // Visited link
	&:active { color: initial; } // Link on click
}
</style>
