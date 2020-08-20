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
			required: true
      //default: '/img/bg_default.jpg' // LIITÄ TÄHÄN JOKU ASIANMUKAINEN KUVA!
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
    steady: Boolean, // Background stays stationary despite of scrolling
    posX: {
      type: String,
      default: 'center',
      validator(prop) {
        return ['left', 'center', 'right', 'initial', 'inherit', 'unset'].indexOf(prop) !== -1
      }
    },
    posY: {
      type: String,
      default: 'center',
      validator(prop) {
        return ['top', 'center', 'bottom', 'initial', 'inherit', 'unset'].indexOf(prop) !== -1
      }
    },
    repeat: {
      type: [Boolean, String],
      default: false,
      validator(prop) {
        if (typeof prop === 'string') {
          return ['x', 'y', 'space', 'round', 'initial', 'inherit'].indexOf(prop) !== -1
        } else return true
      }
    }
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
      let repeat = 'no-repeat'

      if (this.repeat) {
        if (typeof this.repeat === 'boolean') {
          repeat = 'repeat'
        } else { // = 'string'
          if (this.repeat === 'x' || this.repeat === 'y') {
            repeat = `repeat-${this.repeat}`
          } else {
            repeat = this.repeat
          }
        }
      }

      return {
        position: this.position,
        backgroundImage: `url(${source})`,
        backgroundSize: this.fit, // 'cover' / 'contain'
        backgroundPositionX: this.posX
          ? this.posX
          : false,
        backgroundPositionY: this.parallax && !this.steady
          ? this.offsetY * this.parallaxAmount + 'px'
          : this.posY,
        backgroundAttachment: this.steady ? 'fixed' : this.posX,
        backgroundRepeat: repeat
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
  background: rgba(200, 200, 200, 0.2);

  &.steady {
    background-size: cover;
  }
}
</style>
