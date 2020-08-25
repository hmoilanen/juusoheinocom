<template>
  <div class="nav-top" :style="styling.root">

    <transition name="toggle">
      <div v-if="showDropdownNav" class="menu">
        <base-link
					class="nav-top-link"
          v-for="(link, index) in navLinks"
          :key="index"
          :to="link.path"
          mode="router"
          @click.native="closeDropdown"
        >
          <base-title
            :class="{ active: isActiveRoute(link.name) }"
            :size="20"
            :scaling="true"
          >{{ link.title }}</base-title>
        </base-link>

        <div class="bottom">
          <app-external-links :alternative="true"></app-external-links>
          <locale-toggler :size="6" :alternative="true"></locale-toggler>
        </div>
      </div>
    </transition>

    <nav-top-logo :alternative="showDropdownNav"></nav-top-logo>
    <nav-top-toggler
      :mode="togglerMode"
      @click="toggle"
    ></nav-top-toggler>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { navLinks } from '@/utils/navigation'
import navTopLogo from '@/components/navTopLogo'
import navTopToggler from '@/components/navTopToggler'
import appExternalLinks from '@/components/appExternalLinks'
import localeToggler from '@/components/localeToggler'
import appText from '@/components/appText'

export default {
  name: 'navTop',

  components: {
    navTopLogo,
    navTopToggler,
    appExternalLinks,
    localeToggler,
    appText
  },

  data() {
    return {
      showDropdownNav: false,
      cursorOffsetX: 0,
      cursorOffsetY: 0
    }
  },

  created() {
    this.trackMousePosition()

    window.addEventListener('mousemove', this.trackMousePosition)
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('mousemove', this.trackMousePosition)
    })
  },

  methods: {
    isActiveRoute(linkName) {
      return linkName === this.$route.name
    },

    /* stylingMethod(index) {
      let offsetContainer = 10 //SELLVITÄ MIKSI???
      let offsetLink = 8 * (1 + (0.5 * index)) //SELLVITÄ MIKSI???
      console.log('offsetLink', offsetLink);

      let rotateY = this.cursorOffsetX * (offsetContainer * 4) + 'deg'
      console.log('rotateY', rotateY);

      return {
        container: {
          transform: `translate3d(0, ${-this.cursorOffsetX * offsetContainer}px, 0)
                      rotateX(${-this.cursorOffsetY * offsetContainer}deg)
                      rotateY(${this.cursorOffsetX * (offsetContainer * 3)}deg)`
        },
        link: {
          transform: `translate3d(${this.cursorOffsetX * offsetLink}px, ${this.cursorOffsetY * offsetLink}px, 50px) 
                      rotateX(${-this.cursorOffsetY * offsetLink * 2}deg)`
        }
      }
    }, */

    trackMousePosition(e) {
      let wWidth = window.innerWidth
      let wHeight = window.innerHeight

      if (e) {
        let cursorOffsetX = -(0.5 - e.pageX / wWidth)
        let cursorOffsetY = -(0.5 - e.pageY / wHeight)

        this.cursorOffsetX = cursorOffsetX
        this.cursorOffsetY = cursorOffsetY
      }

      //if (angle < 0) { angle = angle + 360 }
      
      
      /* this.ruutuX = wWidth
      this.ruutuY = wHeight

      if (e) {
        //console.log(e);
        //console.log(e.pageX);
        let x = e.pageX
        let y = e.pageY
        this.xxx = x
        this.yyy = y

        let dy = e.pageY - wWidth / 2 //@h/2 = center of poster
        let dx = e.pageX - wHeight / 2 //@w/2 = center of poster
        let theta = Math.atan2(dy, dx) //angle between cursor and center of poster in RAD
        //let angle = theta * 180 / Math.PI
      } */
      //console.log(e.pageX || null);
      //console.log(e.pageX || null);
      //let screen = window.screen
      //console.log(screen);
      //console.log(window);
      
      //let x = window.inner
    },

    toggle() {
      if (this.showDropdownNav) {
        this.closeDropdown()
      } else if (this.$route.name === 'project') {
        this.$router.push({ name: 'projects' })
      } else if (this.$route.query.gallery) {
        this.$router.push({ name: 'gallery' })
      } else {
        this.showDropdownNav = true
        this.$store.dispatch('SET_STATE', { data: true, path: 'ui.preventBodyScrolling' })
      }
    },

    closeDropdown() {
      //this.showDropdownNav = false
      this.showDropdownNav = !this.showDropdownNav
      this.$store.dispatch('SET_STATE', { data: false, path: 'ui.preventBodyScrolling' })
    },

    goToProjects() {
      this.$router.push({ name: 'projects' })
    }
  },
  
  computed: {
    ...mapState('ui', ['navTopHeight', 'zIndex', 'window']),
    ...mapState('app', ['externals']),
    ...mapGetters('app', ['GET_OFFICIAL']),

    togglerMode() {
      let mode = 'menu'

      if (this.$app.isLoading()) {
        mode = 'initial'
      } else if (this.showDropdownNav) {
        mode = 'close'
      } else if (this.$route.name === 'project' || this.$route.query.gallery) {
        mode = 'back'
      }
      
      return mode
    },

    navLinks() {
      return navLinks()
    },

    styling() {
      //let angleX = 0.5 - (this.xxx / this.ruutuX)
      //let angleY = (0.5 - (this.yyy / this.ruutuY)) * -1
      let height = this.navTopHeight + 'px' 
      return {
        root: {
          height: height,
          zIndex: this.zIndex.navTop
        },
        dropdown: {
          paddingTop: height
        },
        /* sisus: {
          transform: `rotateY(${angleX * 100}deg) rotateX(${angleY * 100}deg)`
        } */
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.testilaatikko {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: blue;
  display: flex;
  align-items: center;
  justify-content: center;

  .sisus {
    position: absolute;
    width: 250px;
    height: 130px;
    //opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    & > * {
      //transition: transform 0.05s linear;
      perspective: 100px;
      @for $i from 0 through 20 { // KOVAKOODATTU! -> MUUTA JOSKUS DYNAAMISEKSI JOS TARVE
        &:nth-child(#{$i}) {
          transition:
            opacity 0.25s ease calc((1s * 0.3) + (#{$i} * 0.04s)) !important;
            //transform 0.15s ease calc((#{$nav-top-dropdown--animation-duration} * 0.3) + (#{$i} * 0.04s));
        }
      }
    }
    .base-title {
      color: white;
      font-size: 10vmin !important;
      //border: 10px solid red;
      @extend %clickable;
      &:hover { opacity: 0.3; }
    }
    //background: red;
    //transform: translate3d(100px, 100px, 100px);
    //transform: rotate3d(0, 0, 0, 45deg);
    //transform: rotate3d(0, 0, 1, 35deg);
    //transform: rotateY(35deg);
  }
  /* .sisuss {
    @extend .sisus;
    background: yellow;
    transform: translate3d(0, 0, 0);
  } */
  .luvut {
    position: absolute;
  }

  &.hidden {
    & .sisus > * {
      transition: opacity 0.3s ease;
      opacity: 0;
      //transform: scale(0);
    }
  }
}

$nav-top--padding-sides: 1rem;
$nav-top-dropdown--color: $app-color--theme;
$nav-top-dropdown--color-background: $app-color--main;
$nav-top-dropdown--color-highlight: $app-color--hl;
$nav-top-dropdown--color-highlight2: $app-color--hl2;
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
  background: rgba(255, 255, 255, 0.2);
	transition: background-color 0.8s ease;
	&:hover { background: rgba(255, 255, 255, 0.85); }

  .brand {
    .base-icon {
      position: relative;
      &::v-deep path { fill: blue !important; }
    }
  }

  .menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    //height: 100vh;
    //padding-top: ; // see: this.styling.dropdown
    //background: $app-color--main;
    background: transparentize($nav-top-dropdown--color-background, 0.03);
    //background: blue;
    transition: transform $nav-top-dropdown--animation-duration cubic-bezier(.09,.58,.36,1);
    .base-title {
      color: $nav-top-dropdown--color;
      &:hover { color: $nav-top-dropdown--color-highlight2; }
      &.active { color: $nav-top-dropdown--color-highlight; }
    }

    //POSTIUU!!
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  

  .base-title { color: $nav-top-dropdown--color; } //POISTUU!

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

  .bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding-bottom: 5vmin;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > * {
      &:not(:last-child) {
        margin-bottom: 1.4rem;
      }
    }
    .app-text { color: $nav-top-dropdown--color; }
  }
}

$toggle-animation--duration: 0.5s;
.toggle-enter { transform: translateY(-100%); }
.toggle-leave-to { transform: translateY(100%); }
.toggle-enter-active { transition: transform $toggle-animation--duration cubic-bezier(0.46, 0.07, 0.83, 0.45); }
.toggle-leave-active { transition: opacity $toggle-animation--duration ease, transform $toggle-animation--duration ease; }
</style>
