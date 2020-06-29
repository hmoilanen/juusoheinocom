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
      const target = event.target
      const el = this.$el
      console.log('target', target);
      console.log('el', el);
      
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
