<template>
	<section
		ref="homeSection"
		class="home-section"
		:style="styling.root"
	>
		<!-- <base-wrapper :max-width="true"></base-wrapper> -->
		<!-- <slot></slot> -->

		<div class="wrapper" :style="styling.wrapper">
			<div class="header" :class="randomKey">
				<app-title :size="6">{{ header }}</app-title>			
			</div>
			<div class="content">
				<div>
					<slot>
						content
						<!-- <app-title v-for="item in 15" m-b="xl" :key="item">otsikko</app-title> -->
					</slot>
				</div>
			</div>
		</div>

	</section>
</template>

<script>
import AppTitle from '@/components/AppTitle'
import { sizing } from '@/utils/mixins'
import { randomString } from '@/utils/strings'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default {
	name: 'HomeSection',

	components: {
		AppTitle
	},

	mixins: [sizing],

	props: {
		header: {
			type: String,
			default: 'header'
		},
    size: { default: 8 }, // Size of side paddings (min: 8 * 0.125rem = 1rem)
    scaling: { default: 5 }
	},

	data() {
		return {
			randomKey: ''
		}
	},

	created() {
		this.randomKey = `gsap--home-section--header-${randomString(4)}`
	},

	mounted() {
		const headerElement = `.${this.randomKey}`

		gsap.fromTo(headerElement, {
			autoAlpha: 0,
			y: 50,
		}, {
			scrollTrigger: {
				trigger: headerElement,
				start: 'top 90%',
				//markers: true,
				//toggleActions: 'play reset reset reset'
			},
			duration: 1.2,
			autoAlpha: 1,
			y: 0,
			ease: 'power2.out',
		})
	},
	
	computed: {
		styling() {
			const homeSectionHeight = window.innerHeight
			const ui = this.$store.state.ui
			const paddingSides = this.mixinSizing
			const paddingBottom = 16 // = 1rem

			return {
				root: {
					minHeight: `${homeSectionHeight}px`,
					paddingTop: `${ui.navTopHeight}px`,
					paddingLeft: paddingSides,
					paddingRight: paddingSides,
					paddingBottom: '1rem',
				},
				wrapper: {
					height: `${homeSectionHeight - ui.navTopHeight - paddingBottom}px`,
					maxWidth: `${ui.contentWidth.max}px`
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.home-section {
	// See: this.styling
	display: flex;
	justify-content: center;
	border-top: 1px solid rgba(0, 0, 0, 0.03);
	.wrapper {
		// See: this.styling
		flex: 1;
		display: flex;
		flex-direction: column;
		
		.header { position: absolute; padding: 1.6rem 0; }

		.content {
			overflow-y: hidden;
			flex: 1;
			display: flex;
			align-items: center;
			& > div {
				//background: rgba(0, 0, 0, 0.05);//POSTUU!
				flex: 1;
			}
		}
	}
}
</style>
