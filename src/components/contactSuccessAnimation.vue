<template>
  <div class="contact-success-animation" :style="cssVars">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="`0 0 ${size} ${size}`"
      :width="size * scale + 'px'"
      :height="size * scale + 'px'"
    >
      <!-- :style="styling" -->
      <g>
        <polyline
          points="48 35.72 48 48 2 48 2 2 48 2 48 35.72"
          class="outer"
        />
        <polyline
          points="48 35.72 19.61 35.72 19.61 20.65"
          ref="inner"
          class="inner"
        />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'contactSuccessAnimation',

  props: {
    scale: {
      type: Number,
      default: 0.75,
      validator(prop) {
        return prop > 0 && prop <= 1
      }
    },
    duration: {
      type: Number,
      default: 1450
    },
    strokeWidth: {
      type: [String, Number],
      default: '4px'
    }
  },

  data() {
    return {
      size: 50, // = px, based on size of svg
      transformOriginX: 0,
      transformOriginY: 0,
      // Svg path lengths hardcoded because of component's simplistic nature, see: svg element
      svgOuterPathLength: (48 - 2) * 4, // harcoded from svg coordinates, see: svg
      svgInnerPathLength: (48 - 19.61) + (35.72 - 20.65), // harcoded from svg coordinates, see: svg
    }
  },

  mounted() {
    let coordinates = this.$refs.inner.getAttribute('points').split(' ')
    this.transformOriginX = (coordinates[2] / this.size * 100) + '%'
    this.transformOriginY = (coordinates[3] / this.size * 100) + '%'

    setTimeout(() => {
      this.$emit('animation-completed', true)
    }, this.duration);
  },

  computed: {
    cssVars() {
      const animationDurationOuter = this.duration * 0.4 // = ms
      const animationDurationInner = this.duration - animationDurationOuter // = ms

      return {
        '--animation-outer--duration': animationDurationOuter + 'ms',
        '--animation-inner--duration': animationDurationInner + 'ms',
        '--svg-outer--path-length': this.svgOuterPathLength,
        '--svg-inner--path-length': this.svgInnerPathLength,
        '--svg-inner--transform-origin-x': this.transformOriginX,
        '--svg-inner--transform-origin-y': this.transformOriginY,
        '--svg-stroke--width': typeof this.strokeWidth === 'number'
          ? this.strokeWidth + 'px'
          : this.strokeWidth
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$contact-success-animation--color-hl: $app-color--hl;

.contact-success-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    polyline {
      fill: transparent;
      stroke: $contact-success-animation--color-hl;
      stroke-width: var(--svg-stroke--width);
      &.outer {
        stroke-dasharray: var(--svg-outer--path-length);
        stroke-dashoffset: var(--svg-outer--path-length);
        animation: outer var(--animation-outer--duration) ease-in forwards;
      }
      &.inner {
        transform-origin: var(--svg-inner--transform-origin-x) var(--svg-inner--transform-origin-y);
        stroke-dasharray: var(--svg-inner--path-length);
        stroke-dashoffset: var(--svg-inner--path-length);
        animation: inner var(--animation-inner--duration) ease-out forwards;
        animation-delay: var(--animation-outer--duration);
      }

      @keyframes outer {
        to { stroke-dashoffset: 0; }
      }
      @keyframes inner {
        60% {
          transform: rotate(0deg);
          stroke-dashoffset: 0;
        }
        80% { transform: rotate(0deg); }
        100% {
          stroke-dashoffset: 0;
          transform: rotate(-45deg);
        }
      }
    }
  }
}
</style>
