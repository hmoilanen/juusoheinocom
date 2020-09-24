<template>
	<editable-content path="home.contact" #default="{ content }">
		<home-section class="home-contact" :header="content[`header-${$app.locale()}`]">

			<base-wrapper max-width="paragraph">
				<base-title
					class="gsap--home-contact--text"
          :size="16"
					:scaling="true"
          :center="true"
        >{{ content[`title-${locale}`] }}</base-title>
				<div class="button-container">
					<base-button
						class="gsap--home-contact--button"
						@click="toContact"
						size="xl"
						:center="true"
						:highlight="true"
					>{{ content[`link-${locale}`] }}</base-button>
				</div>
			</base-wrapper>

		</home-section>
	</editable-content>
</template>

<script>
import EditableContent from '@/components/EditableContent'
import HomeSection from '@/components/HomeSection'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
  name: 'HomeContact',

  components: {
		EditableContent,
		HomeSection
	},

	mounted() {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '.gsap--home-contact--text',
				start: '-300% 90%'
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


	computed: {
    locale() {
      return this.$app.locale()
    }
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
	min-height: 100vh;
	display: flex;
  align-items: center;
	justify-content: center;
	border-top: 1px solid rgb(240, 240, 240);
	
	.button-container {
		overflow: hidden;
		padding-top: 58px;
		margin-top: -18px,
	}
}
</style>
