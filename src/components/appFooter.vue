<template>
  <div class="app-footer" ref="footer">
    <base-wrapper>
      <base-flex :column="true" center="x">
        <div class="app-footer-links">
          <base-link mode="router" :to="{ name: 'home' }">Home</base-link>
          <base-link mode="router" :to="{ name: 'error' }">Error</base-link>
        </div>

        <span class="app-footer-watermark"
          >{{ this.$store.state.app.official.watermark }}. All rights
          reserved.</span
        >

        <base-flex
          class="app-footer-return"
          @click="returnToTop"
          center="y"
          mT="m"
        >
          <span>Back to top</span>
          <base-icon icon="up" :size="6" mL="s"></base-icon>
        </base-flex>
      </base-flex>
    </base-wrapper>
  </div>
</template>

<script>
export default {
  name: 'appFooter',

  mounted() {
    this.calcFooterHeight()

    window.addEventListener('resize', this.calcFooterHeight)
    this.$on('hook:beforeDestoy', () => {
      window.removeEventListener('resize', this.calcFooterHeight)
    })
  },

  computed: {
    appUrl() {
      return this.$store.state.app.appUrl
    }
  },

  methods: {
    calcFooterHeight() {
      let height = this.$refs.footer.offsetHeight
      // store footer's height for ui adjustments
      this.$store.dispatch('SET_STATE', { data: height, path: 'ui.footerHeight' })
    },

    goTo(to) {
      // TODO!: TEE TÄSTÄ UTIL ?!?!
      if (to === '/support') {
        this.$router.push(to)
      } else this.$router.push({ name: to })
    },

    returnToTop() {
      let scrollDuration = 500
      let cosParameter = window.scrollY / 2
      let scrollCount = 0
      let oldTimestamp = performance.now()

      function step(newTimestamp) {
        scrollCount +=
          Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
        if (scrollCount >= Math.PI) window.scrollTo(0, 0)
        if (window.scrollY === 0) return
        window.scrollTo(
          0,
          Math.round(cosParameter + cosParameter * Math.cos(scrollCount))
        )
        oldTimestamp = newTimestamp
        window.requestAnimationFrame(step)
      }

      window.requestAnimationFrame(step)
    }
    /*
      See: https://stackoverflow.com/questions/21474678/scrolltop-animation-without-jquery

      Explanations:
      - pi is the length/end point of the cosinus intervall (see above)
      - newTimestamp indicates the current time when callbacks queued by requestAnimationFrame begin to fire.
        (for more information see https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
      - newTimestamp - oldTimestamp equals the duration

        a * cos (bx + c) + d                      | c translates along the x axis = 0
      = a * cos (bx) + d                          | d translates along the y axis = 1 -> only positive y values
      = a * cos (bx) + 1                          | a stretches along the y axis = cosParameter = window.scrollY / 2
      = cosParameter + cosParameter * (cos bx)    | b stretches along the x axis = scrollCount = Math.PI / (scrollDuration / (newTimestamp - oldTimestamp))
      = cosParameter + cosParameter * (cos scrollCount * x)
    */
  }
}
</script>

<style lang="scss" scoped>
$footer-bg-color: $app-color--main;
$footer-color: $app-color--theme;

.app-footer {
  //grid-area: footer; // TODO!: OTA KÄYTTÖÖN!
  display: flex;
  flex-direction: column;
  background-color: $footer-bg-color;
  color: $footer-color;
  span {
    // VÄLIAIKAINEN
    display: block;
    text-align: center;
    font-size: 0.85rem;
  }
}

// KESKENERÄINEN -> JÄÄKÖ EDES OLLENKAAN BASE-VERSIOON?
.app-footer-links {
  justify-content: center;
  flex-wrap: wrap;
  line-height: 2rem;
  & > * {
    padding: 0 1rem;
    text-align: center;
    white-space: nowrap;
  }
}

.app-footer-socials {
  margin-top: 1rem;
}

.app-footer-watermark {
  margin-top: 1rem;
}

.app-footer-return {
  @extend %clickable;
}
</style>
