<template>
  <div
    class="base-input"
    :class="classing"
    :style="[styling.root, mixinMargins]"
  >
    <base-label v-if="label" :required="required">
      {{ this.label }}
    </base-label>

    <div class="input-container">
      <input
        :type="type"
        :value="value"
        ref="input"
        v-bind="$attrs"
        v-on="listeners"
        :style="styling.input"
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

    <!-- TEE TÄSTÄ OMA BASE-KOMPONENTTINSA!!! -> VOI KÄYTTÄÄ MONESSA PAIKASSA!!! -->
    <!-- <base-text v-if="displayFeedback" :mT="3">{{ this.feedback }}</base-text> -->
    <base-feedback v-if="displayFeedback" type="error" :mT="3">{{ this.feedback }}</base-feedback>

  </div>
</template>

<script>
import { sizing, margins, dynamicStyleSet } from '@/utils/mixins'

export default {
  name: 'baseInput',

  inheritAttrs: false,

  mixins: [sizing, margins, dynamicStyleSet],

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
    focused: Boolean,
    iconLeft: String,
    iconRight: String,
    //feedback: [Boolean, String]
    feedback: String
  },

  data() {
    return {
      mixinSizeCategories: { s: 7, m: 8, l: 9, xl: 10 } // customized, see: mixins.js
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
        input: event => { // override input from $listeners
          this.$emit('input', event.target.value)
        }
      }
    },

    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
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
            ? baseInputPadding * 1.8 + leftIconSize + 'em' // in theory, * 2, but eye tells better :)
            : baseInputPadding + 'em',
          paddingRight: this.iconRight
            ? baseInputPadding * 1.8 + rightIconSize + 'em' // in theory, * 2, but eye tells better :)
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
    },

    displayFeedback() {
      /* if (this.feedback && typeof this.feedback === 'string') {
        return true
      } else return false */
      return this.feedback ? true : false
    }
  }
}
</script>

<style lang="scss" scoped>
$input-color: $app-color--input;
$input-color--border: $app-color--input-border;
$input-color--bg: $app-color--theme;
$input-color--placeholder: $app-color--input-placeholder;
$input-color--icons: $input-color;
$input-color--feedback: $app-color--input-feedback;
$input-font: $app-font--input;
$input-font--placeholder: $app-font--placeholder;

.base-input {
  width: 100%;

  &.disabled {
    @extend %disabled;
    opacity: 0.2;
  }

  &.style-set-0 {
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
      //border-color: lighten(desaturate($input-color--border, 30%), 30%);
      //border: 1px solid lighten(desaturate($input-color--border, 30%), 30%);
      //border-radius: 3px;
      width: 100%;
      //padding: ; // see: this.styling.input
      background: $input-color--bg;
      font-size: inherit;
      letter-spacing: 0.05em;
      font-family: $input-font;
      color: $input-color;
      /* &:hover,
      &:focus {
        //border: 1px solid $input-color--border;
        border-color: $input-color--border;
      } */
      &::placeholder { // not supported in all browsers, but behaves as regular text content if not
        font-weight: 500;
        font-family: $input-font--placeholder;
        color: $input-color--placeholder;
      }
    }
    &.feedback {
      input {
        //color: 1px solid $input-color--feedback;
        border-color: $input-color--feedback;
      }
      p { color: $input-color--feedback; }
    }
  }

  /* &.style-set-1 {
    @extend .style-set-0; // optional
    // customize here!
  } */
}
</style>
