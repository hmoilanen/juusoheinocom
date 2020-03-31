<template>
  <div ref="swipe" class="nav-left" :style="styling.root">

    <!-- <on-click-outside :do="toggleFromOutsideClick"> -->
      <div class="menu" :class="classing" :style="styling.menu">
        <base-flex class="toggler" @click="toggle" center="xy">
          <base-icon :icon="navLeftDisplayed ? 'close' : 'menu'"></base-icon>
        </base-flex>

        <nav-left-link
          v-for="link in navLinks"
          :key="link.toggle"
          :to="link.to"
        >{{ link.title }}</nav-left-link>
      </div>
    <!-- </on-click-outside> -->

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { navLinks } from '@/utils/navigation'
import navLeftLink from '@/components/navLeftLink'
//import onClickOutside from '@/components/onClickOutside'

export default {
  name: 'navLeft',

  components: {
    navLeftLink,
    //onClickOutside
  },

  mounted() {
    let self = this
    let swipeOptions = {
      threshold: 10
    }
    let element = this.$refs.swipe
    let manager = new Hammer.Manager(element)
    let swipe = new Hammer.Swipe(swipeOptions)

    manager.add(swipe)

    manager.on('swipe', function(event) {
      let direction = event.offsetDirection

      if (self.navLeftDisplayed) {
        if (direction === 2) { self.toggle() }
      } else {
        if (direction === 4) { self.toggle() }
      }
    })
  },

  computed: {
    ...mapState('app', ['ui', 'window']),

    navLeftDisplayed() {
      return this.ui.navLeftDisplayed
    },

    navLinks() {
      return navLinks()
    },

    classing() {
      return {
        hidden: !this.navLeftDisplayed
      }
    },

    styling() {
      return {
        root: {
          width: this.ui.contentPadding + 'px'
        },
        menu: {
          width: this.ui.navLeftWidth + 'px',
          top: this.ui.navTopHeight + 'px'
        },
      }
    }
  },

  methods: {
    toggle() {
      this.$store.dispatch('SET_STATE', {
        data: !this.navLeftDisplayed,
        path: 'app.ui.navLeftDisplayed'
      })
    },

    toggleFromOutsideClick() {
      if (this.navLeftDisplayed) {
        this.toggle()
      } else return
    }
  }
}
</script>

<style lang="scss" scoped>
$nav-left-color: $app-color--main;
$nav-left-color--bg: $app-color--hl;

.nav-left {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  //width: ; // see: this.styling.root

  .menu {
    position: absolute;
    //top: ; // see: this.styling.menu
    left: 0;
    bottom: 0;
    padding: 1.2rem 0;
    background: $nav-left-color--bg;
    color: $nav-left-color;
    transition: transform 0.3s ease-out;
    &.hidden {
      transform: translateX(-100%);
      transition: all 0.3s cubic-bezier(0.46, 0.07, 0.83, 0.45);
      .toggler { opacity: 0.8; }
    }

    .toggler {
      position: absolute;
      left: 100%;
      top: 0;
      width: 40px;
      height: 40px;
      border-bottom-right-radius: 5px;
      background: $nav-left-color--bg;
      @extend %clickable;
      .base-icon { pointer-events: none; }
    }
  }
}

</style>
