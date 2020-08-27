import { dataType } from '@/utils/data'

// NOTE!: margins / sizing DOESN'T ACCEPT 0 (= falsy !) -> change!

export const sizing = { // Generic sizing mixin for components
  props: {
    size: {
      type: [Number, String],
      default: 's',
      validator(prop) {
        if (typeof prop === 'string') {
          return ['s', 'm', 'l', 'xl'].indexOf(prop) !== -1
        } else return true
      }
    },
    sizeUnit: {
      type: String,
      default: 'rem'
    },
    scaling: [Boolean, Array, Object, Number]
  },

  data() {
    return {
      mixinSizeCategories: { s: 6, m: 7, l: 8, xl: 10 }
    }
  },

  computed: {
    mixinSizing() {
      let baseDimension = 0.125 // For Jest -> revert!
      //let baseDimension = this.$store.state.ui.baseDimension
      let sizingBaseValue = baseDimension ? baseDimension : 0.125
      let self = this

      // Sizing based on predetermined categories
      function sizeCategory(size) {
        if (typeof size === 'string') {
          return self.mixinSizeCategories[size]
        } else return size // = number
      }

      // Fixed sizing based on breakpoints
      function ifScaling(size) {
        // Expected prop values:
        // -boolean (true), where size is scaled based on default multiplier and app's breakpoints
        // -array of numbers (1 = 0.125rem) which correlate with app's breakpoints (eg. [6, 8, 10]), see: store.state.ui
        // -object with key-value pairs, where keys are custom breakpoints and values numbers (eg. { '400': 6, '700': 8, '1000': 10 })
        // -number, where size is scaled based on it and app's breakpoints

        if (self.scaling) {
          let type = dataType(self.scaling)
          let breakpoint = self.$store.getters['ui/GET_BREAKPOINT']
					let multiplier = 2 // = 2 * 0.125rem

          if (type === 'boolean') {
            return size + (breakpoint.index * multiplier)
          } else if (type === 'array') {
            let hasNumbers = self.scaling.every(number => {
              return typeof number === 'number'
            })

            if (hasNumbers) {
              if (breakpoint.index > self.scaling.length - 1) {
                return self.scaling[self.scaling.length - 1]
              } else {
                return self.scaling[breakpoint.index]
              }
            } else {
              console.log('mixinSizing.scaling: array has to contain only numbers')
              return size
            }
          } else if (type === 'object') {
            let customBreakpoints = Object.keys(self.scaling).map(Number)
            let customSizes = Object.values(self.scaling)
            customSizes.unshift(size)
            let hasNumbers = customSizes.every(number => {
              return typeof number === 'number'
            })

            if (hasNumbers) {
              let windowWidth = window.innerWidth

              for (let i = 0; i < customBreakpoints.length; i++) {
                if (windowWidth < customBreakpoints[i]) {
                  return customSizes[i]
                } else if (i === customBreakpoints.length - 1 && windowWidth >= customBreakpoints[i]) {
                  return customSizes[customSizes.length - 1]
                }
              }
            } else {
              console.log('mixinSizing.scaling: object\'s values has to contain only numbers')
              return size
            }
          } else { // if number);
            return size + (breakpoint.index * self.scaling)
          }
        } else return size
      }

      if (this.size) {
        return ifScaling(sizeCategory(this.size)) * sizingBaseValue + this.sizeUnit
      }

      return ifScaling(this.mixinSizeCategories.s) * sizingBaseValue + this.sizeUnit
    }
  }
}

export const margins = { // Generic margin mixin for components
  props: {
    m: [Number, String], // = margin
    mX: [Number, String], // = margin left / right
    mY: [Number, String], // = margin top / bottom
    mL: [Number, String], // = margin left
    mR: [Number, String], // = margin right
    mT: [Number, String], // = margin top
    mB: [Number, String], // = margin bottom
    mUnit: {
      type: String,
      default: 'rem'
    }
  },

  data() {
    return {
      mixinMarginCategories: { s: 4, m: 8, l: 12, xl: 16 }
    }
  },

  computed: {
    mixinMargins() {
      let margins = {
        margin: false,
        marginLeft: false,
        marginRight: false,
        marginTop: false,
        marginBottom: false
      }
      let baseDimension = 0.125 // For Jest -> revert!
      //let baseDimension = this.$store.state.ui.baseDimension
      let marginBaseValue = baseDimension ? baseDimension : 0.125
      let self = this

      // For calculating margins
      function marginSize(multiplier) {        
        return multiplier * marginBaseValue + self.mUnit
      }

      // For sizing base on predetermined categories
      function sizeCategory(size) {
        if (typeof size === 'string') {
          if (size === 's' || size === 'm' || size === 'l' || size === 'xl') {
            return self.mixinMarginCategories[size]
          } else return self.mixinMarginCategories.m
        } else return size
      }

      if (this.mL) { margins.marginLeft = marginSize(sizeCategory(this.mL)) } // = margin left
      if (this.mR) { margins.marginRight = marginSize(sizeCategory(this.mR)) } // = margin right
      if (this.mT) { margins.marginTop = marginSize(sizeCategory(this.mT)) } // = margin top
      if (this.mB) { margins.marginBottom = marginSize(sizeCategory(this.mB)) } // = margin bottom

      if (this.mX) { // = margin left / right
        if (typeof this.mX === 'string' && this.mX === 'auto') { // for horizontal centering
          margins.marginLeft = 'auto'
          margins.marginRight = 'auto'
        } else {
          if (!this.mL) { margins.marginLeft = marginSize(sizeCategory(this.mX)) }
          if (!this.mR) { margins.marginRight = marginSize(sizeCategory(this.mX)) }
        }
      }
      if (this.mY) { // = margin top / bottom
        if (!this.mT) { margins.marginTop = marginSize(sizeCategory(this.mY)) }
        if (!this.mB) { margins.marginBottom = marginSize(sizeCategory(this.mY)) }
      }

      if (this.m) { // = margin
        if (!this.mX) {
          if (!this.mL) { margins.marginLeft = marginSize(sizeCategory(this.m)) }
          if (!this.mR) { margins.marginRight = marginSize(sizeCategory(this.m)) }
        }
        if (!this.my) {
          if (!this.mT) { margins.marginTop = marginSize(sizeCategory(this.m)) }
          if (!this.mB) { margins.marginBottom = marginSize(sizeCategory(this.m)) }
        }
      }

      return margins
    }
  }
}