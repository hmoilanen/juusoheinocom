<template>
	<editable-content path="home.about" #default="{ content }">
		<home-section
			class="home-about"
			:header="content[`title-${$app.locale()}`]"
			:invertedColor="true"
			:no-color="true"
		>
			<base-wrapper max-width="700px">
				<app-text
					class="quote-text gsap--home-about--text"
					:size="6.5"
					:scaling="0.4"
				>{{ content[`text-${locale}`] }}</app-text>
			</base-wrapper>
			
			<base-wrapper max-width="paragraph">
					<div class="quote">
						<base-title
							class="gsap--home-about--quote"
							:center="true"
							:size="8"
							:scaling="0.4"
							v-html="content[`quote-${locale}`]"
						></base-title>
					</div>
				</base-wrapper>
		</home-section>
	</editable-content>
</template>

<script>
import EditableContent from '@/components/EditableContent'
import HomeSection from '@/components/HomeSection'
import AppText from '@/components/AppText'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'HomeAbout',

  components: {
		EditableContent,
		HomeSection,
    AppText
  },

	mounted() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.gsap--home-about--text',
				start: 'top 90%',
			}
		})

		tl
			.from('.gsap--home-about--text', {
				stagger: 0.2,
				duration: 0.5,
				y: 70,
				opacity: 0,
				ease: 'Power3.out'
			})
			.from('.gsap--home-about--quote', {
				duration: 2,
				opacity: 0,
				ease: 'SlowMo.ease.config(0.7, 0.7, false)'
			}, 0.6)
	},

  computed: {
    locale() {
      return this.$app.locale()
    }
  }
}
</script>

<style lang="scss" scoped>
$home-about--color: $app-color--theme;
$home-about--color-bg: transparentize($app-color--main, 0.1);
$home-about--color-hl: $app-color--hl;

.home-about {
	background: $home-about--color-bg;

	&::v-deep * {
		.quote-text {
			color: $home-about--color;
		}

		.quote {
			margin: 0 auto;
			margin-top: 4rem;
			display: flex;
			align-items: center;
			justify-content: center;
			position: relative;
			.base-title {
				color: $home-about--color;
				span { color: $home-about--color-hl; }
			}
		}
	}

}
</style>
