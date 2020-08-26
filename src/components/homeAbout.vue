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
						<base-title
							class="gsap--home-about--quote"
							:center="true"
							:size="10"
							v-html="content[`quote-${locale}`]"
						></base-title>
					</div>
				</base-wrapper>
      </editable-content>
    </app-content-wrapper>
  </div>
</template>

<script>
import AppContentWrapper from '@/components/AppContentWrapper'
import EditableContent from '@/components/EditableContent'
import AppTitle from '@/components/AppTitle'
import AppText from '@/components/AppText'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'HomeAbout',

  components: {
    AppContentWrapper,
    EditableContent,
    AppTitle,
    AppText
  },

	mounted() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.home-about',
				start: '75% bottom'
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
			}, 1.1)
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

.home-about {
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
  }
}
</style>
