<script>
export default {
	name: 'SortableListItem',

  inject: ['sortableListItemClass'],

  mounted () {
    if (this.$el.classList) {
      this.$el.classList.add(this.sortableListItemClass)
    }
  },

  render () {
    return this.$slots.default[0]
  }
}
</script>
