<template>
  <div class="app-footer" ref="footer">
    <div class="routes">
      <base-link
        v-for="(link, index) in links.routes"
        :key="index"
        :to="link.path"
        mode="router"
      >{{ link.title }}</base-link>
    </div>

    <div class="links">
      <base-link
        v-for="(link, index) in links.externals"
        :key="index"
        :to="link.link"
        mode="tab"
      >
        <base-icon :size="12">{{ link.icon }}</base-icon>
      </base-link>
    </div>

    <div class="legal">
      <span>{{ this.official.watermark }}. Made with <span class="heart"> &#10085;</span></span>
      <!-- <span>{{ this.official.disclaimer }}</span> -->
    </div>

    <!-- TEE TÄMÄ JOTENKIN HIENOMMIN!!! -->
    <base-flex
      class="scroller"
      @click="returnToTop"
      center="y"
      mT="m"
    >
      <span>Back to top</span>
      <base-icon icon="up" :size="6" mL="s"></base-icon>
    </base-flex>
  </div>
</template>

<script>
import { navLinks } from '@/utils/navigation'

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
    links() {
      return {
        routes: navLinks(),
        externals: this.$store.state.app.externals
      }
    },

    official() {
      return this.$store.getters['app/GET_OFFICIAL']
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
  //grid-area: footer; // TODO!: OTA KÄYTTÖÖN!?
  display: flex;
  flex-direction: column;
  align-items:  center;
  background-color: $footer-bg-color;
  color: $footer-color;

  .routes {
    & > * { display: block; }
  }
  .links {
    & > *:not(:last-child) { margin-right: 1rem; }
  }
  .legal {
    .heart {
      display: inline-block;
      transform: rotate(90deg);
    }
  }
}
</style>
