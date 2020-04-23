<template>
  <div
    class="base-textarea"
    :class="classing"
    :style="[styling, mixinMargins]"
  >
    <base-flex>
      <base-label v-if="label" :required="required" flex-1>{{ this.label }}</base-label>
      <div v-if="maxLength" class="counter">{{ this.currentLength }} / {{ this.maxLength }}</div>
    </base-flex>

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
//TEE NIIN, ETTÄ JOS ANNETTU MAX-LENGTH VOI MYÖS ANTAA "PROP: showCounter", TMS, JOLLOIN MERKKILASKURI NÄKYY!!!!!

import { sizing, margins, dynamicStyleSet } from '@/utils/mixins'

export default {
  name: 'baseTextarea',

  inheritAttrs: false,

  mixins: [sizing, margins, dynamicStyleSet],

  props: {
    value: String,
    label: String,
    required: Boolean,
    disabled: Boolean,
    feedback: String,
    focused: Boolean,
    maxLength: Number,
    rows: { // default size
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
        // only for IE8- (if any problems occur, it's possible to get rid of)
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
        input: event => { // override input from $listeners
          //this.emitInput()
          //this.$emit('input', this.$refs.textarea.value)
          this.$emit('input', event.target.value)
        }
      }
    },

    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
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
$textarea-color--bg: $app-color--theme;
$textarea-color--placeholder: $app-color--input-placeholder;
$textarea-color--feedback: $app-color--input-feedback;
$textarea-font: $app-font--input;
$textarea-font--placeholder: $app-font--placeholder;

.base-textarea {
  width: 100%;
  // font-size: ; // see: this.styling
  &.disabled { @extend %input--disabled; }

  &.style-set-0 {
    textarea {
      overflow: hidden;
      outline: 0;
      resize: none;
      transition: all 0.3s ease;
      display: block;
      width: 100%;
      @extend %input--border;
      border-color: $textarea-color--border;
      //border: 1px solid lighten(desaturate($textarea-color--border, 30%), 30%);
      //border-radius: 3px;
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
    .counter {
      display: flex;
      justify-content: flex-end;
      font-size: 0.85em;
      font-weight: 700;
    }
    //&.feedback textarea { border-color: $textarea-color--feedback; }
  }

  /* &.style-set-1 {
    @extend .style-set-0; // optional
    // customize here!
  } */
}
</style>
