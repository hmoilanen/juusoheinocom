<template>
  <div class="nav-top" :style="styling">
    <base-flex width="100%">
      <base-flex flex-1 center="y">
        <base-icon @click="toggleNavLeft" style="color: white;"></base-icon>
      </base-flex>

      <base-flex class="paska" center="y">
        <nav-top-link
          v-for="link in dynamicLinks"
          :key="link.title"
          :to="{ name: link.to }"
          mL="m"
        >{{ link.title }}</nav-top-link>
      </base-flex>
    </base-flex>
  </div>
</template>

<script>
// TEE ERILLINEN INTROANIMAATIO -> TAUSTAVÄRI FEIDAANTUU / TULEE NÄKYVIIN KKUN SKROLLATAAN, TMS

import { mapState } from 'vuex'
import navTopLink from '@/components/navTopLink'

export default {
  name: 'navTop',

  components: { navTopLink },

  computed: {
    ...mapState('app', ['ui']),

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

    styling() {
      return {
        height: this.ui.navTopHeight + 'px',
        zIndex: this.ui.zIndex.navTop
      }
    }
  },

  methods: {    
    toggleNavLeft() {
      this.$store.dispatch('SET_STATE', {
        data: !this.ui.navLeftDisplayed,
        path: 'app.ui.navLeftDisplayed'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 1rem;
  display: flex;
  background: $app-color--main;
  
  //DARK!: .dark-theme { background: $app-color-dark--main; }
}
</style>
