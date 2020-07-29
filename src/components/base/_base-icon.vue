<template>
  <!-- Note: ViewBox is set to '0 0 50 50' because of the size of svgs. -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    :width="mixinSizing"
    :height="mixinSizing"
    :aria-labelledby="icon"
    role="presentation"
    class="base-icon"
    :class="classing"
    :style="mixinMargins"
    v-on="listeners"
  >
    <title v-if="tooltip" :id="icon" lang="en">{{ this.tooltip }}</title>

    <g :fill="app">
      <component :is="dynamicIcon"></component>
    </g>
  </svg>
</template>

<script>
import { sizing, margins } from "@/utils/mixins"

export default {
  name: "baseIcon",

  mixins: [sizing, margins],

  props: {
    icon: { // Note: use prop instead of slot in case of dynamic icon!
      type: String,
      default: "spot"
    },
    app: { // e.g. twitter / twitch / other external apps
      type: String,
      default: "currentColor"
    },
    size: [Number, String],
    tooltip: String,
    clickable: Boolean
  },

  data() {
    return {
      mixinSizeCategories: { s: 8, m: 10, l: 14, xl: 18 }
    };
  },

  computed: {
    dynamicIcon() {
      if (this.$slots.default) { // = by slot
        return "icon-" + this.$slots.default[0].text;
      }
      return "icon-" + this.icon; // = by prop
    },

    listeners () {
      return { ...this.$listeners }
    },

    classing() {
      return {
        clickable: this.clickable
      }
    }
  },

  components: {
    iconAftereffects: () => import("@/components/icons/iconAftereffects"),
    iconArchicad: () => import("@/components/icons/iconArchicad"),
		iconBacktotop: () => import("@/components/icons/iconBacktotop"),
		iconConstlet: () => import("@/components/icons/iconConstlet"),
    iconContact: () => import("@/components/icons/iconContact"),
		iconCss: () => import("@/components/icons/iconCss"),
    iconFirebase: () => import("@/components/icons/iconFirebase"),
    iconGit: () => import("@/components/icons/iconGit"),
		iconGithub: () => import("@/components/icons/iconGithub"),
		iconHtml: () => import("@/components/icons/iconHtml"),
    iconIllustrator: () => import("@/components/icons/iconIllustrator"),
    iconIndesign: () => import("@/components/icons/iconIndesign"),
    iconJava: () => import("@/components/icons/iconJava"),
    iconJavascript: () => import("@/components/icons/iconJavascript"),
		iconJest: () => import("@/components/icons/iconJest"),
		iconJuusoheino: () => import("@/components/icons/iconJuusoheino"),
		iconLinkedin: () => import("@/components/icons/iconLinkedin"),
    iconLove: () => import("@/components/icons/iconLove"),
    iconPhotoshop: () => import("@/components/icons/iconPhotoshop"),
		iconQuote: () => import("@/components/icons/iconQuote"),
    iconReact: () => import("@/components/icons/iconReact"),
    iconRedirect: () => import("@/components/icons/iconRedirect"),
    iconSass: () => import("@/components/icons/iconSass"),
    iconSql: () => import("@/components/icons/iconSql"),
		iconSuccessFrame: () => import("@/components/icons/iconSuccessFrame"),
    iconSuccessInner: () => import("@/components/icons/iconSuccessInner"),
    iconVue: () => import("@/components/icons/iconVue"),
    iconXd: () => import("@/components/icons/iconXd"),
  }
};
</script>

<style lang="scss">
svg.base-icon {
  &.clickable { @extend %clickable; }
}
</style>
