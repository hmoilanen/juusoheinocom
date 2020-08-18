<template>
  <div class="content-carousel" :style="mixinMargins">
    
    <Vue-slick-carousel
      v-bind="settings"
      ref="carousel"
			@beforeChange="updateCurrentIndex"
    >
      <slot>
        <div
          :key="index"
          v-for="(dummy, index) in dummies"
          class="dummy-item"
        >
          <span>{{ index + 1 }}</span>
        </div>
      </slot>
    </Vue-slick-carousel>

    <base-flex center="x" m-t="m">
      <content-carousel-indicator
				:active="currentIndex"
        :amount="amount"
        :duration="settings.autoplaySpeed"
				:paused="paused"
        @new-index="newIndex"
      ></content-carousel-indicator>
    </base-flex>

  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel' // https://github.com/gs-shop/vue-slick-carousel
import 'vue-slick-carousel/dist/vue-slick-carousel.css' // default styles
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css' // optional style for arrows & dots
import contentCarouselIndicator from '@/components/contentCarouselIndicator' // https://github.com/gs-shop/vue-slick-carousel
import { margins } from '@/utils/mixins'
import { onScreen } from '@/utils/display'
import { log } from 'three'


export default {
  name: 'contentCarousel',

  components: {
		VueSlickCarousel,
		contentCarouselIndicator
	},

  mixins: [margins],

  props: {
		duration: Number
  },

  data() {
    return {
			currentIndex: 0,
			firstCycleDelay: 0.5, // = 100% + 50%
			paused: true,
      settings: {
        accessibility: false,
				arrows: false,
				autoplay: false,
				autoplaySpeed: 4000,
        cssEase: 'cubic-bezier(0, 0.65, 0.25, 1)',
				//fade: true,
        pauseOnHover: false,
        speed: 390,
        waitForAnimate: false
			},
			imageWidth: 0,
			imageHeight: 0,
			dummies: 3,
			isOnScreen: false
    }
	},
	
	created() {
		if (this.duration) {
			this.$set(this.settings, 'autoplaySpeed', this.duration)
		}
	},

  mounted() {
		this.handleImageSizing()
		this.isVisibleOnScreen()

		let scrollingElement = this.$route.name === 'project'
			? document.querySelector('.projects-project')
			: window

		scrollingElement.addEventListener('scroll', this.isVisibleOnScreen)
		window.addEventListener('resize', this.handleImageSizing)

    this.$on('hook:beforeDestroy', () => {
			scrollingElement.removeEventListener('scroll', this.isVisibleOnScreen)
			window.removeEventListener('resize', this.handleImageSizing)
		})
	},

	watch: {
		allowPlay: {
			immediate: true,
			handler(newValue) {
				if (newValue) {
					// Make first cycle duration a bit longer than default
					setTimeout(() => {
						this.$refs.carousel.play()
						this.paused = false
					}, this.settings.autoplaySpeed * this.firstCycleDelay)
				}
			}
		}
	},

  methods: {
		updateCurrentIndex(oldIndex, newIndex) {
			this.currentIndex = newIndex
		},

    newIndex(index) {
      this.paused = true
      this.$refs.carousel.pause()
      this.$refs.carousel.goTo(index)
		},
		
		handleImageSizing() {
			const imageWidth = this.$el.offsetWidth

			this.imageWidth = imageWidth
			this.imageHeight = imageWidth * (9 / 16)
		},

		isVisibleOnScreen() {
			const carousel = this.$el.getBoundingClientRect()

			if (onScreen(carousel)) {
				this.isOnScreen = true
			} else {
				this.isOnScreen = false
			}
		}
  },

  computed: {
		amount() {
			if (this.$slots.default[0]) {
				return this.$slots.default.length
			} else return 1
		},

		allowPlay() {
			const state = this.$store.state

			return !state.app.isLoading && !state.ui.curtainDisplayed && this.isOnScreen
				? true
				: false
		},

		/* styling() {
			return {
				width: 
			}
		} */
  }
}
</script>

<style lang="scss" scoped>
.content-carousel {
	position: relative;

  .dummy-item {
    min-height: 40vh;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1);
    span { font-weight: 700; }
  }
}
</style>
