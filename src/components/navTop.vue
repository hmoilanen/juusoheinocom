<template>
  <div class="nav-top" :style="styling.root">

    <base-flex
      class="dropdown-nav"
      :class="classing"
      :style="styling.dropdown"
    >
      <base-flex class="inner" :column="true" center="x">
        <base-button mB="m" v-for="(nappi, index) in 8" :key="index">nappi</base-button>
        <!-- <nav-top-link
          v-for="link in dynamicLinks"
          :key="link.title"
          :to="{ name: link.to }"
          mL="m"
        >{{ link.title }}</nav-top-link> -->
      </base-flex>

    </base-flex>

    <base-div class="nav-background" :cover="true"></base-div>

    <base-flex width="100%" style="position: relative;"> <!-- TÄMÄ VISSIIN IHAN TURHA! SIVOA MUUTENKIN!!! -->
      <base-flex center="y">
        <template v-if="!narrowScreen">
          <nav-top-link
            v-for="link in dynamicLinks"
            :key="link.title"
            :to="{ name: link.to }"
            mL="m"
          >{{ link.title }}</nav-top-link>
        </template>
        <base-button v-else @click="toggle">{{ showDropdownNav ? 'Close' : 'Open' }}</base-button>
      </base-flex>
    </base-flex>

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
import navTopLink from '@/components/navTopLink'

export default {
  name: 'navTop',

  components: { navTopLink },

  data() {
    return {
      showDropdownNav: false,
      narrowScreenBreakpoint: 450
    }
  },
  
  computed: {
    ...mapState('app', ['window']),
    ...mapState('ui', ['navTopHeight', 'zIndex']),

    dynamicLinks() {
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
    },

    narrowScreen() {
      if (this.window.width < this.narrowScreenBreakpoint) {
        return true
      } else return false
    },

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
$nav-top-dropdown--animation-duration: 0.3s;

.nav-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 $nav-top--padding-sides;
  display: flex;
  background: $app-color--main;

  .nav-background { background: $app-color--main; }

  .dropdown-nav {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    max-height: 100vh;
    min-height: 50vh;
    //padding-top: ; // see: this.styling.dropdown
    background: $app-color--main;
    //transition: transform $nav-top-dropdown--animation-duration ease-out;
    transition: transform $nav-top-dropdown--animation-duration cubic-bezier(.09,.58,.36,1);

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
</style>
