<template>
  <div class="app-handler"></div>
</template>

<script>
// Todo:
// -convert component as renderless

export default {
	name: 'AppHandler',
	
	mounted() {
		this.updateWindowWidth()

		window.addEventListener('resize', this.updateWindowWidth)
		this.$once('hook:beforeDestroy', () => {
			window.removeEventListener('resize', this.updateWindowWidth)
		})

	},

	methods: {
		updateWindowWidth() {
			this.$store.dispatch('SET_STATE', {
				data: window.innerWidth,
				path: 'ui.windowWidth'
			})
		}
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
