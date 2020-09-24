<template>
	<section
		ref="homeSection"
		class="home-section"
		:class="classing"
		:style="styling.root"
	>
		<div
			v-if="!forProject"
			class="wrapper"
			:style="styling.wrapper"
		>
			<div class="header" :class="randomKey">
				<app-title :size="6" :inverted="invertedColor">{{ header }}</app-title>
			</div>
			<div class="content" ref="content">
				<div class="content-inner">
					<slot>content</slot>
				</div>
			</div>
		</div>

		<div v-else class="project-wrapper-outer" :style="styling.project">
			<div class="header" :class="randomKey">
				<app-title :size="6" :inverted="invertedColor">{{ header }}</app-title>			
				<base-icon
					@click="goTo"
					:only-stroke="true"
				>redirect</base-icon>
			</div>
			<div class="project-wrapper-inner">
				<slot></slot>
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
		scaling: { default: 5 },
		invertedColor: Boolean,
		forProject: Boolean
	},

	data() {
		return {
			randomKey: '',
			contentContainerWidth: 0
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
			},
			duration: 1.2,
			autoAlpha: 1,
			y: 0,
			ease: 'power2.out',
		})
	},
	
	computed: {
		classing() {
			return {
				'for-project': this.forProject
			}
		},
		
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
					paddingBottom: `${paddingBottom}px`,
				},
				wrapper: {
					height: `${homeSectionHeight - ui.navTopHeight - paddingBottom}px`,
					maxWidth: `${ui.contentWidth.max}px`
				},
				project: {
					height: `${homeSectionHeight - ui.navTopHeight - paddingBottom}px`
				}
			}
		}
	},

	methods: {
		goTo() {
			console.log('tapahtuu');
			this.$router.push({ name: 'projects' })
		}
	}
}
</script>

<style lang="scss" scoped>
.home-section {
	position: relative;
	&:not(.for-project) {
		display: flex;
		justify-content: center;
		border-top: 1px solid rgba(0, 0, 0, 0.03);
	}

	.header {
		position: absolute;
		left: 0;
		right: 0;
		padding: 1.6rem 0;
		display: flex;
		.base-icon {
			margin-top: 0.2rem;
			@extend %clickable;
		}
	}
	
	.wrapper {
		// See: this.styling
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;	
		.content {
			overflow-y: hidden;
			flex: 1;
			display: flex;
			align-items: center;
			.content-inner {
				position: relative;
				flex: 1;
			}
		}
	}

	.project-wrapper-outer {
		position: relative;
		padding: 0 0.2rem;
		.project-wrapper-inner {
			position: absolute;
			top: 50%;
			left: 0;
			right: 0;
			transform: translateY(-50%);
			max-width: 900px;
			margin: 0 auto;
		}
	}
}
</style>
