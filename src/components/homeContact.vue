<template>
  <div class="home-contact">
    <app-content-wrapper>
      <editable-content
        v-if="!$app.isLoading()"
        path="home.contact"
        #default="{ content }"
      >
        <base-title
					class="gsap--home-contact--text"
          size="xl"
          :center="true"
        >{{ content[`title-${$app.locale()}`] }}</base-title>
				<div class="button-container">
					<base-button
						class="gsap--home-contact--button"
						@click="toContact"
						size="xl"
						:center="true"
						:highlight="true"
					>{{ content[`link-${$app.locale()}`] }}</base-button>
				</div>
      </editable-content>
    </app-content-wrapper>
  </div>
</template>

<script>
import appContentWrapper from '@/components/appContentWrapper'
import editableContent from '@/components/editableContent'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'homeContact',

  components: {
    appContentWrapper,
    editableContent
	},

	mounted() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.home-contact',
				start: 'top top',
				//markers: true,
				//toggleActions: 'restart reset reset reset'
			}
		})

		tl
			.from('.gsap--home-contact--text', {
				duration: 0.5,
				y: 120,
				opacity: 0,
				ease: 'Power2.inOut'
			})
			.from('.gsap--home-contact--button', {
				duration: 1.1,
				y: -150,
				ease: 'Bounce.easeOut'
			}, 0.8)
	},

  methods: {
    toContact() {
      this.$router.push('/contact')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-contact {
	@extend %home-sections--default-style;
	//background: $app-color--hl-complementary;
	
	.button-container {
		overflow: hidden;
		padding-top: 58px;
		margin-top: -18px,
	}
}
</style>
