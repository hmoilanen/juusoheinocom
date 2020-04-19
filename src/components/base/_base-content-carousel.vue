<template>
  <div class="base-content-carousel">
    
    <Vue-slick-carousel ref="carousel" v-bind="settings">
      <div
        v-for="(dummy, index) in items"
        :key="index"
        class="item"
      ><span>{{ index + 1 }}</span></div>

      <template #prevArrow>
        <base-icon>left</base-icon>
      </template>
      <template #nextArrow>
        <base-icon>right</base-icon>
      </template>
    </Vue-slick-carousel>
    
    <br><br>

    <base-index-indicator
      :amount="items"
      :duration="duration"
      @new-index="newIndex"
    ></base-index-indicator>

  </div>
</template>

<script>
// https://github.com/gs-shop/vue-slick-carousel
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css' // import style
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css' // optional style for arrows & dots

export default {
  name: 'baseContentCarousel',

  components: {
    VueSlickCarousel
  },

  data() {
    return {
      items: 8,
      duration: 3000,
      paused: false,
      settings: {
        accessibility: false,
        arrows: false,
        cssEase: 'cubic-bezier(0, 0.65, 0.25, 1)',
        //fade: true,
        pauseOnHover: false,
        speed: 600,
        waitForAnimate: false
      }
    }
  },

  watch: {
    newIndex: {
      immediate: true,
      handler() {
        
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
  margin-bottom: 30px; //POISTUU!

  .item { //POISTUU!
    min-height: 100px;
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    background: grey;
  }
}
</style>
