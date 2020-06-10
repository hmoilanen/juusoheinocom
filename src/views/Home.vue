<template>
  <base-view class="view-home">
    <template #hero>
      <home-hero></home-hero>
    </template>
    <home-bio></home-bio>
    <home-projects></home-projects>
    <!-- <home-travels></home-travels> -->
    <home-tools></home-tools>
    <home-contact></home-contact>
  </base-view>
</template>

<script>
import homeHero from '@/components/homeHero'
import homeBio from '@/components/homeBio'
import homeProjects from '@/components/homeProjects'
/* import homeTravels from '@/components/homeTravels' */
import homeTools from '@/components/homeTools'
import homeContact from '@/components/homeContact'

export default {
  name: 'viewHome',

  components: {
    homeHero,
    homeBio,
    homeProjects,
    /* homeTravels, */
    homeTools,
    homeContact
  }
}
</script>

<style lang="scss" scoped>
.view-home {}
</style>
