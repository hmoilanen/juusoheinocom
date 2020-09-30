<template>
	<editable-content path="home.hero" #default="{ content }">
		<home-section class="home-tools" header="Juuso Heino" :no-color="true">

			<base-title
				class="gsap--home-hero"
				:size="18"
				:scaling="5"
				style="max-width: 700px"
			>{{ content[`title-${locale}`] }}</base-title>

			<base-flex class="gsap--home-hero" justify="start" m-t="l">
				<base-wrapper max-width="paragraph" :disable-margins="true">
					<app-text :scaling="1" >{{ content[`text-${locale}`] }}</app-text>
				</base-wrapper>
			</base-flex>

			<base-flex :m-t="12">
				<base-link to="projects" class="gsap--home-hero" m-r="m">
					<base-button :highlight="true">{{ content[`link1-${locale}`] }}</base-button>
				</base-link>
				<base-link to="contact" class="gsap--home-hero">
					<base-button :highlight="true">{{ content[`link2-${locale}`] }}</base-button>
				</base-link>
			</base-flex>

		</home-section>
	</editable-content>
</template>

<script>
import EditableContent from '@/components/EditableContent'
import HomeSection from '@/components/HomeSection'
import AppText from '@/components/AppText'
import { gsap } from 'gsap'

const tl = gsap.timeline({ paused: true })

export default {
  name: 'HomeHero',

  components: {
		EditableContent,
		HomeSection,
    AppText
	},
	
	mounted() {
		tl.from('.gsap--home-hero', {
			stagger: 0.2,
			duration: 0.6,
			y: 70,
			opacity: 0,
			ease: 'Power2.out'
		}, 0.25)
	},

	watch: {
		'$store.state.ui.curtainDisplayed': {
			immediate: true,
			handler(newValue, oldValue) {
				if (newValue === false) {
					tl.restart() // For playing the animation also when returned to the page
				}
			}
		}
	},

  computed: {
    locale() {
      return this.$app.locale()
    }
  }
}
</script>

<style lang="scss" scoped>
$home-hero--color: $app-color--theme;
$home-hero--color-hl: $app-color--hl;

.home-hero {
	@extend %absolute-0000;
  display: flex;
	align-items: center;
	
	.app-content-wrapper { flex: 1; }
	.my-name { color: $home-hero--color-hl; }
}
</style>
