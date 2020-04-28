<template>
  <div class="nav-top" :style="styling.root">

    <transition name="toggle">
      <div v-if="showDropdownNav" class="menu">
        <base-link
          v-for="(link, index) in navLinks"
          :key="index"
          :to="link.path"
          mode="router"
          @click.native="toggle"
        >
          <base-title size="s">{{ link.title }}</base-title>
        </base-link>
      </div>
    </transition>

    <base-icon app="juusoheino" size="xl">juusoheino</base-icon>
    <menu-toggler :state="showDropdownNav" @click="toggle"></menu-toggler>
  </div>
</template>

<script>
// KUN TARPEEKSI KAPEA NÄYTTÖ -> PERUSLINKIT MENEE PIILOON JA MENU-IKONI TULEE TILALLE
// LUUPPAA DROPDOWNIIN SAMAT LINKIT KUIN PERUSTILASSA
// KORVAA MENU-IKONI ÄXÄLLÄ KUN DROPDOWN ON AUKI
// POISTA "PASKA"-LUOKKA TAI NIMEÄ UUDELLEEN
// TOTEUTA HTML NIIN, ETTÄ DROPDOWN-CONTAINER ON height:0 / overflow:hidden JA SIJOITETTU VARSINAISEN NAVIN ALAREUNAAN -> VÄLTTYY HÄKSYILTÄ MUUN NAVIN KANSSA
// DROPDOWNIN KORKEUS TULEE MÄÄRITTYÄ SEN SIÄLLÖN PERUSTEELLA -> MÄÄRITÄ KUITENKIN min- JA max-height !!!

// TEE ERILLINEN INTROANIMAATIO -> TAUSTAVÄRI FEIDAANTUU / TULEE NÄKYVIIN KKUN SKROLLATAAN, TMS

import { mapState } from 'vuex'
import { navLinks } from '@/utils/navigation'
import menuToggler from '@/components/menuToggler'
//import navTopLink from '@/components/navTopLink'

export default {
  name: 'navTop',

  components: {
    menuToggler,
    //navTopLink
  },

  data() {
    return {
      showDropdownNav: false,
      //narrowScreenBreakpoint: 450
    }
  },
  
  computed: {
    ...mapState('ui', ['navTopHeight', 'zIndex', 'window']),

    navLinks() {
      return navLinks()
    },

    /* dynamicLinks() {
      let routes = this.$router.options.routes
      let filteredRoutes = []

      routes.forEach(route => {
        if (route.meta && route.meta.navLink) {
          filteredRoutes.push({
            title: route.meta.navLinkTitle,
            to: route.name
          })
        }
      })

      return filteredRoutes
    }, */

    /* narrowScreen() {
      if (this.window.width < this.narrowScreenBreakpoint) {
        return true
      } else return false
    }, */

    classing() {
      return {
        hidden: !this.showDropdownNav
      }
    },

    styling() {
      let height = this.navTopHeight + 'px' 
      return {
        root: {
          height: height,
          zIndex: this.zIndex.navTop
        },
        dropdown: {
          paddingTop: height
        },
      }
    }
  },

  methods: {
    toggle() {
      this.showDropdownNav = !this.showDropdownNav
    }
  }
}
</script>

<style lang="scss" scoped>
$nav-top--padding-sides: 1rem;
$nav-top-dropdown--color-background: $app-color--main;
$nav-top-dropdown--animation-duration: 0.3s;

.nav-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 $nav-top--padding-sides;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.85);

  .menu {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    //padding-top: ; // see: this.styling.dropdown
    //background: $app-color--main;
    background: transparentize($nav-top-dropdown--color-background, 0.05);
    transition: transform $nav-top-dropdown--animation-duration cubic-bezier(.09,.58,.36,1);

    //POSTIUU!!
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .base-icon { position: relative; }

  .dropdown-nav {
    /* z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    //padding-top: ; // see: this.styling.dropdown
    //background: $app-color--main;
    background: blue;
    transition: transform $nav-top-dropdown--animation-duration cubic-bezier(.09,.58,.36,1); */

    & .inner {
      width: 100%;
      overflow-y: auto;
      padding: 2rem $nav-top--padding-sides;

      & > * {
        background: blue;
        flex-shrink: 0;
        opacity: 1;
  
        @for $i from 0 through 20 { // KOVAKOODATTU! -> MUUTA JOSKUS DYNAAMISEKSI JOS TARVE
          &:nth-child(#{$i}) {
            transition:
              opacity 0.25s ease calc((#{$nav-top-dropdown--animation-duration} * 0.3) + (#{$i} * 0.04s)),
              transform 0.15s ease calc((#{$nav-top-dropdown--animation-duration} * 0.3) + (#{$i} * 0.04s));
          }
        }
      }
    }
    
    &.hidden {
      transform: translateY(-100%);
      transition: transform 0.3s cubic-bezier(0.46, 0.07, 0.83, 0.45);
      & .inner > * {
        transition: opacity 0.3s ease, transform 0.3s ease;
        opacity: 0;
        transform: scale(0);
      }
    }
  }
}

.toggle-enter,
.toggle-leave-to { transform: translateY(-100%); }
.toggle-enter-active { transition: transform 0.3s cubic-bezier(0.46, 0.07, 0.83, 0.45); }
.toggle-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
</style>
