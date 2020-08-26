<template>
  <div
    class="base-textarea"
    :class="classing"
    :style="[styling, mixinMargins]"
  >
    <div class="top">
      <base-label
				v-if="label"
				:required="required"
			>{{ this.label }}</base-label>
      <div
				v-if="maxLength"
				class="counter"
			>{{ this.currentLength }} / {{ this.maxLength }}</div>
    </div>

    <textarea
      ref="textarea"
      :value="value"
      :rows="rows"
      :maxlength="maxLength"
      v-bind="$attrs"
      v-on="listeners"
    ></textarea>

    <base-feedback v-if="feedback" :mT="2">{{ this.feedback }}</base-feedback>
  </div>
</template>

<script>
import { sizing, margins } from '@/utils/mixins'

export default {
  name: 'BaseTextarea',

  inheritAttrs: false,

  mixins: [sizing, margins],

  props: {
    value: String,
    label: String,
    required: Boolean,
    disabled: Boolean,
    feedback: String,
    focused: Boolean,
    maxLength: Number,
    rows: { // Default / vertical size without text content
      type: Number,
      default: 3
    },
  },

  data() {
    return {
      mixinSizeCategories: { s: 7, m: 8, l: 9, xl: 10 }
    }
  },

  mounted() {
    const ref = this.$refs.textarea

    const resize = () => {
      ref.style.height = 'auto'
      ref.style.height = ref.scrollHeight + 'px'
    }

    // 0-timeout to get the already changed text
    const delayedResize = () => {
      window.setTimeout(resize, 0)
    }

    this.observe(ref, 'change', delayedResize)
    this.observe(ref, 'cut', delayedResize)
    this.observe(ref, 'paste', delayedResize)
    this.observe(ref, 'drop', delayedResize)
    this.observe(ref, 'keydown', delayedResize)

    resize()
  },

  watch: {
    focused: {
      immediate: true,
      handler() {
        if (this.focused) {
          this.$nextTick(() => this.$refs.textarea.focus())
        }
      }
    }
  },

  methods: {
    observe(element, event, handler) {
      if (window.attachEvent) {
        // Only for IE8- (if any problems occur, it's possible to get rid of)
        element.attachEvent('on' + event, handler)
      } else {
        element.addEventListener(event, handler, false)
      }

      this.$on('hook:beforeDestroy', () => {
        element.removeEventListener(event, handler)
      })
    }
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => { // =verride input from $listeners
          this.$emit('input', event.target.value)
        }
      }
    },

    classing() {
      return {
        disabled: this.disabled,
        feedback: this.feedback
      }
    },

    styling() {
      return {
        fontSize: this.mixinSizing
      }
    },

    currentLength() {
      return this.value.length
    }
  }
}
</script>

<style lang="scss" scoped>
$textarea-color: $app-color--input;
$textarea-color--border: $app-color--input-border;
$textarea-color--bg-focus: $app-color--input-focus;
$textarea-color--placeholder: $app-color--input-placeholder;
$textarea-font: $app-font--input;
$textarea-font--placeholder: $app-font--placeholder;

.base-textarea {
  // font-size, see: this.styling
  width: 100%;
	&.disabled { @extend %input--disabled; }

	textarea {
		overflow: hidden;
		outline: 0;
		resize: none;
		transition: all 0.3s ease;
		display: block;
		width: 100%;
		@extend %input--border;
		border-color: $textarea-color--border;
		padding: 0.6rem;
		font-size: inherit;
		line-height: 1.4em;
		font-family: $textarea-font;
		color: $textarea-color;
		&:focus { background: $textarea-color--bg-focus; }
		&::placeholder {  // Not supported in all browsers... Otherwise behaves like regular text content
			font-weight: 500;
			font-family: $textarea-font--placeholder;
			color: $textarea-color--placeholder;
		}
	}

	.top {
		display: flex;
		justify-content: space-between;
	}
	.counter {
		display: flex;
		justify-content: flex-end;
		font-size: 0.85em;
		font-weight: 700;
	}
}
</style>
