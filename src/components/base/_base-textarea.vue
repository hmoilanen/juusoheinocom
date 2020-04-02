<template>
  <div
    class="base-textarea"
    :class="classing"
    :style="[styling, mixinMargins]"
  >
    <base-label v-if="label" :required="required">
      {{ this.label }}
    </base-label>

    <textarea
      ref="textarea"
      :value="value"
      @focus="toggleFocus(true)"
      @blur="toggleFocus(false)"
      :rows="rows"
      :placeholder="$attrs.placeholder"
      v-on="listeners"
      :maxlength="maxLength"
    ></textarea>
  </div>
</template>

<script>
import { sizing, margins, dynamicStyleSet } from '@/utils/mixins'

export default {
  name: 'baseTextarea',

  mixins: [sizing, margins, dynamicStyleSet],

  props: {
    value: String,
    rows: {
      type: Number,
      default: 3
    },
    label: String,
    required: Boolean,
    maxLength: Number
  },

  data() {
    return {
      focused: false,
      mixinSizeCategories: { s: 7, m: 8, l: 9, xl: 10 }
    }
  },

  mounted() {
    let ref = this.$refs.textarea

    function resize() {
      ref.style.height = 'auto'
      ref.style.height = ref.scrollHeight + 'px'
    }

    // 0-timeout to get the already changed text
    function delayedResize() {
      window.setTimeout(resize, 0)
    }

    this.observe(ref, 'change', delayedResize)
    this.observe(ref, 'cut', delayedResize)
    this.observe(ref, 'paste', delayedResize)
    this.observe(ref, 'drop', delayedResize)
    this.observe(ref, 'keydown', delayedResize)

    resize()
  },

  methods: {
    observe(element, event, handler) {
      if (window.attachEvent) {
        // this is only for IE8- (if any problems occur, it's possible to get rid of)
        element.attachEvent('on' + event, handler)
      } else {
        element.addEventListener(event, handler, false)
      }

      this.$on('hook:beforeDestroy', () => {
        element.removeEventListener(event, handler)
      })
    },

    toggleFocus(boolean) {
      this.focused = boolean
    },

    emitInput() {
      this.$emit('input', this.$refs.textarea.value)
    }
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: () => { // override input from $listeners
          this.emitInput()
        }
      }
    },

    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
        focused: this.focused
      }
    },

    styling() {
      return {
        fontSize: this.mixinSizing
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$textarea-color: $app-color--input;
$textarea-color--border: $app-color--input-border;
$textarea-color--bg: $app-color--theme;
$textarea-color--placeholder: $app-color--input-placeholder;
$textarea-font: $app-font--input;
$textarea-font--placeholder: $app-font--placeholder;

.base-textarea {
  // font-size: ; // see: this.styling

  &.style-set-0 {
    textarea {
      overflow: hidden;
      outline: 0;
      resize: none;
      transition: all 0.3s ease;
      width: 100%;
      border: 1px solid lighten(desaturate($textarea-color--border, 30%), 30%);
      border-radius: 3px;
      padding: 0.6rem;
      font-size: inherit;
      line-height: 1.4em;
      font-family: $textarea-font;
      color: $textarea-color;
      &::placeholder {
        // not supported in all browsers, but behaves as regular text content if not
        font-weight: 500;
        font-family: $textarea-font--placeholder;
        color: $textarea-color--placeholder;
      }
    }
    &.focused textarea {
      border: 1px solid $textarea-color;
    }
  }

  /* &.style-set-1 {
    @extend .style-set-0; // optional
    // customize here!
  } */
}
</style>
