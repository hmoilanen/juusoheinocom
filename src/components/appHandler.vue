<template>
  <div class="app-handler"></div>
</template>

<script>
// TODOS:
// -CONVERT TO RENDERLESS COMPONENT

//import { throttle } from 'lodash' // TODO!: OTA KÄYTTÖÖN MYÖHEMMIN!

export default {
  async beforeCreate() {
    // get data from firebase
    await Promise.all([
      this.$api.getData('text', {}, 'content'),
      this.$api.getData('images', {}, 'content')
    ])
    this.$store.dispatch('SET_STATE', { data: false, path: 'app.isLoading' })

    //this.$store.dispatch('SET_STATE_C', { data: true, path: 'app.apptests.test1.best.kakkelsson.itula.vitulla' })
    //this.$store.dispatch('SET_STATE_C', { data: true, path: 'app.apptests', property: 'test2' })
    //let retirri = this.$store.state.app.apptests.test1.best.kakkelsson.itula
    //this.$store.dispatch('SET_STATE_C', { data: true, path: retirri, property: 'kullilla' })
    //this.$store.dispatch('SET_STATE_C', { data: true, path: '', property: 'toimii' })
    //this.$store.dispatch('SET_STATE_C', { data: true, path: this.$store.state, property: 'toimii2' })
    //this.$store.dispatch('SET_STATE_C', { data: true })
  },
  
  created() {
    this.handleWindowResize()

    window.addEventListener('resize', this.handleWindowResize) // ... throttle(this.handleWindowResize, 500)) // TODO!: OTA KÄYTTÖÖN MYÖHEMMIN!
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.handleWindowResize)
    })
  },

  watch: {
    // For preventing screen scrolling in certain circumstances (body.style.overflow = 'hidden')
    '$store.state.ui.preventBodyScrolling': {
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
      this.$store.dispatch('SET_STATE', { data: window.innerWidth, path: 'ui.window.width' })
      this.$store.dispatch('SET_STATE', { data: window.innerHeight, path: 'ui.window.height' })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-handler {
  position: absolute;
}
</style>
