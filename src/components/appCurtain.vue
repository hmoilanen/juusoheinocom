<template>
	<div class="app-curtain" :style="[styling, cssVars]">
		<div
			v-for="(pixel, index) in 4"
			:key="index"
			class="pixel"
			:class="`pixel-${index}`"
		></div>
		<!-- <base-loader v-if="showLoader" class="curtain-loader"></base-loader> -->
		<div class="app-curtain--reset" @click="proceed"></div>
	</div>

</template>

<script>
// TÄSSÄ KOMPONENTISSA ON VIEÄ PALJON POISTETTAVAA VANHAA KOODIA...
// OLI KIIRE NIIN JÄI SIVOOMATTA :)
import { gsap } from 'gsap'

const tl = gsap.timeline({ paused: false, delay: 1 })

export default {
  name: 'appCurtain',

  data() {
    return {
      inOutDelay: 300,
      showAnimation: false,
      showLoader: false,
      animationDuration: 22000000,
      animationDelay: 600,
      animationPassed: false,
    }
	},

	created() {
		this.$store.dispatch('SET_STATE', { data: true, path: 'ui.preventBodyScrolling' })
	},

  mounted() {
    setTimeout(() => {
      this.showAnimation = true
      this.showLoader = true
    }, this.inOutDelay)
    
    setTimeout(() => {
      this.animationPassed = true
		}, this.inOutDelay + this.animationDuration)
		
		const phaseDuration = 0.5
		tl
			//.from('.pixel', 0, {}, 0.5)
			.to('.pixel-0', phaseDuration, { x: -20, ease: 'power2.inOut' }, 'phase-1')
			.to('.pixel-1', phaseDuration, { x: -20, ease: 'power2.inOut' }, 'phase-1')
			.to('.pixel-2', phaseDuration, { x: 20, ease: 'power2.inOut' }, 'phase-1')
			.to('.pixel-3', phaseDuration, { x: 20, ease: 'power2.inOut' }, 'phase-1'
			)
			.to('.pixel-0', phaseDuration, { y: -20, ease: 'power2.inOut' }, 'phase-2')
			.to('.pixel-1', phaseDuration, { y: 20, ease: 'power2.inOut' }, 'phase-2')
			.to('.pixel-2', phaseDuration, { y: -20, ease: 'power2.inOut' }, 'phase-2')
			.to('.pixel-3', phaseDuration, { y: 20, ease: 'power2.inOut' }, 'phase-2')

			.to('.pixel-1', phaseDuration, { scaleY: 3, ease: 'power4.in' })
			.to('.pixel-0', 0, { css: { backgroundColor: '#E7287A' } })
			.to('.pixel-0', phaseDuration, {
				y: -40,
				ease: 'power2.out',
			})
			.to('.app-curtain', 0.5, {
				opacity: 0,
				scale: 20,
				ease: 'power3.in',
				onComplete: () => {
					this.proceed()
					/* setTimeout(() => {
					}, 0); */
				}
			})
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
		}
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
				this.$store.dispatch('SET_STATE', { data: false, path: 'ui.preventBodyScrolling' })
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
	opacity: 0.5;
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
	}

  .curtain-loader {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 10vh;
  }
}
</style>
