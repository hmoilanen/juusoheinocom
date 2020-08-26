<template>
  <div class="app-handler"></div>
</template>

<script>
// Todo:
// -convert component as renderless

export default {
	name: 'AppHandler',
	
  async beforeCreate() {
    // Get data from firebase
    await Promise.all([
			this.$api.getData('home', null, 'content'),
      this.$api.getData('contact', null, 'content'),
      this.$api.getData('projects', null, 'content'),
      this.$api.getData('gallery', null, 'content'),
      this.$api.getData('components', null, 'content'),
      this.$api.getData('meta', null, 'content')
    ])

    this.$store.dispatch('SET_STATE', { data: false, path: 'app.isLoading' })
  },

  watch: {
    // For preventing screen scrolling in certain circumstances
    '$store.state.ui.preventBodyScrolling': {
      immediate: true,
      deep: true,
      handler: function() {
        if (this.$store.state.ui.preventBodyScrolling) {
          document.body.style.setProperty('overflow', 'hidden')
        } else {
          document.body.style.removeProperty('overflow')
        }
      }
		}
  }
}
</script>

<style lang="scss" scoped>
.app-handler {
  position: absolute;
}
</style>
