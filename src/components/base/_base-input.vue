<template>
  <div
    class="base-input"
    :class="classing"
    :style="[styling.root, mixinMargins]"
  >
    <base-label v-if="label" :required="required">{{ this.label }}</base-label>

    <div class="input-container">
      <input
        ref="input"
        :value="value"
        :type="type"
        :style="styling.input"
        v-bind="$attrs"
        v-on="listeners"
        @keydown.enter.prevent
      />
      <base-icon
        v-if="iconLeft"
        @click="clickIcon('left')"
        :style="styling.iconLeft"
      >{{ this.iconLeft }}</base-icon>
      <base-icon
        v-if="iconRight"
        @click="clickIcon('right')"
        :style="styling.iconRight"
      >{{ this.iconRight }}</base-icon>
    </div>

    <base-feedback v-if="feedback" :mT="2">{{ this.feedback }}</base-feedback>
  </div>
</template>

<script>
import { sizing, margins } from '@/utils/mixins'

export default {
  name: 'baseInput',

  inheritAttrs: false,

  mixins: [sizing, margins],

  props: {
    type: {
      type: String,
      default: 'text',
      validator: prop => {
        return ['text', 'password', 'email', 'number', 'search', 'tel', 'url'].indexOf(prop) !== -1
      }
    },
    value: String,
    label: String,
    required: Boolean,
    disabled: Boolean,
    feedback: String,
    focused: Boolean,
    iconLeft: String,
    iconRight: String
  },

  data() {
    return {
      mixinSizeCategories: { s: 7, m: 8, l: 9, xl: 10 }
    }
  },

  watch: {
    focused: {
      immediate: true,
      handler() {
        if (this.focused) {
          this.$nextTick(() => this.focusInput())
        }
      }
    }
  },

  methods: {
    focusInput() {
      this.$refs.input.focus()
    },

    clickIcon(side) {
      if (side === 'right' && this.iconRight === 'close') {
        this.focusInput()
        this.$emit('input', '')
      } else this.$emit(side + 'IconClicked')
    }
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => { // Override input from $listeners
          this.$emit('input', event.target.value)
          this.$emit('updated', event.target.value) // If v-model is insufficient
        }
      }
    },

    classing() {
      return {
        required: this.required,
        disabled: this.disabled,
        feedback: this.feedback
      }
    },

    styling() {
      let inputHeight = 3.4 // = em
      let baseInputPadding = inputHeight * 0.2 // = em
      let leftIconSize = 1.8 // = em
      let rightIconSize = 1.1 // = em

      return {
        root: { fontSize: this.mixinSizing },
        input: {
          height: inputHeight + 'em',
          paddingLeft: this.iconLeft
            ? baseInputPadding * 1.8 + leftIconSize + 'em' // In theory, * 2, but eye tells better :)
            : baseInputPadding + 'em',
          paddingRight: this.iconRight
            ? baseInputPadding * 1.8 + rightIconSize + 'em' // ^^
            : baseInputPadding + 'em'
        },
        iconLeft: {
          left: baseInputPadding + 'em',
          height: leftIconSize + 'em',
          width: leftIconSize + 'em'
        },
        iconRight: {
          right: baseInputPadding + 'em',
          height: rightIconSize + 'em',
          width: rightIconSize + 'em'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$input-color: $app-color--input;
$input-color--border: $app-color--input-border;
$input-color--bg: $app-color--theme;
$input-color--bg-focus: $app-color--input-focus;
$input-color--placeholder: $app-color--input-placeholder;
$input-color--icons: $input-color;
$input-color--feedback: $app-color--input-feedback;
$input-font: $app-font--input;
$input-font--placeholder: $app-font--placeholder;

.base-input {
  width: 100%;
  // font-size, see: this.styling
  &.disabled { @extend %input--disabled; }

	.input-container {
		font-size: inherit !important;
		position: relative;
		svg {
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			@extend %clickable;
			color: $input-color--icons !important;
		}
	}
	input {
		transition: all 0.3s ease-in-out;
		outline: 0;
		@extend %input--border;
		border-color: $input-color--border;
		width: 100%;
		//padding, see: this.styling.input
		background: $input-color--bg;
		font-size: inherit;
		letter-spacing: 0.05em;
		font-family: $input-font;
		color: $input-color;
		&:focus { background: $input-color--bg-focus; }
		&::placeholder { // Not supported in all browsers... Otherwise behaves like regular text content
			font-weight: 500;
			font-family: $input-font--placeholder;
			color: $input-color--placeholder;
		}
	}
}
</style>
