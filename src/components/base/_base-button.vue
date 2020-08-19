<template>
  <button
    v-on="listeners"
		@click="buttonClicked"
    class="base-button"
    :class="[classing]"
    :style="[styling, mixinMargins]"
  >
    <base-icon v-if="icon" :icon="icon"></base-icon>
    <slot>baseButton</slot>
    <base-loader v-if="loading"></base-loader>
  </button>
</template>

<script>
// LISÄÄ MYÖS MAHDOLLUSUUS LISÄTÄ IKONI VAIHTOEHTOISeSTI TEKSTIN OIKEALLE PUOLELLE!!

import { sizing, margins, dynamicStyleSet } from '@/utils/mixins';
import { intoKebabCase } from '@/utils/strings';

export default {
  name: 'baseButton',

  mixins: [sizing, margins, dynamicStyleSet],

  props: {
    icon: String,
    disabled: Boolean,
    center: Boolean,
    stretch: Boolean,
    rounded: Boolean,
    highlight: Boolean,
    empty: Boolean,
    pseudo: Boolean,
    inverted: Boolean,
    loading: false
  },

  computed: {
    listeners() {
      return { ...this.$listeners }
    },

    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
        [`${this.icon}`]: this.icon ? this.icon : false,
        rounded: this.rounded,
        highlight: this.highlight,
        disabled: this.disabled,
        center: this.center,
        stretch: this.stretch,
        empty: this.empty,
        pseudo: this.pseudo,
        inverted: this.inverted,
        loading: this.loading
      }
    },

    styling() {
      return {
        fontSize: this.mixinSizing,
        lineHeight: '1.4em'
      }
    }
	},
	
	methods: {
		buttonClicked() {
			this.$emit('clicked')
		}
	}
};
</script>

<style lang="scss" scoped>
$button-color: $app-color--button;
$button-color--bg: $app-color--button-bg;
$button-color--highlight: $app-color--button-highlight;
$button-color--icons: $app-color--button;
$button-color--focus: $app-color--input-focus;
$button-font: $app-font--button;
$button-height: 2.6em !default;
$button-side: 1.4em !default;
$disabled-button-opacity--default: 0.4;

.base-button {
  display: flex;
  align-items: center;
  position: relative; // for icons
  padding: 0 $button-side;
  height: $button-height;
  //line-height: this.styling();
  //font-size: this.styling();
  font-weight: 700;
  font-family: $button-font;
  //text-transform: capitalize;
  @extend %clickable;
  outline: 0;
  user-select: none;
  -webkit-tap-highlight-color: transparent; // ignore tap active state (non-standard across browsers)
  &:focus {
    &::before {
      $focused--border-width: -4px;
      content: '';
      position: absolute;
      top: $focused--border-width;
      left: $focused--border-width;
      right: $focused--border-width;
      bottom: $focused--border-width;
      border: 6px solid $button-color--focus;
    }
  }

  .base-icon {
    width: calc(#{$button-height} * 0.7);
    height: calc(#{$button-height} * 0.7);
    margin-right: 0.6rem;
  }
  .base-loader {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.5em;
    right: 0.5em;
  }

  //&.discord { background-color: colorlist("custom", "discord") !important; }
  //&.facebook { background-color: colorlist("custom", "facebook") !important; }
  //&.twitch { background-color: colorlist("custom", "twitch") !important; }
  //&.twitter { background-color: colorlist("custom", "twitter") !important; }
  //&.youtube { background-color: colorlist("custom", "youtube") !important; }

  &.disabled {
    //pointer-events: none !important;
    @extend %disabled;
    opacity: $disabled-button-opacity--default;
    outline: 0;
    &:focus {
      outline: 0;
      &::before { border-color: transparent; }
    }
  }
  &.rounded {
    border-radius: calc(#{$button-height} / 2) !important;
    padding: 0 1.8em;
  }
  &.center { margin: 0 auto; }
  &.stretch {
    width: 100%;
    justify-content: center;
  }

  &.style-set-0 {
    border: none;
    //border-radius: 3px;
    @extend %app-default--border-radius;
    background: $button-color--bg;
    color: $button-color;
    &:hover {
      background: $button-color--highlight;
      color: $button-color--bg;
    }
    &.disabled { opacity: 0.2; }
    &.highlight {
      background: $button-color--highlight;
      &:hover {
        opacity: 1;
        color: $button-color--bg;
      }
    }
    &.empty {
      border: 1px solid $button-color--bg;
      background: $button-color;
      color: $button-color--bg;
      &:hover {
        opacity: 1 !important;
        background-color: $button-color--bg;
        color: $button-color;
      }
      &.highlight {
        border: 1px solid $button-color--highlight;
        background: $button-color;
        color: $button-color--highlight;
        &:hover {
          background: $button-color--highlight;
          color: $button-color;
        }
      }
    }
    &.pseudo {
      border: 1px solid transparent;
      background: transparent;
      color: $button-color--bg;
      &:hover { background: transparentize($button-color--bg, 0.85); }
    }
    &.inverted {
      border: 1px solid transparent;
      background: $button-color;
      color: $button-color--bg;
      &:hover {
				//background: transparentize($button-color--bg, 0.85);
				color: $button-color--highlight;
			}
    }
    &.loading {
      color: $button-color--bg;
      &.highlight { color: $button-color--highlight; }
      &.empty { color: $button-color; }
      &.pseudo { color: transparent; }
    }
  }

  /* &.style-set-1 {
    @extend .style-set-0; // optional
    // customize here!
  } */
}
</style>
