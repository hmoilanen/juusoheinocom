<template>
  <base-view class="view-home" :compensateNavTop="false">
    <home-hero></home-hero>
    <hero-canvas></hero-canvas>
		<home-projects></home-projects>
		<home-about></home-about>
		<home-tools></home-tools>
		<home-contact></home-contact>
  </base-view>
</template>

<script>
import heroCanvas from '@/components/heroCanvas'
import homeHero from '@/components/homeHero'
import homeAbout from '@/components/homeAbout'
import homeProjects from '@/components/homeProjects'
import homeTools from '@/components/homeTools'
import homeContact from '@/components/homeContact'

export default {
  name: 'viewHome',

  components: {
    heroCanvas,
    homeHero,
    homeAbout,
    homeProjects,
    homeTools,
		homeContact
  }
}
</script>

<style lang="scss" scoped>
.view-home {}
</style>
