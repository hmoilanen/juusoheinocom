<template>
  <base-view class="view-home">
    <template #hero>
      <hero></hero>
    </template>
    <home-bio></home-bio>
    <home-projects></home-projects>
    <!-- <home-travels></home-travels> -->
    <home-tools></home-tools>
  </base-view>
</template>

<script>
import hero from '@/components/hero'
import homeBio from '@/components/homeBio'
import homeProjects from '@/components/homeProjects'
/* import homeTravels from '@/components/homeTravels' */
import homeTools from '@/components/homeTools'

export default {
  name: 'viewHome',

  components: {
    hero,
    homeBio,
    homeProjects,
    /* homeTravels, */
    homeTools,
  }
}
</script>

<style lang="scss" scoped>
.view-home {}
</style>
