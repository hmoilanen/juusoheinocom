<template>
  <base-view class="view-home" :compensateNavTop="false">
    <template #hero>
      <home-hero></home-hero>
    </template>
    <home-about></home-about>
    <home-projects></home-projects>
    <home-tools></home-tools>
    <home-contact></home-contact>
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
