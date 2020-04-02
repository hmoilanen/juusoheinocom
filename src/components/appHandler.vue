<template>
  <!-- TODO!: TEE TÄSTÄ RENDERLESS-KOMPONENTTI! -->
  <div></div>
</template>

<script>
//import { throttle } from 'lodash' // TODO!: OTA KÄYTTÖÖN MYÖHEMMIN!

export default {
  created() {
    this.handleWindowResize()

    window.addEventListener('resize', this.handleWindowResize) // ... throttle(this.handleWindowResize, 500)) // TODO!: OTA KÄYTTÖÖN MYÖHEMMIN!
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.handleWindowResize)
    })
  },

  watch: {
    // For preventing screen scrolling in certain circumstances (body.style.overflow = 'hidden')
    '$store.state.app.ui.preventBodyScrolling': {
      immediate: true,
      deep: true,
      handler: function() {
        let preventBodyScrolling = this.$store.state.ui.preventBodyScrolling

        if (preventBodyScrolling) {
          document.body.style.setProperty('overflow', 'hidden')
        } else {
          document.body.style.removeProperty('overflow')
        }
      }
    }
  },

  methods: {
    handleWindowResize () {
      // For window.innerWidth / .innerHeight tracking and storing
      this.$store.dispatch('app/UPDATE_WINDOW', {
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  }
}
</script>

<style></style>
