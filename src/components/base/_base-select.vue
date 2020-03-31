<template>
  <div class="base-select" :class="classing" :style="mixinMargins">

    <label v-if="label">
      {{ this.label }}
      <span v-if="required"> (required)</span>
    </label>

    <div class="base-select-body" :style="styling">

      <!-- only for visual purpose -->
      <div class="placeholder">
        <span>{{ this.dynamicPlaceholder }}</span>
        <base-icon size="s">down</base-icon>
      </div>

      <select v-model="selected">
        <option disabled value="">{{ this.dynamicPlaceholder }}</option>
        <option
          v-for="(option, index) in options"
          :key="option + index"
        >{{ option }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { sizing, margins, dynamicStyleSet } from '@/utils/mixins'

export default {
  name: 'baseSelect',

  mixins: [sizing, margins, dynamicStyleSet],

  props: {
    value: [String, Number],
    options: {
      type: Array,
      default: () => { return ['option 1', 'option 2', 'option 3'] }
    },
    label: String,
    required: Boolean,
    placeholder: {
      type: String,
      default: 'Select...'
    },
    width: {
      type: String,
      default: '100%'
    }
  },

  data() {
    return {
      selected: null
    }
  },

  watch: {
    value: {
      immediate: true,
      handler: function(newValue) {
        this.selected = newValue
      }
    },

    selected: function() {
      this.$emit('input', this.selected)
    }
  },

  computed: {
    dynamicPlaceholder() {
      return this.value ? this.value : this.placeholder
    },

    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
        required: this.required
      }
    },

    styling() {
      return {
        fontSize: this.mixinSizing,
        padding: '1em 1.4em',
        width: this.width
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$select-color: $app-color--input;
$select-color--bg: $app-color--theme;
$select-color--border: $app-color--input-border;
$select-color--label: $app-color--input-label;
$select-color--required: $app-color--error;
$select-color--icons: $select-color;
$select-font: $app-font--input;
$select-font--label: $app-font--label;

.base-select {

  &.style-set-0 {
    label {
      display: block;
      margin-bottom: 0.3em;
      font-size: 0.9em;
      font-weight: 500;
      font-family: $select-font--label;
      color: $select-color--label;
      span {
        color: $select-color--required;
      }
    }

    .base-select-body {
      display: block;
      position: relative;
      //padding: ; // see: this.styling
      border: 1px solid $select-color--border;
      border-radius: 3px;
      background: $select-color--bg;
      color: $select-color;
      font-size: 0.9em;
      font-weight: 500;
      &:hover {
        color: $select-color--bg;
        background: $select-color--border;
      }
      .placeholder {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          flex: 1;
          margin-right: 0.6em;
        }
        svg {
          width: 1.1em;
          height: 1.1em;
          @extend %rotate-0;
          .is-open & {
            @extend %rotate-180;
          }
        }
      }
  
      select {
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        max-width: 100%;
        appearance: none;
        outline: 0;
        @extend %clickable;
        option { // non-cross-browser solution
          min-height: 1.2em;
          font-size: 1rem;
        }
      }
    }
  }

  /* &.style-set-1 {
    @extend .style-set-0; // optional
    // customize here!
  } */
}

</style>