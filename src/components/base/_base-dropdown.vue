<template>
  <on-click-outside :do="close">
    <div ref="container" class="base-dropdown" :class="classing" :style="[styling.root, mixinMargins]">

      <label v-if="label">
        {{ this.label }}
        <span v-if="required"> (required)</span>
      </label>

      <!-- HUOM! TÄMÄ EI VOI OLLA NÄIN KOSKA KAIKKI BINDAUKSET MENEE VITUIKS JOS SLOTTIIN SYÖTETÄÄN JOTAIN KUSTOMIA!!! -->
      <!-- HUOM! TÄMÄ EI VOI OLLA NÄIN KOSKA KAIKKI BINDAUKSET MENEE VITUIKS JOS SLOTTIIN SYÖTETÄÄN JOTAIN KUSTOMIA!!! -->
      <!-- HUOM! TÄMÄ EI VOI OLLA NÄIN KOSKA KAIKKI BINDAUKSET MENEE VITUIKS JOS SLOTTIIN SYÖTETÄÄN JOTAIN KUSTOMIA!!! -->
      <!-- KORJAA!!! (PITÄNEE OLLA VIELÄ YKSI PARENTTIELEMENTTI NÄILLE?!) -->
      <slot name="toggle" :toggle="toggle" :selected="selected">
        <div
          @click="toggle"
          class="toggle"
          :style="styling.toggle"
          tabIndex="0"
          @keydown.esc="close"
          @keydown.up.prevent="activatePrev"
          @keydown.down.prevent="activateNext"
          @keydown.enter.prevent="selectActive"
          @keydown.tab.prevent
        >
          <span v-if="selected">{{ this.selected }}</span>
          <span v-else class="placeholder">{{ this.placeholder }}</span>
          <base-icon>down</base-icon>
        </div>
      </slot>

      <ul v-show="showDropdown" ref="list" class="list" :style="styling.list">
        <slot :select="select">
          <div
            v-for="(item, index) in value"
            :key="item"
            @click="select(item, index)"
            :class="{ active: activeIndex === index }"
          >{{ item }}</div>
        </slot>
      </ul>
    </div>
  </on-click-outside>
</template>

<script>
// TODOS:
// TÄSSÄ ON SEKÄ TEMPLATEN RAKENNE ETTÄ SEN TAKIA MYÖS TYYLIT VITUILLAAN (HUOM VARSINKIN .toggle / EVENT HANDLERIT!)
// PROP: SÄÄDÄ NIIN ETTÄ VOI ANTAA SEKÄ ARRAYN ETTÄ OBJEKTIN!!!
// PROP: TEE NIIN ETTÄ VOI ANTAA NUMEROLLA MONTAKO VAIHTOEHTOA NÄKYY DEFAULTTINA KUN DD AVATAAN -> MÄÄRITÄ KORKEUS
// DATA: JOS ARRAY (ACTIVEINDEX = INDEX), JOS OBJECT (ACTIVEIINDEX = INDEX.VALUE) -> KIRJOITA TÄSTÄ MYÖS OHJE
// RANDOM: VOIKO DROPDOWNIN (TOGGLE-LAATIKON) 'RESETOIDA' ?!!?

import Popper from 'popper.js'
import { sizing, margins, dynamicStyleSet } from '@/utils/mixins'
import onClickOutside from '@/components/onClickOutside'

export default {
  name: 'baseDropdown',

  mixins: [sizing, margins, dynamicStyleSet],

  components: { onClickOutside },

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
    maxWidth: {
      type: String,
      default: '100%'
    },
    placeholder: {
      type: String,
      default: 'Select...'
    },
    label: String,
    required: Boolean
  },

  data() {
    return {
      showDropdown: false,
      selected: '', // tee myös multi
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
    close() {
      this.showDropdown = false
    },

    toggle() {
      this.showDropdown = !this.showDropdown
      if (this.showDropdown) {
        this.$nextTick(() => {
          this.setupPopper()
          //this.scrollToHighlighted()
          /* if (this.search) {
            this.$refs.search.focus()
          } */
        })
      }
    },

    setupPopper() {
      if (this.popper === undefined) {
        this.popper = new Popper(this.$refs.container, this.$refs.list, {
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
    },

    selectActive() {
      this.select(this.value[this.activeIndex], this.activeIndex)
    },

    scrollToHighlighted() {
      //let joo = this.$refs.list.children[this.activeIndex]
      let joo = this.$refs.list.children
      
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
    /* activeIndex() {
      //if (typeof this.value === 'array') {
      if (Array.isArray(this.value)) {
        return this.value.indexOf(this.selected)
      }
      return 'x' // TÄHÄN OBJEKTITARKASTELU / -KEISSI 
    }, */

    classing() {
      return {
        [`style-set-${this.dynamicStyleSet}`]: true, // see: utils/mixins.js
        open: this.showDropdown
      }
    },

    styling() {
      let toggleHeight = 3.4 // = em
      let baseTogglePadding = toggleHeight * 0.2 // = em

      return {
        root: {
          fontSize: this.mixinSizing,
          maxWidth: this.maxWidth
        },
        toggle: {
          height: toggleHeight + 'em',
          padding: `0 ${baseTogglePadding}em`
        },
        list: {
          padding: `${baseTogglePadding * 0.6}em`
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
$dropdown-color--label: $app-color--input-label;
$dropdown-color--placeholder: $app-color--input-placeholder;
$dropdown-color--icons: $dropdown-color;
$dropdown-color--shadow: $app-color--shadow;
$dropdown-color--required: $app-color--error;
$dropdown-font: $app-font--input;
$dropdown-font--label: $app-font--label;
$dropdown-font--placeholder: $app-font--placeholder;

.base-dropdown {
  position: relative;
  display: block;
  min-width: 160px; // = 10rem

  &.style-set-0 {
    font-family: $dropdown-font;

    label {
      display: block;
      margin-bottom: 0.3em;
      font-size: 0.9em;
      font-weight: 500;
      font-family: $dropdown-font--label;
      color: $dropdown-color--label;
      span {
        color: $dropdown-color--required;
      }
    }

    .toggle {
      max-width: 100%;
      border: 1px solid $dropdown-color--border;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      //padding: ; // see: this.styling
      outline: 0;
      background: $dropdown-color--bg;
      font-size: inherit;
      @extend %clickable;
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
        width: 1.1em;
        height: 1.1em;
        @extend %rotate-0;
      }
    }
    &.open .toggle svg { @extend %rotate-180; }

    .list {
      z-index: 1;
      margin-top: 3px;
      position: absolute;
      left: 0;
      right: 0;
      border: 1px solid $dropdown-color--border;
      border-radius: 3px;
      background: $dropdown-color--bg;
      font-size: inherit;
      max-height: 200px;
      overflow-y: auto;
      box-shadow: 1px 3px 5px $dropdown-color--shadow, 0 5px 20px $dropdown-color--shadow;
      & > * {
        padding: 0.7em 0.4rem;
        //margin: 0.8em 0;
        border-radius: 2px;
        @extend %truncate;
        @extend %clickable;
        &:hover { background: lighten(desaturate($dropdown-color--border ,50%), 90%); }
        &.active {
          background: $dropdown-color--border;
          color: $dropdown-color--bg;
          font-weight: 500;
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
