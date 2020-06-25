<template>
  <component
    :is="linkIs"
    :to="linkTo.to"
    :href="linkTo.href"
    :target="newTab.target"
    :rel="newTab.rel"
    class="base-link"
    :class="classing"
    :style="[styling, mixinMargins, mixinPaddings]"
    v-on="listeners"
  >
    <slot>{{ this.editableInnerContent }}</slot>
  </component>
</template>

<script>
import { sizing, margins, paddings, dynamicStyleSet, editableContent } from "@/utils/mixins";

export default {
  name: "baseLink",

  mixins: [sizing, margins, paddings, dynamicStyleSet, editableContent],

  props: {
    to: {
      type: [String, Object],
      default: "https://constlet.com/"
    },
    mode: {
      type: String,
      default: 'router' // '' = default <a/> / 'tab' =  <a/> + new tab / 'router' = <router-link/>
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

    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
      }
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
$link-color: $app-color--text-link;
$link-color--hover: $app-color--text-link-hover;
$link-font: $app-font--link;

.base-link {
  @extend %clickable;

  //&::v-deep > * { color: inherit !important; } // for child custom components

  &.style-set-0 {
    //font-size: 1.05em;
    //font-weight: 700;
    //font-family: $link-font;
    //color: $link-color;
    text-decoration: none;    

    &:hover {
      //color: $link-color--hover !important;
      color: initial;
      //border-bottom-color: $link-color--hover; // TÄMÄ ON STYLE_SET -KAMAA!
      //text-decoration: underline;
    }  
    //&:link { color: $link-color; } // unvisited link
    &:link { color: initial; } // unvisited link
    //&:visited { color: $link-color; } // visited link
    &:visited { color: initial; } // visited link
    //&:active { color: $link-color--hover; } // link on click
    &:active { color: initial; } // link on click
  }
}
</style>
