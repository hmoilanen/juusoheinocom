<template>
  <div class="editable-content">
    <dropzone @emitFile="loadImage"></dropzone>
    <br><br>
    <!-- <div>{{ this.imagesFromStorage }}</div> -->
    <!-- <base-icon v-if="$api.isLogged()" @click="editContent">edit</base-icon> -->
    <template v-if="$api.isLogged()">
      <!-- <base-input :value="editableContent"></base-input> -->
      <base-input v-model="editedContent"></base-input>
      <base-text>{{ this.editableContent }}</base-text>
      <base-flex m-t="s">
        <base-button
          @click="edit"
          :disabled="!isEdited"
          m-r="s"
        >save</base-button>
        <base-button
          v-if="isEdited"
          @click="undo"
          :pseudo="true"
        >undo</base-button>
      </base-flex>
    </template>
    <slot v-else :content="editableContent"></slot>
  </div>
</template>

<script>
export default {
  name: 'editableContent',

  components: {
    dropzone: () => import('@/components/dropzone')
  },

  props: {
    path: { // Note!: path is given as firebase's path, not store's
      type: String,
      required: true
    }
  },

  data() {
    return {
      content: null,
      editedContent: ''
    }
  },

  watch: {
    isLoading: {
      immediate: true,
      handler(newValue) {
        if (!newValue) { // when loading no more
          let path = this.path.split('.')
          let target = this.$store.state.content

          while (path.length > 0) {      
            // create default data structure to store if it doesn't exist yet
            if (!(path[0] in target)) {              
              let data = path.length === 1 ? 'no content' : {}
              this.$store.dispatch('SET_STATE', { data: data, path: target, property: path[0] })
            }
            target = target[path.shift()]          
          }

          this.content = target
          this.editedContent = target
        }
      }
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.app.isLoading
    },

    isImage() {
      if (this.$children) {
        return this.$children[0].$options.name === 'baseImage'
          ? true
          : false
      } else return false
    },

    editableContent() {
      if (!this.content) {
        return 'loading...'
      } else return this.content
    },

    isEdited() {
      return this.editedContent !== this.content
    },

    /* async imagesFromStorage() {
      let joo = await this.$api.getFromStorage('images/')
      console.log('joo', joo[0]);
      return joo[0]
    } */
  },

  /* created() {
    let joo = this.$api.getFromStorage('images/')
    console.log('joo', joo);
    
  }, */

  methods: {
    async loadImage(imageData) {
      console.log('imageData', imageData);

      let dataURL = imageData.dataURL
      let path = 'images/' + imageData.name
      //console.log('dataURL', dataURL);
      //console.log('path', path);

      /* await this.$api.uploadToStorage(dataURL, path)
      .then(() => {        
        console.log('menestys!');
        this.$api.setDocument('images', 'testaus', { image: imageData.name }, true)
        this.$api.setDocument('images', 'yliajo', { image: imageData.name })
        this.$api.setDocument('images', null, { image: imageData.name })
      })
      .catch((error)=>{
        console.log(error)
      }) */

      //await this.$api.updateData('images', 'testaus', { juuso: 'heino' })
      //await this.$api.updateData('images', 'testaus', { juuso2: 'heino' })
      //await this.$api.updateData('images', 'testaus', { juuso3: 'heino' })
      //await this.$api.updateData('images', 'testaus', { juuso4: 'heino' })
      //await this.$api.updateData('images', 'testaus', { juuso4: { jee: 'heino' } })
      await this.$api.updateData('images', 'testaus', { jee: 'jee' })
      //await this.$api.deleteData('images', 'testaus', 'juuso2')
      await this.$api.updateArray('images', 'testaus', 'lista', 'ö')
      await this.$api.updateArray('images', 'testaus', 'lista', 'b', true)

      //await this.$api.setDocument('images', 'apina', {})
      //await this.$api.setDocument('images', 'testaus', { juuso420: 'heino' }, true)
      //await this.$api.setDocument('images', null, { image: imageData.name })
    },

    edit() {
      this.$store.dispatch('SET_STATE', { data: this.editedContent, path: 'content.' + this.path })
      this.content = this.editedContent
    },

    undo() {
      this.editedContent = this.content
    }
  }
}
</script>

<style lang="scss" scoped>
.editable-content {
  //display: inline-block;
  padding: 0.4rem;
  @extend %clickable;
  &:hover { background: pink; }
  /* .base-icon {
    @extend %clickable;
    z-index: 1;
    position: relative;
    color: red;
  } */
}
</style>