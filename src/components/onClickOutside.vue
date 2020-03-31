<script>
export default {
  name: 'onClickOutside',

  props: {
    do: {
      type: Function
    }
  },

  mounted () {
    const listener = event => {
      if (event.target === this.$el || this.$el.contains(event.target)) {
        return
      } else {
        this.do()
      }
    }

    document.addEventListener('click', listener)
    this.$on('hook:beforeDestroy', () => {
      document.removeEventListener('click', listener)
    })
  },

  render () {
    return this.$slots.default[0]
  }
}
</script>
