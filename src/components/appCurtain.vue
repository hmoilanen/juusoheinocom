<template>
	<div class="app-curtain" :style="[styling, cssVars]">
		<div
			v-for="(pixel, index) in 4"
			:key="index"
			class="pixel"
			:class="`pixel-${index}`"
		></div>
		<base-loader v-if="showLoader" class="curtain-loader"></base-loader>
	</div>

</template>

<script>
import { gsap } from 'gsap'

const tl = gsap.timeline({ paused: false, delay: 1 })

export default {
  name: 'AppCurtain',

  data() {
    return {
      animationPassed: false,
			showLoader: false,
			pixelSize: 20
    }
	},

	created() {
		this.$store.dispatch('SET_STATE', { data: true, path: 'ui.preventBodyScrolling' })
	},

  mounted() {
		const phaseDuration = 0.5

		tl
			.to('.pixel-0', phaseDuration, { x: -this.pixelSize, ease: 'power2.inOut' }, 'phase-1')
			.to('.pixel-1', phaseDuration, { x: -this.pixelSize, ease: 'power2.inOut' }, 'phase-1')
			.to('.pixel-2', phaseDuration, { x: this.pixelSize, ease: 'power2.inOut' }, 'phase-1')
			.to('.pixel-3', phaseDuration, { x: this.pixelSize, ease: 'power2.inOut' }, 'phase-1'
			)
			.to('.pixel-0', phaseDuration, { y: -this.pixelSize, ease: 'power2.inOut' }, 'phase-2')
			.to('.pixel-1', phaseDuration, { y: this.pixelSize, ease: 'power2.inOut' }, 'phase-2')
			.to('.pixel-2', phaseDuration, { y: -this.pixelSize, ease: 'power2.inOut' }, 'phase-2')
			.to('.pixel-3', phaseDuration, { y: this.pixelSize, ease: 'power2.inOut' }, 'phase-2')

			.to('.pixel-1', phaseDuration, { scaleY: 3, ease: 'power4.in' })
			.to('.pixel-0', 0, { css: { backgroundColor: '#E7287A' } })
			.to('.pixel-0', phaseDuration, {
				y: -(this.pixelSize * 2),
				ease: 'power2.out',
				onComplete: () => this.animationPassed = true
			})
  },

  watch: {
    animationPassed() {
      if (!this.isLoading) {
				this.proceed()
      } else {
				this.showLoader = true
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
      return this.$app.isLoading()
    },

    styling() {
      return {
        zIndex: this.$store.state.ui.zIndex.appCurtain
      }
		},

		cssVars() {
      return {
        '--app-curtain--pixel-size': this.pixelSize + 'px',
      }
    }
  },

  methods: {
    proceed() {
			this.showLoader = false

			tl.to('.app-curtain', 0.6, {
				opacity: 0,
				scale: 20,
				ease: 'power3.in',
				onComplete: () => {
					this.$store.dispatch('SET_STATE', { data: false, path: 'ui.curtainDisplayed' })
					this.$store.dispatch('SET_STATE', { data: false, path: 'ui.preventBodyScrolling' })		
				}
			})
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
  color: $app-curtain--color;

	.pixel {
    position: absolute;
    width: var(--app-curtain--pixel-size);
    height: var(--app-curtain--pixel-size);
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
