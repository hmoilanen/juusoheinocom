<template>
  <div ref="bg" class="base-bg" :class="classing" :style="styling">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'baseBg',

  props: {
    source: {
      type: String,
      default: '/img/bg_default.jpg' // LIITÄ TÄHÄN JOKU ASIANMUKAINEN KUVA!
    },
    position: {
      type: String,
      default: 'absolute'
    },
    fit: {
      type: String,
      default: 'cover',
      validator: prop => prop === 'cover' || prop === 'contain'
    },
    parallax: Boolean,
    parallaxAmount: {
      type: Number,
      default: 0.2
    },
    steady: Boolean // Background stays stationary despite of scrolling
  },

  data() {
    return { offsetY: null }
  },

  created() {
    this.handleWindowScroll()

    window.addEventListener('scroll', this.handleWindowScroll)
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', this.handleWindowScroll)
    })
  },

  methods: {
    handleWindowScroll() {
      this.offsetY = window.pageYOffset
    }
  },

  computed: {
    classing() {
      return {
        parallax: this.parallax,
        steady: this.parallax && this.steady ? this.steady : false
      }
    },
    styling() {
      let source = encodeURI(this.source)

      return {
        position: this.position,
        backgroundImage: `url(${source})`,
        backgroundSize: this.fit, // 'cover' / 'contain'
        backgroundPositionY:
          this.parallax && !this.steady
            ? this.offsetY * this.parallaxAmount + 'px'
            : 'initial',
        backgroundAttachment: this.steady ? 'fixed' : 'initial'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-bg {
  //position: ; // see: this.position
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: relative;
  width: 100%;
  background: lightblue;

  &.steady {
    background-size: cover;
  }
}
</style>
