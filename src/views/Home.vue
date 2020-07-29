<template>
  <base-view class="view-home" :compensateNavTop="false">
    <home-hero></home-hero>
    <!-- <base-spacer :size="45" :scaling="true"> -->
      <home-projects></home-projects>
      <home-about></home-about>
      <home-tools></home-tools>
      <home-contact></home-contact>
    <!-- </base-spacer> -->
  </base-view>
</template>

<script>
import homeHero from '@/components/homeHero'
import homeAbout from '@/components/homeAbout'
import homeProjects from '@/components/homeProjects'
import homeTools from '@/components/homeTools'
import homeContact from '@/components/homeContact'

export default {
  name: 'viewHome',

  components: {
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
