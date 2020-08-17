<template>
  <div class="content-carousel" :style="mixinMargins">
    
    <Vue-slick-carousel
      v-bind="settings"
      ref="carousel"
    >
      <slot>
        <div
          :key="index"
          v-for="(dummy, index) in amount"
          class="dummy-item"
        >
          <span>{{ index + 1 }}</span>
        </div>
      </slot>
    </Vue-slick-carousel>

    <base-flex center="x" m-t="m">
      <base-index-indicator
        :amount="amount"
        :duration="duration"
        @new-index="newIndex"
      ></base-index-indicator>
    </base-flex>

  </div>
</template>

<script>
import { margins } from '@/utils/mixins'
import VueSlickCarousel from 'vue-slick-carousel' // https://github.com/gs-shop/vue-slick-carousel
import 'vue-slick-carousel/dist/vue-slick-carousel.css' // default styles
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css' // optional style for arrows & dots

export default {
  name: 'contentCarousel',

  components: { VueSlickCarousel },

  mixins: [margins],

  props: {
    amount: { // TEE TÄSTÄ 'max'
      type: Number,
      default: 6
    }
  },

  data() {
    return {
      duration: 3000,
      paused: false,
      settings: {
        accessibility: false,
        arrows: false,
        cssEase: 'cubic-bezier(0, 0.65, 0.25, 1)',
        //fade: true,
        pauseOnHover: false,
        speed: 390,
        waitForAnimate: false
			},
			imageWidth: 0,
			imageHeight: 0
    }
  },

  mounted() {
		this.handleImageSizing()

		window.addEventListener('resize', this.handleImageSizing)

    const interval = setInterval(() => {
      if (!this.paused) {
        this.$refs.carousel.next()
      } else {
        clearInterval(interval)
      }
    }, this.duration)

    this.$on('hook:beforeDestroy', () => {
			window.clearInterval('resize', this.handleImageSizing)
			clearInterval(interval)
		})
  },

  methods: {
    newIndex(index) {
      this.paused = true
      this.$refs.carousel.pause()
      this.$refs.carousel.goTo(index)
		},
		
		handleImageSizing() {
			const imageWidth = this.$el.offsetWidth
			
			this.imageWidth = imageWidth
			this.imageHeight = imageWidth * (9 / 16)
		}
  },

  /* computed: {
    images() {
      let gallery = this.$store.state.content.gallery
      let imageURL = this.$store.getters['app/GET_URL'].imageURL
      let images = []

      for (let image in gallery) {
        let URL = imageURL + 'gallery/india/' + image
        //const URL = imageURL + 'gallery/india/' + image
        //const URL = `${imageURL}${this.$route.name}/`
        images.push(URL)
      }

      return images
    }
  } */
}
</script>

<style lang="scss" scoped>
.content-carousel {
	position: relative;
	//background: rgba(0, 0, 0, 0.1);
	/* .slick-list {
		height: 200px !important;
	} */

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
