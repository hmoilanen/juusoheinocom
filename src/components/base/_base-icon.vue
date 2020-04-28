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
    :style="mixinMargins"
    v-on="listeners"
  >
    <title :id="icon" lang="en">{{ tooltip ? tooltip : icon }}</title>

    <g :fill="app">
      <component :is="dynamicIcon"></component>
    </g>
  </svg>
</template>

<script>
// TODOS:
// PROP - IMPLEMENTOI KAIKKI PROJEKTIVÄRIT TÄHÄN SISÄÄN ?

import { sizing, margins } from "@/utils/mixins";

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
    }
  },

  components: {
    iconAccount: () => import("@/components/icons/iconAccount"),
    iconAdd: () => import("@/components/icons/iconAdd"),
    iconAdmin: () => import("@/components/icons/iconAdmin"),
    iconAlert: () => import("@/components/icons/iconAlert"),
    iconAvatar: () => import("@/components/icons/iconAvatar"),
    iconClose: () => import("@/components/icons/iconClose"),
    iconCog: () => import("@/components/icons/iconCog"),
    iconComment: () => import("@/components/icons/iconComment"),
    iconConstlet: () => import("@/components/icons/iconConstlet"),
    iconContent: () => import("@/components/icons/iconContent"),
    iconDelete: () => import("@/components/icons/iconDelete"),
    iconDiscord: () => import("@/components/icons/iconDiscord"),
    iconDown: () => import("@/components/icons/iconDown"),
    iconDownload: () => import("@/components/icons/iconDownload"),
    iconDrag: () => import("@/components/icons/iconDrag"),
    iconE: () => import("@/components/icons/iconE"),
    iconEdit: () => import("@/components/icons/iconEdit"),
    iconFacebook: () => import("@/components/icons/iconFacebook"),
    iconGithub: () => import("@/components/icons/iconGithub"),
    iconInstagram: () => import("@/components/icons/iconInstagram"),
    iconJuusoheino: () => import("@/components/icons/iconJuusoheino"),
    iconLeft: () => import("@/components/icons/iconLeft"),
    iconLink: () => import("@/components/icons/iconLink"),
    iconLinkedin: () => import("@/components/icons/iconLinkedin"),
    iconMenu: () => import("@/components/icons/iconMenu"),
    iconMixer: () => import("@/components/icons/iconMixer"),
    iconNode: () => import("@/components/icons/iconNode"),
    iconPad: () => import("@/components/icons/iconPad"),
    iconReddit: () => import("@/components/icons/iconReddit"),
    iconRedirect: () => import("@/components/icons/iconRedirect"),
    iconRefresh: () => import("@/components/icons/iconRefresh"),
    iconRight: () => import("@/components/icons/iconRight"),
    iconSearch: () => import("@/components/icons/iconSearch"),
    iconSend: () => import("@/components/icons/iconSend"),
    iconShare: () => import("@/components/icons/iconShare"),
    iconSort: () => import("@/components/icons/iconSort"),
    iconSpot: () => import("@/components/icons/iconSpot"),
    iconSquad: () => import("@/components/icons/iconSquad"),
    iconTag: () => import("@/components/icons/iconTag"),
    iconTime: () => import("@/components/icons/iconTime"),
    iconTwitch: () => import("@/components/icons/iconTwitch"),
    iconTwitter: () => import("@/components/icons/iconTwitter"),
    iconUp: () => import("@/components/icons/iconUp"),
    iconUpload: () => import("@/components/icons/iconUpload"),
    iconYoutube: () => import("@/components/icons/iconYoutube"),

    // games
    iconCsgo: () => import("@/components/icons/iconCsgo"),
    iconDota2: () => import("@/components/icons/iconDota2"),
    iconFortnite: () => import("@/components/icons/iconFortnite"),
    iconLol: () => import("@/components/icons/iconLol"),
    iconOverwatch: () => import("@/components/icons/iconOverwatch"),
    iconPubg: () => import("@/components/icons/iconPubg"),
    iconRocket: () => import("@/components/icons/iconRocket")
  }
};
</script>

<style lang="scss">
svg.base-icon {
  g[fill="juusoheino"] {
    #base-icon--color-juusoheino-main { fill: $app-color--main; }
    #base-icon--color-juusoheino-hl { fill: $app-color--hl; }
  }
  g[fill="discord"] { fill: colorlist("custom", "discord"); }
  g[fill="facebook"] { fill: colorlist("custom", "facebook"); }
  g[fill="linkedin"] { fill: colorlist("custom", "linkedin"); }
  g[fill="reddit"] { fill: colorlist("custom", "reddit"); }
  g[fill="twitch"] { fill: colorlist("custom", "twitch"); }
  g[fill="twitter"] { fill: colorlist("custom", "twitter"); }
  g[fill="youtube"] { fill: colorlist("custom", "youtube"); }
  g[fill="mixer"] {
    #main { fill: colorlist("custom", "mixer"); }
    #sub { fill: colorlist("custom", "mixer2"); }
  }
}
</style>
