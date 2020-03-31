<script>
import { Sortable } from '@shopify/draggable' // See: https://github.com/Shopify/draggable | $ npm install @shopify/draggable --save

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
// Note! when <sortableListItem> is for-looped it's keys can't be binded to index but soma unique data
// otherwise draggable will glitch

export default {
  props: {
    value: {
      required: true
    },
    itemClass: {
      default: 'sortable-list-item'
    },
    handleClass: {
      default: 'sortable-list-item-handle'
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
.contact-list {
  border: 1px;
  border-color: yellow;
}
.contact-list-item {
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
.contact-list-item.draggable-source--is-dragging {
  background-color: #f1f5f8;
}
.contact-list-item.draggable-source--is-dragging > * {
  opacity: 0;
}
/* .contact-list-contact {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.contact-list-avatar {
  height: 3rem;
  width: 3rem;
  border-radius: 9999px;
  display: block;
  margin-right: 0.5rem;
}
.contact-list-name {
  font-weight: 700;
}
.contact-list-email {
  color: #8795a1;
} */
.contact-list-handle {
  margin-left: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
  cursor: move;
  color: #b8c2cc;
}
.contact-list-handle:hover {
  color: #3d4852;
}
</style>
