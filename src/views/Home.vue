<template>
  <base-view class="view-home" :compensateNavTop="false">
    <template #hero>
      <home-hero></home-hero>
    </template>
    <base-spacer :size="30">
      <home-projects
        :titleSize="titleSize"
      ></home-projects>
      <home-about
        :titleSize="titleSize"
        :textSize="textSize"
      ></home-about>
      <home-tools
        :titleSize="titleSize"
        :textSize="textSize"
      ></home-tools>
      <home-contact></home-contact>
    </base-spacer>
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
  },

  data() {
    return {
      titleSize: 'l',
      textSize: 'l'
    }
  }
}
</script>

<style lang="scss" scoped>
.view-home {}
</style>
