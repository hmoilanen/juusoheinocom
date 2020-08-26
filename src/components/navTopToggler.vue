<template>
  <div
		class="nav-top-toggler"
		:class="{ 'dd-open': mode === 'close' }"
		v-on="listeners"
	>
    <base-title
      class="text"
      :size="5"
      :m-r="5"
    >{{ this.togglerText }}</base-title>

    <div class="bars" :style="styling.bars">
      <div class="top" :style="styling.top"></div>
      <div class="mid" :style="styling.mid"></div>
      <div class="bot" :style="styling.bot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavTopToggler',

  props: {
    mode: {
      type: String,
      default: 'initial',
      validator(prop) {
        return ['initial', 'menu', 'close', 'back'].indexOf(prop) !== -1
      }
    }
  },

  data() {
    return {
      animationState: 'initial',
      previousMode: '',
      animationStateChangeDuration: 0.4 // = s
    }
  },

  watch: {
    mode: {
      immediate: true,
      handler(newValue, oldValue) {
        if (this.$app.isLoading()) { // During app initiation
          this.animationState = 'initial'  
        } else {
          this.previousMode = oldValue
          this.animationState = ''
          setTimeout(() => {
            this.previousMode = ''
            this.animationState = newValue
          }, this.animationStateChangeDuration * 1000)
        }
        
      }
    }
  },

  computed: {
		listeners() {
			return { ...this.$listeners }
		},

    togglerText() {
      let mode = this.mode

      if (this.mode !== 'initial') {
        if (this.$route.query.gallery) {
          mode = 'map'
        }

        return !this.$app.isLoading()
          ? this.$store.state.content.components.navTop[`toggler-${mode}-${this.$app.locale()}`]
          : ''
      } else return ''
    },

    styling() {
      let width = 20 // = px
      let height = 3 // = px
      let gapY = 8 // = px
      let bar = {
        width: width + 'px',
        height: height + 'px',
        transition: `width ${this.animationStateChangeDuration}s ease, transform ${this.animationStateChangeDuration}s ease`
      }
      let top = Object.assign({}, bar)
      let mid = Object.assign({}, bar)
      let bot = Object.assign({}, bar)

      if (this.animationState === 'initial') {
        top.width = `${height}px`
        mid.width = `${height}px`
        bot.width = `${height}px`
      } else if (this.animationState === 'menu') {
        top.transform = `translateY(-${gapY}px)`
        bot.transform = `translateY(${gapY}px)`
      } else if (this.animationState === 'close') {
        top.transform = `rotate(-${45}deg)`
        mid.transform = `rotate(${45}deg)`
        bot.transform = `rotate(${45}deg)`
      } else if (this.animationState === 'back') {
        top.transform = `rotate(${45}deg) scaleX(0.8)`
        bot.transform = `rotate(-${45}deg) scaleX(0.8)`
      }

      if (this.animationState === 'back' || this.previousMode === 'back') {
        top.transformOrigin = 'right top'
        bot.transformOrigin = 'right bottom'
      }

      return {
        bars: { width: width + 'px' },
        top: top,
        mid: mid,
        bot: bot
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$bars--color: $app-color--main;
$bars--color-secondary: $app-color--theme;

.nav-top-toggler {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
  @extend %clickable;
  .bars {
    // see: this.styling
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $bars--color;
  }
  .top,
  .mid,
  .bot { // see: this.styling
    position: absolute;
    background-color: $bars--color;
  }
  &.dd-open {
		.top,
    .mid,
    .bot { background-color: $bars--color-secondary; }
    .text { color: $bars--color-secondary !important; }
  }
}
</style>
