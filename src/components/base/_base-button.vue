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
import { sizing, margins } from '@/utils/mixins';
import { intoKebabCase } from '@/utils/strings';

export default {
  name: 'baseButton',

  mixins: [sizing, margins],

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

.base-button {
  display: flex;
  align-items: center;
  position: relative; // for icons
  padding: 0 $button-side;
  height: $button-height;
	border: none;
	@extend %app-default--border-radius;
	background: $button-color--bg;
	color: $button-color;
  //line-height, see: this.styling
  //font-size, see: this.styling
  font-weight: 700;
  font-family: $button-font;
  @extend %clickable;
  outline: 0;
  user-select: none;
  -webkit-tap-highlight-color: transparent; // Ignore tap active state (non-standard across browsers)
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
	&:hover {
		background: $button-color--highlight;
		color: $button-color--bg;
	}

  &.disabled {
    @extend %disabled;
    opacity: 0.2;
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
		&:hover { color: $button-color--highlight; }
	}
	&.loading {
		color: $button-color--bg;
		&.highlight { color: $button-color--highlight; }
		&.empty { color: $button-color; }
		&.pseudo { color: transparent; }
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
}
</style>
