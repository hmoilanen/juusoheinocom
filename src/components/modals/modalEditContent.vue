<template>
  <div class="modal-edit-content">
    <base-title size="l" mB="xl">Edit content</base-title>

    <base-spacer>
      <template v-for="(editable, key) in editables">
        <component
          :key="key"
          :ref="key"
          :is="editable.is"
          :value="editable.data"
          :label="key"
          @updated="updateContentToEdit($event, key)"
        ></component>
        <base-button
          v-if="allowUndo(key)"
          :key="key + '-button'"
          @click="undo(key)"
          :empty="true"
        >undo</base-button>
      </template>
    </base-spacer>

    <base-button @click="save">Done</base-button>
  </div>
</template>

<script>
//TODOS:
//RAKENNA FEEDBACK KUN TALLENNETTU
//LISÄÄ APUTEKSTEJÄ!

import { dataType, dynamicDataStructure } from '@/utils/data'
import { isImage } from '@/utils/regex' 
import dropzone from '@/components/dropzone'

export default {
  name: 'modalEditContent',

  components: { dropzone },

  props: {
    modalData: {
      type: [String, Object], // Provide as '' or { key: value, ... }
      required: true
    }
  },

  data() {
    return {
      contentToEdit: null, // This mimics $props.modalData.content
      dataType: '',
      images: {}
    }
  },

  async created() {
    this.contentToEdit = JSON.parse(JSON.stringify(this.modalData.content))
    this.dataType = dataType(this.contentToEdit)
  },

  computed: {
    editables() {
      let toEdit = {}

      // Create object structure to be looped in template
      if (this.dataType === 'string') {
        let key = this.modalData.path.split('.').pop()
        toEdit[key] = { data: this.contentToEdit }
      } else { // If object
        for (let key in this.contentToEdit) {
          toEdit[key] = { data: this.contentToEdit[key] }
        }
      }

      // Determine components to use and tweak data structure if image
      for (let key in toEdit) {
        let content = toEdit[key]
        
        if (isImage.test(content.data) || dataType(content.data) === 'object') {
          content.is = 'dropzone'
          content.data = { name: content.data, path: this.modalData.path }
        } else {
          content.is = 'base-input'
        }
      }

      return toEdit
    }
  },

  methods: {
    updateContentToEdit(value, key) {
      if (this.dataType === 'string') {
        this.contentToEdit = value
      } else { // If object
        let data = value

        if (value.name) { // If value is about image
          data = value.name
          this.$set(this.images, value.name, value)
        }

        this.$set(this.contentToEdit, key, data)
      }
    },

    allowUndo(key) {
      return this.modalData.content[key] !== this.contentToEdit[key]
        ? true
        : false
    },

    undo(key) {
      let toUndo = this.modalData.content[key]
      this.updateContentToEdit(toUndo, key)
    },

    async save() {
      // Save edited data to store.
      this.$store.dispatch('SET_STATE', {
        data: this.contentToEdit,
        path: 'content.' + this.modalData.path
      }, null, true)

      let path = this.modalData.path.split('.')
      let collection = path.shift()
      let document = path.shift()
      let dataObject = {}

      // Create data structure inside of object dynamically, to be stored under the document.
      dynamicDataStructure(dataObject, path, this.contentToEdit)
      
      // Save edited data to database.
      await this.$api.setDocument(collection, document, dataObject, true)
      
      // In case of images, save files to storage.
      if (Object.keys(this.images).length !== 0) {
        // Save files.
        for (let image in this.images) {
          // Create path and URL for image.
          let dataURL = this.images[image].dataURL
          let imagePath = this.modalData.path.split('.') 
          imagePath.splice(0, 1, 'images')
          imagePath = imagePath.join('/') + '/' + this.images[image].name

          // Check if image is included in this.contentToEdit .
          if (Object.values(this.contentToEdit).includes(image)) {
            // If included, save it to storage.
            await this.$api.uploadToStorage(dataURL, imagePath)
            .then(res => console.log('uploaded:', res))
            .catch(err => console.log('error:', err))
          } else {
            // Later, add code here if it's intended to delete the pre-existing file from storage.
          }
        }
      }

      this.$emit('close-modal')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-edit-content {
}
</style>
