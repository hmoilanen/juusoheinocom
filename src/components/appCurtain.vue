<template>
  <transition name="exit" v-if="$store.state.ui.curtainDisplayed">
    <div class="app-curtain" :style="[styling, cssVars]">
      <template v-if="showAnimation">
        <div
          v-for="(pixel, index) in 4"
          :key="index"
          class="pixel"
          :class="`pixel-${index}`"
        ></div>
      </template>
      <base-loader v-if="showLoader" class="curtain-loader"></base-loader>
			<div class="app-curtain--reset" @click="proceed"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'appCurtain',

  data() {
    return {
      inOutDelay: 300,
      showAnimation: false,
      showLoader: false,
      animationDuration: 2200,
      animationDelay: 600,
      animationPassed: false,
    }
  },

  mounted() {
    setTimeout(() => {
      this.showAnimation = true
      this.showLoader = true
    }, this.inOutDelay)
    
    setTimeout(() => {
      this.animationPassed = true
    }, this.inOutDelay + this.animationDuration)
  },

  watch: {
    animationPassed() {
      if (!this.isLoading) {
        this.proceed()
      }
    },

    isLoading() {
      if (this.animationPassed) {
        this.proceed()
      }
    },
  },

  computed: {
    isLoading() {
      return this.$store.state.app.isLoading
    },

    styling() {
      return {
        zIndex: this.$store.state.ui.zIndex.appCurtain
      }
    },
    cssVars() {
      let animationDelay = this.animationDelay
      let animationDuration = this.animationDuration - animationDelay

      return {
        '--animation-duration': animationDuration + 'ms',
        '--animation-delay': animationDelay + 'ms'
      }
    }
  },

  methods: {
    proceed() {
      this.showLoader = false
      setTimeout(() => { // For visual purposes (hide loader and then proceed)
        this.$store.dispatch('SET_STATE', { data: false, path: 'ui.curtainDisplayed' })
      }, this.inOutDelay)
    }
  }
}
</script>

<style lang="scss" scoped>
$app-curtain--color: $app-color--main;
$app-curtain--color-bg: $app-color--theme;
$app-curtain--color-hl: $app-color--hl;

.app-curtain {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $app-curtain--color-bg;
  //background: rgba(255, 255, 255, 0.9);
  color: $app-curtain--color;
	border-bottom: 1px solid grey;
	
	.app-curtain--reset {
		position: absolute;
		top: 0;
		right: 0;
		width: 1px;
		height: 1px;
	}

  $pixel-size: 20px;

  .pixel {
    position: absolute;
    width: $pixel-size;
    height: $pixel-size;
    background: $app-curtain--color;
    animation-timing-function: ease-in-out;
    animation-duration: var(--animation-duration);
    animation-fill-mode: forwards;
    animation-delay: var(--animation-delay);
    &.pixel-0 { animation-name: move-0; }
    &.pixel-1 { animation-name: move-1; }
    &.pixel-2 { animation-name: move-2; }
    &.pixel-3 { animation-name: move-3; }

  }

  @keyframes move-0 { // left top
    0% { transform: translate(0, 0); }
    25% { transform: translate(-#{$pixel-size}, 0); }
    50% { transform: translate(-#{$pixel-size}, -#{$pixel-size}); }
    74.9% { background: $app-curtain--color; }
    75%, 100% {
      animation-timing-function: ease-out; 
      transform: translate(-#{$pixel-size}, -#{$pixel-size});
      background: $app-curtain--color-hl;
    }
    100% {
      transform: translate(-#{$pixel-size}, #{$pixel-size * -2});
      background: $app-curtain--color-hl;
    }
  }
  @keyframes move-1 { // left bottom
    0% { transform: translate(0, 0); }
    25% { transform: translate(-#{$pixel-size}, 0); }
    49.9% { height: 20px; }
    50% {
      transform: translate(-#{$pixel-size}, #{$pixel-size});
    }
    75% {
      animation-timing-function: ease-in;
      //transform: translate(-#{$pixel-size}, #{$pixel-size}) scaleY(3);
      transform: translate(-#{$pixel-size}, #{$pixel-size});
      height: 60px;
    }
    100% {
      //transform: translate(-#{$pixel-size}, #{$pixel-size}) scaleY(3);
      transform: translate(-#{$pixel-size}, #{$pixel-size});
      height: 60px;
    }
  }
  @keyframes move-2 { // right top
    0% { transform: translate(0, 0); }
    25% { transform: translate(#{$pixel-size}, 0); }
    50%, 100% { transform: translate(#{$pixel-size}, -#{$pixel-size}); }
  }
  @keyframes move-3 { // right bottom
    0% { transform: translate(0, 0); }
    25% { transform: translate(#{$pixel-size}, 0); }
    50%, 100% { transform: translate(#{$pixel-size}, #{$pixel-size}); }
  }

  .curtain-loader {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10vh;
  }
}

.exit-leave-active {
  transition: transform 0.4s cubic-bezier(0.83, 0.01, 0.86, 0.59);
}
.exit-leave-to {
  //transform: translateY(-100%);
  transform: scale(0, 0);
}
</style>
