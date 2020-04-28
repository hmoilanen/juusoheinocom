<template>
  <div class="home-projects">
    <base-title>Projects</base-title>
    <base-text m-b="l">Some projects I've done or taken part of. (VIIMEISTELE!)</base-text>
    
    <div class="grid" :style="styling">
      <div
        class="card"
        v-for="(card, index) in 5"
        :key="index"
      >
        <span>card-{{ index + 1 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homeProjects',

  data() {
    return {
    }
  },

  computed: {
    styling() {
      // HUOM! LAITA LOPUKSI GAP SYNKKAAMAAN base-view:N PADDINGIN KOON KANSSA!!!
      // HUOM! LAITA LOPUKSI GAP SYNKKAAMAAN base-view:N PADDINGIN KOON KANSSA!!!
      // HUOM! LAITA LOPUKSI GAP SYNKKAAMAAN base-view:N PADDINGIN KOON KANSSA!!!
      // HUOM! NYT SÄÄDÖT DUMMYJA
      let windowWidth = this.$store.state.ui.window.width
      let breakpoint = this.$store.getters['ui/GET_BREAKPOINT']
      let gap = 1 // = '1rem'
      
      if (windowWidth > 900) { gap = 1.8 }
      else if (windowWidth > 1000) { gap = 2.8 }

      return {
        gridGap: gap + 'rem'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-projects {
  
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    // grid-gap, see: this.styling
    transition: grid-gap 0.3s ease;
  }
  
  .card {
    // DUMMY-TYYLIT -> VAHTUU / POSTUU!!
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
    background: $app-color--hl;
  }
}
</style>
