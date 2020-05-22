<template>
  <!-- see: https://rowanwins.github.io/vue-dropzone/docs/dist/#/demo -->
  <!-- npm install vue2-dropzone --save -->

  <div
    ref="container"
    class="dropzone-container"
    :class="classing"
    :style="[styling, cssVars]"
  >

    <vue-dropzone
      ref="customVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      :useCustomSlot="false"
      :destroyDropzone="true"
      :includeStyling="false"
      @vdropzone-file-added="ifFileAdded"
      @vdropzone-complete="fileLoaded"
      @vdropzone-drag-enter="onTop = true"
      @vdropzone-drag-leave="onTop = false"
    ></vue-dropzone>

    <!-- helpers -->
    <base-flex class="helpers" center="xy" :wrap="true" style="overflow: hidden;">
      <span v-if="!addedFile && !loading">drop image<br>or<br>click</span>
      <base-loader v-if="loading"></base-loader>
    </base-flex>

    <!-- dropzone controls -->
    <base-flex v-if="addedFile && !loading" class="controls">
      <!-- <base-button @click="emitFile" size="s" mR="m">accept</base-button> -->
      <base-button @click="deleteFile" size="s" :empty="true">delete</base-button>
    </base-flex>

  </div>
</template>

<script>
// PROP: LISÄÄ THUMBNAIIL-OPTIO (= TUOTTAA KUVAN LATAAMISEN LISÄKSI SIITÄ TIETYNKOKOISEN JA -LAATUISEN THUMBIN) -> PITÄÄ VOIDA MÄÄRITTÄÄ MYÖS THUMBIN KOKO!
// SLOT: LISÄÄ OPTIO SYÖTTÄÄ SLOTTIIN (AINAKIN) KONTROLLIT KUSTOMOITUINA (JA OTA SLOTISTA SCOPEDILLA METODIT ULOS)

import vue2Dropzone from 'vue2-dropzone'
//import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'dropzone',

  components: {
    vueDropzone: vue2Dropzone
  },

  props: {
    disabled: Boolean,
    size: String,
    height: String
  },

  data () {
    return {
      dropzoneOptions: { // https://www.dropzonejs.com/#configuration-options
        url: 'https://httpbin.org/post',
        thumbnailWidth: null,
        thumbnailHeight: null
      },
      addedFile: null,
      loading: false,
      onTop: false,
      imgWidth: 0,
      imgHeight: 0
    }
  },

  mounted() {
    this.onWindowResize()

    window.addEventListener('resize', this.onWindowResize)
    this.$on('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.onWindowResize)
    })
  },

  methods: {
    onWindowResize() {
      this.imgWidth = this.$refs.container.offsetWidth
      this.imgHeight = this.$refs.container.offsetHeight
    },

    ifFileAdded (file) {
      // This controls given files and now only lets one file to be active at dropzone at a time
      // Note: if it's intended multiple files to be loaded, code must be developed further!
      
      let ref = this.$refs.customVueDropzone
      let files = ref.dropzone.files
      let replacedFile = ref.dropzone.files[0]

      this.loading = true
      this.addedFile = file

      // If another file is added when there is already one, replace the prior with the new one
      if (ref.dropzone.files.length > 1) {
        ref.removeFile(replacedFile)
      }
    },

    fileLoaded(response) {
      if (response.status === 'success') {
        this.loading = false
        this.$emit('emit-file', this.addedFile)
        this.$emit('input', this.addedFile.name) // for v-model, see eg. modalEditContent.vue
      } else {
        console.log(response.status)
      }
    },

    deleteFile() {
      this.$refs.customVueDropzone.removeAllFiles(true)
      this.addedFile = null
      this.onTop = false
    }
  },

  computed: {
    classing() {
      return {
        disabled: this.disabled,
        completed: this.addedFile,
        'on-top': this.onTop
      }
    },

    styling() {
      let width = false
      let height = false

      if (this.size) {
        width = this.size
        height = this.size
      } else {
        if (this.width) { width = this.width }
        if (this.height) { height = this.height }
      }

      return {
        width: width,  
        height: height,  
      }
    },

    cssVars() { // for <img> sizing
      return {
        '--img-width': this.imgWidth + 'px',
        '--img-height': this.imgHeight + 'px'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$dropzone-color--border: $app-color--main;

.dropzone-container {
  overflow: hidden;
  position: relative;
  min-height: 250px;
  height: 100%;
  //height: 250px;
  margin: 0 auto;
  border: 3px dashed $dropzone-color--border;
  @extend %clickable;
  &:hover { background: transparentize($dropzone-color--border, 0.96); }
  &.disabled {
    @extend %disabled;
    opacity: 0.3;
  }
  &.on-top {
    border: 3px dashed transparentize($dropzone-color--border, 0.8);
    & .helpers span { opacity: 0.2 !important; }
  }
  &.completed {
    border: 0px dashed transparent;
    background: transparentize($dropzone-color--border, 0.95);
  }

  #dropzone {
    @extend %absolute-0000;

    &::v-deep {
      .dz-message {
        @extend %absolute-0000;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .dz-preview {
        width: 100%;
        height: 100%;

        .dz-image {
          width: 100%;
          height: 100%;
          transition: opacity 0.5s ease;
          img {
            object-fit: contain;
            width: var(--img-width); // see: this.cssVars()
            height: var(--img-height); // see: this.cssVars()
          }
        }
        &.dz-processing {
          .dz-image { opacity: 0.3; }
        }
        &.dz-complete {
          .dz-image { opacity: 1; }
        }
      }

      .dz-details, // = file size / name
      .dz-success-mark,
      .dz-error-mark {
        position: absolute;
        display: none;
      }
    }  
  }

  .helpers{
    pointer-events: none;
    @extend %absolute-0000;
    padding: 1rem;
    text-align: center;
    span {
      flex-shrink: 1;
      font-family: "Arial Black", sans-serif; 
      font-weight: 900;
      font-size: 1.4rem;
      text-transform: uppercase;
      line-height: 1.6em;
      color: $dropzone-color--border;
    }
  }

  .controls {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 1rem 1rem 1rem;
  }
}

</style>
