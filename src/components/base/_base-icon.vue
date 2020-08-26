<template>
  <!-- Note: viewBox is set to '0 0 50 50' because of the size of svgs -->
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
import { sizing, margins } from '@/utils/mixins'

export default {
  name: 'baseIcon',

  mixins: [sizing, margins],

  props: {
    icon: { // Note: use prop instead of slot in case of dynamic icon!
      type: String,
      default: 'love'
    },
    app: { // Eg. twitter / twitch / other external apps
      type: String,
      default: 'currentColor'
    },
    size: [Number, String],
    tooltip: String,
		clickable: Boolean,
		onlyStroke: Boolean
  },

  data() {
    return {
      mixinSizeCategories: { s: 8, m: 10, l: 14, xl: 18 }
    };
  },

  computed: {
    dynamicIcon() {
      if (this.$slots.default) { // By slot
        return 'Icon-' + this.$slots.default[0].text;
      }
      return 'Icon-' + this.icon; // By prop
    },

    listeners () {
      return { ...this.$listeners }
    },

    classing() {
      return {
				clickable: this.clickable,
				'only-stroke': this.onlyStroke
      }
    }
  },

  components: {
    IconAftereffects: () => import('@/components/icons/IconAftereffects'),
    IconArchicad: () => import('@/components/icons/IconArchicad'),
		IconBacktotop: () => import('@/components/icons/IconBacktotop'),
		IconConstlet: () => import('@/components/icons/IconConstlet'),
    IconContact: () => import('@/components/icons/IconContact'),
		IconCss: () => import('@/components/icons/IconCss'),
		IconCypress: () => import('@/components/icons/IconCypress'),
		IconDown: () => import('@/components/icons/IconDown'),
    IconFirebase: () => import('@/components/icons/IconFirebase'),
    IconFill: () => import('@/components/icons/IconFill'),
    IconFit: () => import('@/components/icons/IconFit'),
    IconGit: () => import('@/components/icons/IconGit'),
		IconGithub: () => import('@/components/icons/IconGithub'),
		IconGoto: () => import('@/components/icons/IconGoto'),
		IconHtml: () => import('@/components/icons/IconHtml'),
    IconIllustrator: () => import('@/components/icons/IconIllustrator'),
    IconIndesign: () => import('@/components/icons/IconIndesign'),
    IconJava: () => import('@/components/icons/IconJava'),
    IconJavascript: () => import('@/components/icons/IconJavascript'),
		IconJest: () => import('@/components/icons/IconJest'),
		IconJuusoheino: () => import('@/components/icons/IconJuusoheino'),
		IconLinkedin: () => import('@/components/icons/IconLinkedin'),
    IconLove: () => import('@/components/icons/IconLove'),
    IconMongodb: () => import('@/components/icons/IconMongodb'),
    IconNodejs: () => import('@/components/icons/IconNodejs'),
    IconPhotoshop: () => import('@/components/icons/IconPhotoshop'),
    IconReact: () => import('@/components/icons/IconReact'),
    IconRedirect: () => import('@/components/icons/IconRedirect'),
    IconSass: () => import('@/components/icons/IconSass'),
    IconShuffle: () => import('@/components/icons/IconShuffle'),
    IconSql: () => import('@/components/icons/IconSql'),
		IconSuccessFrame: () => import('@/components/icons/IconSuccessFrame'),
    IconSuccessInner: () => import('@/components/icons/IconSuccessInner'),
    IconVue: () => import('@/components/icons/IconVue'),
    IconXd: () => import('@/components/icons/IconXd'),
  }
}
</script>

<style lang="scss">
svg.base-icon {
	&.clickable { @extend %clickable; }
	&.only-stroke {
		fill: transparent !important;
		color: transparent !important;
		stroke: $app-color--hl !important;
		stroke-width: 5px;
	}
}
</style>
