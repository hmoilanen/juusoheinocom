<template>
  <div class="base-content-carousel" :style="mixinMargins">
    
    <Vue-slick-carousel
      v-bind="settings"
      ref="carousel"
    >
      <slot>
        <div
          :key="index"
          v-for="(dummy, index) in amount"
          class="item"
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
// https://github.com/gs-shop/vue-slick-carousel
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css' // import style
// import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css' // optional style for arrows & dots

export default {
  name: 'baseContentCarousel',

  components: { VueSlickCarousel },

  mixins: [margins],

  props: {
    amount: {
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
      }
    }
  },

  mounted() {
    let interval = setInterval(() => {
      if (!this.paused) {
        this.$refs.carousel.next()
      } else {
        clearInterval(interval)
      }
    }, this.duration)

    this.$on('hook:beforeDestroy', () => {
      clearInterval(interval)
    })
  },

  methods: {
    newIndex(index) {
      this.paused = true
      this.$refs.carousel.pause()
      this.$refs.carousel.goTo(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-content-carousel {
  
  .item {
    min-height: 40vh;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    background: grey;
    span { font-weight: 700; }
  }
}
</style>
