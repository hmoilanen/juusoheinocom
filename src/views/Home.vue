<template>
  <base-view class="view-home" :compensateNavTop="false">
    <hero-canvas>
    	<home-hero></home-hero>
		</hero-canvas>
		<home-about></home-about>
		<home-projects></home-projects>
		<home-tools></home-tools>
		<home-contact></home-contact>
  </base-view>
</template>

<script>
import HeroCanvas from '@/components/HeroCanvas'
import HomeHero from '@/components/HomeHero'
import HomeAbout from '@/components/HomeAbout'
import HomeProjects from '@/components/HomeProjects'
import HomeTools from '@/components/HomeTools'
import HomeContact from '@/components/HomeContact'

export default {
  name: 'ViewHome',

  components: {
    HeroCanvas,
    HomeHero,
    HomeAbout,
    HomeProjects,
    HomeTools,
		HomeContact
	}
}
</script>
