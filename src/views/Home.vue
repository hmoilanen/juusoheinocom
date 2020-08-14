<template>
  <base-view class="view-home" :compensateNavTop="false">
    <hero-canvas class="joojeey j1">
    	<home-hero></home-hero>
		</hero-canvas>
		<home-projects class="joojee j2"></home-projects>
		<home-about class="joojee j3"></home-about>
		<home-tools class="joojee j4"></home-tools>
		<home-contact class="joojee j5"></home-contact>
  </base-view>
</template>

<script>
// POISTA JEEJEE- JA J2-LUOKAT
import heroCanvas from '@/components/heroCanvas'
import homeHero from '@/components/homeHero'
import homeAbout from '@/components/homeAbout'
import homeProjects from '@/components/homeProjects'
import homeTools from '@/components/homeTools'
import homeContact from '@/components/homeContact'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'viewHome',

  components: {
    heroCanvas,
    homeHero,
    homeAbout,
    homeProjects,
    homeTools,
		homeContact
	},
	
	/* mounted() {
		const h = window.offsetHeight
		const tl = gsap.timeline()
		tl
			.from('.joojee', 1, {
				yPercent: 100
			})

		ScrollTrigger.create({
			animation: tl,
			trigger: '.joojee',
			start: 'top top',
			end: '+=' + 400,
			scrub: true,
			pin: true,
			pinSpacing: false,
			anticipatePin: 1,
			snap: true
		})
	} */
}
</script>

<style lang="scss" scoped>
.view-home {
	//.j2 { background: pink; }
	//.j2 { background: yellow; }
	//.j2 { background: cyan; }
	//.j2 { background: $app-color--hl-complementary; }
}
</style>
