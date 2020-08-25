<script>
import { Sortable } from '@shopify/draggable'
// See: https://github.com/Shopify/draggable
// $ npm install @shopify/draggable --save

// Note!: when <sortableListItem> is for-looped it's keys can't be binded to index but some unique data...
// Otherwise draggable will glitch

function move (items, oldIndex, newIndex) {
  const itemRemovedArray = [
    ...items.slice(0, oldIndex),
    ...items.slice(oldIndex + 1, items.length)
  ]
  return [
    ...itemRemovedArray.slice(0, newIndex),
    items[oldIndex],
    ...itemRemovedArray.slice(newIndex, itemRemovedArray.length)
  ]
}

export default {
  props: {
    value: {
      required: true
    },
    itemClass: {
      default: 'sortable-list--item'
    },
    handleClass: {
      default: 'sortable-list--item-handle'
    }
  },

  provide () {
    return {
      sortableListItemClass: this.itemClass,
      sortableListItemHandleClass: this.handleClass
    }
  },

  mounted () {
    new Sortable(this.$el, {
      draggable: `.${this.itemClass}`,
      handle: `.${this.handleClass}`,
      mirror: {
        constrainDimensions: true,
        //xAxis: false
      }
    }).on('sortable:stop', ({ oldIndex, newIndex }) => {
      this.$emit('input', move(this.value, oldIndex, newIndex))
    })
  },

  render () {
    const slot = this.$scopedSlots.default({
      items: this.value
    })

    return Array.isArray(slot) ? slot[0] : slot
  }
}
</script>

<style lang="scss">
.sortable-list--item {
  margin: 5px 0;
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem;
  border-bottom-width: 1px;
  border-color: #43474b;
}
.sortable-list--item.draggable-source--is-dragging {
  background-color: #f1f5f8;
}
.sortable-list--item.draggable-source--is-dragging > * {
  opacity: 0;
}
.sortable-list--item-handle {
  margin-left: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
  cursor: move;
	color: #b8c2cc;
	&:hover { color: #3d4852; }
}
</style>
