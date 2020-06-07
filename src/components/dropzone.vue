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
      :duplicateCheck="true"
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
      <!-- <base-button
        @click="deleteFile"
        :empty="true"
        size="s"
        m-r="s"
      >delete</base-button> -->
      <base-button
        v-if="allowUndo"
        @click="manuallyAddFile(initialFile.name)"
        :empty="true"
        size="s"
      >undo</base-button>
    </base-flex>

  </div>
</template>

<script>
// See: https://rowanwins.github.io/vue-dropzone/docs/dist/#/installation
// See: https://www.dropzonejs.com/

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
    height: String,
    // For displaying images manually.
    // Expects data as: { name: 'some-file.png', path: 'root.sub...' } .
    value: Object,

  },

  data () {
    return {
      dropzoneOptions: { // https://www.dropzonejs.com/#configuration-options
        url: 'https://httpbin.org/post',
        thumbnailWidth: null,
        thumbnailHeight: null
      },
      initialFile: '',
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

    if (this.value) {
      this.initialFile = this.value
      // Enable empty dropzone by giving value.name without actual filename, eg. as '.png'
      if (this.value.name.split('.')[0] !== '') {
        this.manuallyAddFile(this.value.name)
      }
    }
  },

  methods: {
    onWindowResize() {
      const container = this.$refs.container
      this.imgWidth = container.offsetWidth
      this.imgHeight = container.offsetHeight
    },

    ifFileAdded (file) {
      // This controls given files and now only lets one file to be active at dropzone at a time
      // Note: if multiple files need to be loaded, code must be developed further!
      let ref = this.$refs.customVueDropzone
      let files = ref.dropzone.files

      this.loading = true
      this.addedFile = file

      // If another file is added when there is already one, replace the prior with the new one
      if (files.length > 1) {
        ref.removeFile(files[0])
      }
    },

    fileLoaded(response) {      
      this.loading = false
      if (response.status === 'success' || response.manuallyAdded) {
        this.$emit('updated', this.addedFile)
      } else {
        console.log(response)
      }
    },

    manuallyAddFile(imageName) {
      // If imageName isn't provided, method only empties dropzone 
      this.deleteFile()

      if (imageName) {
        let ref = this.$refs.customVueDropzone
        let path = this.value.path.split('.')
        path.splice(0, 1)
        path = path.join('/')
        
        let imageURL = `${this.$store.getters['app/GET_URL'].imageURL}${path}/${imageName}`
        let file = { name: imageName, size: 10000 }

        ref.manuallyAddFile(file, imageURL)
      }
    },

    deleteFile() {
      this.$refs.customVueDropzone.removeAllFiles(true)
      this.addedFile = null
      this.onTop = false
    }
  },

  computed: {
    allowUndo() {
      if (this.addedFile && this.addedFile.name) {
        return this.addedFile.name === this.initialFile.name
          ? false
          : true
      } else return false
      
    },

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
