<template>
  <img
    :src="sourceContent"
    :alt="defaultAlt"
    v-on="listeners"
    class="base-image"
    :style="[styling, mixinMargins]"
  >
</template>

<script>
// Todo:
// -add @error and @load

import { margins } from '@/utils/mixins'
import { getFileName } from '@/utils/strings'

export default {
  name: 'BaseImage',

  inheritAttrs: false,

  mixins: [margins],

  props: {
    width: String // If not set, width: 100%
  },

  computed: {
    sourceContent() {
			if (this.$attrs.src) {
        return this.$attrs.src
      } else {
				return 'https://via.placeholder.com/200x200.png?text=PLACEHOLDER+IMAGE'
        // Note: placeholder's size / file type / text can be customized by changing url
      }
    },
    
    defaultAlt() {
      if (this.$attrs.alt) {
        return this.$attrs.alt
      } else {
        return getFileName(this.sourceContent)
      }
    },

    listeners() {
      return { ...this.$listeners }
    },

    styling () {
      return {
        width: this.width ? this.width : false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-image {
  display: block;
  width: 100%;
  height: auto;
}
</style>
