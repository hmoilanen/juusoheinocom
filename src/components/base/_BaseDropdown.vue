<template>
  <on-click-outside :do="close">
    <div
			class="base-dropdown"
			:class="classing"
			:style="[styling.root, mixinMargins]"
		>
      <base-label v-if="label" :required="required">{{ this.label }}</base-label>

      <div
        ref="toggle"
        class="toggle"
        :style="styling.toggle"
        tabIndex="0"
        @click="toggle"
        @keydown.esc="close"
        @keydown.up.prevent="activatePrev"
        @keydown.down.prevent="activateNext"
        @keydown.enter.prevent="selectActive"
      >
        <span v-if="selected">{{ this.selected }}</span>
        <span v-else class="placeholder">{{ this.placeholder }}</span>
        <base-icon tooltip="toggle" :only-stroke="true">down</base-icon>
      </div>

      <ul v-show="showDropdown" ref="list" class="list">
        <div
          v-for="(item, index) in value"
          :key="item"
          @click="select(item, index)"
          :class="{ active: activeIndex === index, ['itemi' + index]: true }"
        >{{ item }}</div>
      </ul>

      <base-feedback v-if="feedback" :mT="2">{{ this.feedback }}</base-feedback>
    </div>
  </on-click-outside>
</template>

<script>
import Popper from 'popper.js'
import { sizing, margins } from '@/utils/mixins'
import OnClickOutside from '@/components/OnClickOutside'

export default {
  name: 'BaseDropdown',

  mixins: [sizing, margins],

  components: { OnClickOutside },

  props: {
    value: {
      type: Array,
      default: () => {
        let amount = 20
        let array = []
        for (let i = 0; i < amount; i++) {
          array.push(i + '-value')
        }
        return array
      }
    },
    label: String,
    required: Boolean,
    disabled: Boolean,
    feedback: String,
    placeholder: {
      type: String,
      default: 'Select...'
    }
  },

  data() {
    return {
      showDropdown: false,
      selected: '',
      activeIndex: 0,
      mixinSizeCategories: { s: 7, m: 8, l: 9, xl: 10 }
    }
	},

  beforeDestroy() {
		if (this.popper) {
			this.popper.destroy()
    }
  },

  methods: {
    clear() {
      this.selected = '',
      this.activeIndex = 0
    },

    close() {
      this.showDropdown = false
    },

    toggle() {
      this.showDropdown = !this.showDropdown
      if (this.showDropdown) {
        this.$nextTick(() => {
          this.setupPopper()
          this.scrollToHighlighted()
        })
      }
    },

    setupPopper() {
      if (this.popper === undefined) {
        this.popper = new Popper(this.$refs.toggle, this.$refs.list, {
          placement: 'bottom'
        })
      } else {
        this.popper.scheduleUpdate()
      }
    },

    select(item, index) {
      this.selected = item
      this.activeIndex = index
      this.$emit('itemSelected', item)
			this.close()
			this.$refs.toggle.focus()
    },

    selectActive() {
      if (this.showDropdown) {
        this.select(this.value[this.activeIndex], this.activeIndex)
        this.$refs.toggle.focus()
      } else {
        // Open dropdown if it's closed atm
        this.showDropdown = true
      }
    },

    scrollToHighlighted() {
      this.$refs.list.children[this.activeIndex].scrollIntoView({
        block: 'nearest'
      })
    },

    setActive(index) {
      this.activeIndex = index
      if (this.activeIndex < 0) {
        this.activeIndex = this.value.length - 1
      }
      if (this.activeIndex > this.value.length - 1) {
        this.activeIndex = 0
      }
      this.scrollToHighlighted()
    },

    activatePrev() {
      this.setActive(this.activeIndex - 1)
    },

    activateNext() {
      this.setActive(this.activeIndex + 1)
    }
  },

  computed: {
    classing() {
      return {
        open: this.showDropdown,
        disabled: this.disabled
      }
    },

    styling() {
      let toggleHeight = 3.4 // = em
      let baseTogglePadding = toggleHeight * 0.2 // = em

      return {
        root: {
          fontSize: this.mixinSizing,
        },
        toggle: {
          height: toggleHeight + 'em',
          padding: `0 ${baseTogglePadding}em`
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$dropdown-color: $app-color--input;
$dropdown-color--border: $app-color--input-border;
$dropdown-color--bg: $app-color--theme;
$dropdown-color--bg-focus: $app-color--input-focus;
$dropdown-color--placeholder: $app-color--input-placeholder;
$dropdown-color--icons: $dropdown-color;
$dropdown-color--shadow: $app-color--shadow;
$dropdown-font: $app-font--input;
$dropdown-font--placeholder: $app-font--placeholder;

.base-dropdown {
  position: relative;
  display: block;
  min-width: 160px;
	font-family: $dropdown-font;
	&.open { z-index: 1; }

	.toggle {
		max-width: 100%;
		@extend %input--border;
		border-color: $dropdown-color--border;
		display: flex;
		align-items: center;
		justify-content: space-between;
		//padding, see: this.styling
		outline: 0;
		background: $dropdown-color--bg;
		font-size: inherit;
		font-family: $dropdown-font--placeholder;
		@extend %clickable;
		&:focus { background: $dropdown-color--bg-focus; }
		span {
			margin-right: 2em;
			max-width: 100% !important;
			@extend %truncate;
			&.placeholder { 
				font-weight: 500;
				letter-spacing: 0.05em;
				color: $dropdown-color--placeholder;
			}
		}
		svg {
			flex-shrink: 0;
			display: inline-block;
			width: 1.4em;
			height: 1.4em;
			stroke: $app-color--main !important;
			@extend %rotate-0;
		}
	}

	&.open .toggle svg { @extend %rotate-180; }

  &.disabled { @extend %input--disabled; }

	.list {
		margin-top: 2px;
		margin-bottom: 2px;
		position: absolute;
		left: 0;
		right: 0;
		@extend %input--border;
		border-color: $dropdown-color--border;
		background: $dropdown-color--bg;
		font-size: inherit;
		max-height: 200px;
		overflow-y: auto;
		box-shadow: 1px 3px 5px $dropdown-color--shadow, 0 5px 20px $dropdown-color--shadow;
		& > * {
			padding: 0.7em 0.4rem;
			@extend %truncate;
			@extend %clickable;
			&:hover { background: $dropdown-color--bg-focus; }
			&.active {
				background: $dropdown-color--border;
				color: $dropdown-color--bg;
				font-weight: 500;
			}
		}
	}
}
</style>
