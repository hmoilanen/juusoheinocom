<script>
// https://github.com/wnr/element-resize-detector

import elementResizeDetectorMaker from 'element-resize-detector'

const erd = elementResizeDetectorMaker({ strategy: 'scroll' }) // 'scroll' for better performance

export default {
  name: 'OnResize',

  data() {
    return {
      width: 0,
      height: 0
    }
  },

  mounted() {
    erd.listenTo(this.$el, (el) => {
      this.width = el.offsetWidth
      this.height = el.offsetHeight
    })
  },
 
  render() {
    return this.$scopedSlots.default({
      width: this.width,
      height: this.height
    })
  }
}
</script>
