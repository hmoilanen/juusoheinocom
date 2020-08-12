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
          <!-- :m-b="20" -->
				<!-- <div class="perseq"><span>perseq</span></div> -->
				<!-- <div class="perseq">perseq</div> -->
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

/* ScrollTrigger.create({
	animation: tl,
	trigger: '.gsap--home-contact-button',
	markers: true,
	start: 'top center',
	toggleActions: 'restart reset reset reset'
}) */

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
				//markers: true,
				start: 'top top',
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
				//opacity: 0,
				//ease: 'Back.easeOut.config(4)'
				//ease: 'Elastic.easeOut.config(1, 0.3)'
				ease: 'Bounce.easeOut'
			}, 0.8)
		/* gsap.from('.gsap--home-contact-button', {
			scrollTrigger: {
				trigger: '.vittu',
				markers: true,
				start: 'top top',
				toggleActions: 'restart reset reset reset'
			},
			duration: 0.6,
			y: -100,
			ease: 'Back.easeOut.config(1.7)'
		}) */
		/* this.$nextTick(() => {
		}) */
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
	
	.button-container {
		overflow: hidden;
		padding-top: 58px;
		margin-top: -18px,
	}
	/* .perseq {
		width: 200px;
		height: 100px;
		background: red;
		//display: inline-block;
		//margin: 0 auto;
	} */
}
</style>
