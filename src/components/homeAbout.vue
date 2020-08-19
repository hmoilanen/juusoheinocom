<template>
  <div class="home-about">
    <app-content-wrapper>
      <editable-content
        v-if="!$app.isLoading()"
        path="home.about"
        #default="{ content }"
      >
        <app-title
					class="gsap--home-about--title"
					:inverted="true"
				>{{ content[`title-${locale}`] }}</app-title>
        <app-text class="gsap--home-about--title" :size="8">{{ content[`text-${locale}`] }}</app-text>

				<base-wrapper max-width="paragraph">
					<div class="quote">
						<base-icon class="gsap--home-about--icon" :size="90">quote</base-icon>
						<!-- <base-title
							class="gsap--home-about--quote"
							:center="true"
							:size="10"
						>"{{ content[`quote-${locale}`] }}"</base-title> -->
						<base-title
							class="gsap--home-about--quote"
							:center="true"
							:size="10"
							v-html="content[`quote-${locale}`]"
						></base-title>
					</div>
				</base-wrapper>
        <!-- <base-link to="gallery">{{ content[`link-${locale}`] }}</base-link> -->
      </editable-content>
    </app-content-wrapper>
  </div>
</template>

<script>
import appContentWrapper from '@/components/appContentWrapper'
import editableContent from '@/components/editableContent'
import appTitle from '@/components/appTitle'
import appText from '@/components/appText'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'homeAbout',

  components: {
    appContentWrapper,
    editableContent,
    appTitle,
    appText
  },

	mounted() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.home-about',
				start: '75% bottom',
				//markers: true,
				//toggleActions: 'restart reset reset reset'
			}
		})

		tl
			.from('.gsap--home-about--title', {
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
			}, 1.4)
			.from('.gsap--home-about--icon', {
				duration: 0.4,
				x: 10,
				opacity: 0,
				ease: 'SlowMo.ease.config(0.7, 0.7, false)'
			}, '-=1.9')
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
$home-about--color-bg: $app-color--main;
$home-about--color-hl: $app-color--hl;
$home-about--color-icon: $app-color--hl2;

.home-about {
	//@extend %home-sections--default-style;
	min-height: 100vh;
	display: flex;
  align-items: center;
	justify-content: center;
	background: $home-about--color-bg;

	&::v-deep * {
		.base-text { color: $home-about--color; }
		.base-title {
			color: $home-about--color;
			span { color: $home-about--color-hl; }
		}
	}

  .quote {
    margin: 0 auto;
    margin-top: 4rem;
    max-width: 900px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .base-icon {
      z-index: -1;
      position: absolute;
      top: 60%;
      left: 25%;
      //transform: translateY(-50%);
      transform: translate(-50%, -50%);
      color: $home-about--color-hl;
    }
  }
}
</style>
