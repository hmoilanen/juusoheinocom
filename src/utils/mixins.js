import { dataType } from '@/utils/data'

// NOTE!: margins / paddings / sizing DOESN'T ACCEPT 0 AS A NUMBER / NO STYLE IS GENERATED IN COMPONENT! -> FIX!
// NOTE!: margins / paddings / sizing DOESN'T ACCEPT 0 AS A NUMBER / NO STYLE IS GENERATED IN COMPONENT! -> FIX!
// NOTE!: margins / paddings / sizing DOESN'T ACCEPT 0 AS A NUMBER / NO STYLE IS GENERATED IN COMPONENT! -> FIX!

export const sizing = { // Generic sizing mixin for components
  props: {
    size: [Number, String],
    sizeUnit: {
      type: String,
      default: 'rem'
    },
    scaling: {
      type: [Boolean, Array, Object, Number]
    }
  },

  data() {
    return {
      mixinSizeCategories: { s: 6, m: 7, l: 8, xl: 10 }
    }
  },

  computed: {
    mixinSizing() {
      let baseDimension = this.$store.state.ui.baseDimension
      let sizingBaseValue = baseDimension ? baseDimension : 0.125
      let self = this

      // Sizing based on predetermined categories
      function sizeCategory(size) {
        if (typeof size === 'string') {
          if (size === 's' || size === 'm' || size === 'l' || size === 'xl') {
            return self.mixinSizeCategories[size]
          } else return self.mixinSizeCategories.m
        } else return size // = number
      }

      // Fixed sizing based on breakpoints
      function ifScaling(size) {
        // expected prop values:
        // -boolean (true), where size is scaled based on default multiplier and app's breakpoints
        // -array of numbers (1 = 0.125rem) which correlate with app's breakpoints (eg. [6, 8, 10])
        // -object of key-value pairs, where keys are custom breakpoints and values numbers (eg. { '400': 6, '700': 8, '1000': 10 })
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
              console.log('mixinSizing: scaling array has to contain only numbers')
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
              let windowWidth = self.$store.state.ui.window.width

              for (let i = 0; i < customBreakpoints.length; i++) {
                if (windowWidth < customBreakpoints[i]) {
                  return customSizes[i]
                } else if (i === customBreakpoints.length - 1 && windowWidth >= customBreakpoints[i]) {
                  return customSizes[customSizes.length - 1]
                }
              }
            } else {
              console.log('mixinSizing: scaling object\'s values has to contain only numbers')
              return size
            }
          } else { // if number
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
      // = margin unit
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
      let baseDimension = this.$store.state.ui.baseDimension
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

export const paddings = { // Generic padding mixin for components
  props: {
    p: [Number, String], // = padding
    pX: [Number, String], // = padding left / right
    pY: [Number, String], // = padding top / bottom
    pL: [Number, String], // = padding left
    pR: [Number, String], // = padding right
    pT: [Number, String], // = padding top
    pB: [Number, String], // = padding bottom
    pUnit: { // = padding unit
      type: String,
      default: 'rem'
    }
  },

  data() {
    return {
      mixinPaddingCategories: { s: 4, m: 8, l: 12, xl: 16 }
    }
  },

  computed: {
    mixinPaddings() {
      let paddings = {
        padding: false,
        paddingLeft: false,
        paddingRight: false,
        paddingTop: false,
        paddingBottom: false
      }
      let baseDimension = this.$store.state.ui.baseDimension
      let paddingBaseValue = baseDimension ? baseDimension : 0.125
      let self = this

      // For calculating paddings
      function paddingSize(multiplier) {
        return multiplier * paddingBaseValue + self.pUnit
      }

      // For sizing base on predetermined categories
      function sizeCategory(size) {
        if (typeof size === 'string') {
          if (size === 's' || size === 'm' || size === 'l' || size === 'xl') {
            return self.mixinPaddingCategories[size]
          } else return self.mixinPaddingCategories.m
        } else return size
      }

      if (this.pL) { paddings.paddingLeft = paddingSize(sizeCategory(this.pL)) } // = padding left
      if (this.pR) { paddings.paddingRight = paddingSize(sizeCategory(this.pR)) } // = padding right
      if (this.pT) { paddings.paddingTop = paddingSize(sizeCategory(this.pT)) } // = padding top
      if (this.pB) { paddings.paddingBottom = paddingSize(sizeCategory(this.pB)) } // = padding bottom

      if (this.pX) { // = padding left / right
        if (!this.pL) { paddings.paddingLeft = paddingSize(sizeCategory(this.pX)) }
        if (!this.pR) { paddings.paddingRight = paddingSize(sizeCategory(this.pX)) }
      }
      if (this.pY) { // = padding top / bottom
        if (!this.pT) { paddings.paddingTop = paddingSize(sizeCategory(this.pY)) }
        if (!this.pB) { paddings.paddingBottom = paddingSize(sizeCategory(this.pY)) }
      }

      if (this.p) { // = padding
        if (!this.pX) {
          if (!this.pL) { paddings.paddingLeft = paddingSize(sizeCategory(this.p)) }
          if (!this.pR) { paddings.paddingRight = paddingSize(sizeCategory(this.p)) }
        }
        if (!this.py) {
          if (!this.pT) { paddings.paddingTop = paddingSize(sizeCategory(this.p)) }
          if (!this.pB) { paddings.paddingBottom = paddingSize(sizeCategory(this.p)) }
        }
      }

      return paddings
    }
  }
}

export const dynamicStyleSet = { // Generic styling for base components
  props: {
    styleSet: Number,
    resetStyle: Boolean
  },

  computed: {
    dynamicStyleSet() {
      let componentName = this.$options.name      
      let defaultStyleSet = this.$store.state.base.styleSet[componentName]
    
      if (this.resetStyle) {
        return 'reset'
      } else if (this.styleSet) {
        return this.styleSet
      } else if (defaultStyleSet) {
        return defaultStyleSet
      } else return 0
    }
  }
}

export const editableContent = { // Generic 'tooling' for base components wrapped in editableContent component
  inject: {
    editableContentData: {
      type: String,
      default: 'defaultInject' // for preventing error when data isn't injected 
    }
  },

  computed: {
    editableInnerContent() {
      if (this.editableContentData && this.editableContentData !== 'defaultInject') {
        return this.editableContentData.content
      } else return 'default inner content' // Note: this cannot be changed or baseImage component misfunctions
    }
  }
}

/* export const isOwner = {
  computed: {
    isOwner () {
      let user = this.$store.state.auth.main
      let route = this.$route.params

      if (user.type === route.entity && user.slug === route.id) {
        return true
      }
      return false
    }
  }
} */

/* export const coloring = {
  // onko tämä omansa? / tarvitaanko tälläistä?
} */