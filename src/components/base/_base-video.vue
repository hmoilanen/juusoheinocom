<template>
  <div class="base-video" :style="mixinMargins">
    <div class="wrapper">
      <iframe
        :src="videoSource"
        frameborder="0"
        allowfullscreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { margins, editableContent } from '@/utils/mixins'

export default {
  name: 'baseVideo',

  mixins: [margins, editableContent],

  props: {
    allowControls: Boolean,
  },

  computed: {
    videoSource() {
      if (this.editableInnerContent !== 'default inner content') {
        return this.getEmbedVideoUrl(this.editableInnerContent)
      } else if (this.$attrs.src) {
        return this.getEmbedVideoUrl(this.$attrs.src)
      } else {
        return 'https://www.youtube.com/embed/iQ7dTMPwUi8'
      }
    }
  },

  methods: {
    getEmbedVideoUrl(url) {
      const regEx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regEx)
      let videoId = (match && match[2].length === 11)
        ? match[2]
        : null

      return 'https://www.youtube.com/embed/' + videoId
    }
  }
}
</script>

<style lang="scss" scoped>
.base-video {
  position: relative;
  margin: 0 auto;

  .wrapper {
    position: relative;
    height: 0;
    width: 100%;
    padding-bottom: 56.25%;
    background: lightgrey;

    iframe,
    video {
      @extend %absolute-0000;
      width: 100%;
      height: 100%;
    }
  }
}

</style>
