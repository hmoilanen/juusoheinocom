<script>
export default {
	name: 'SortableListItemHandle',
	
  inject: ['sortableListItemHandleClass'],

  mounted () {
    if (this.$el.classList) {
      this.$el.classList.add(this.sortableListItemHandleClass)
    }
  },

  render () {
    if (this.$slots.default) {      
      return this.$slots.default[0]
    }
    return null
  }
}
</script>
