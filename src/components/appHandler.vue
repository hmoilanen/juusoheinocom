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
      this.$api.getData('text', null, 'content'),
      //this.$api.getData('images', null, 'content'),
      this.$api.getData('home', null, 'content'),
      this.$api.getData('contact', null, 'content'),
      this.$api.getData('projects', null, 'content'),
      this.$api.getData('meta', null, 'content')
    ])

    this.$store.dispatch('SET_STATE', { data: false, path: 'app.isLoading' })
  },
  
  created() {
    this.handleWindowResize()

    window.addEventListener('resize', this.handleWindowResize) // ... throttle(this.handleWindowResize, 500)) // TODO!: OTA KÄYTTÖÖN MYÖHEMMIN!
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.handleWindowResize)
    })
  },

  /* mounted() {
    let kama = this.$store.state.content.text.contact
    setTimeout(() => {
      for (let juttu in kama) {
        this.$api.setDocument('contact', juttu, kama[juttu])
      }
    }, 5000)
  }, */

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
