<template>
  <div class="modal-edit-content">
    <base-title size="l" mB="xl">Edit content</base-title>

    <!-- <base-input v-model="kompu" mB="l"></base-input>
    <div>{{this.contentToEdit}}</div>
    <div>{{this.kompu}}</div> -->
    <!-- <base-flex>
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
    </base-flex> -->

    <base-spacer>
      <component
        v-for="(editable, key) in editables"
        :key="key"
        :is="editable.is"
        :label="key"
        v-model="contentToEdit[key]"
        @emit-file="emitFile"
      ></component>
      
      <!-- POISTUU! -->
      <br>
      <base-text>{{ this.contentToEdit }}</base-text>
      <!-- POISTUU! -->
      
    </base-spacer>

    <base-button @click="save">Done</base-button>
  </div>
</template>

<script>
import { isImage } from '@/utils/regex' 
import { dataType } from '@/utils/data'
import dropzone from '@/components/dropzone'

export default {
  name: 'modalEditContent',

  components: { dropzone },

  props: ['modalData'],

  data() {
    return {
      //TÄMÄ TULEE OLLA AINA SELLAISESSA (ALKUPERÄISESSÄ) MUODOSSA ETTÄ SEN VOI SUORAAN PÄIVITTÄÄ STOREEN / KANTAAN !
      contentToEdit: null,
      //dataType: null,
      images: {}
    }
  },

  created() {
    //this.$store.dispatch('SET_STATE', { data: 'perse', path: 'text.home.persaus' })
    //this.contentToEdit = this.modalData.content
    this.contentToEdit = JSON.parse(JSON.stringify(this.modalData.content))
    //JSON.parse(JSON.stringify(this.modalData.content))
    console.log('this.contentToEdit', this.contentToEdit);
    console.log('this.modalData.content', this.modalData.content);
    
    //////// ->
    /* this.dataType = dataType(this.modalData.content)
    
    let toEdit = {}

    // Populate toEdit with data depending on it's type
    if (this.dataType === 'string') {
      toEdit.item = { data: this.modalData.content }
    } else if (this.dataType === 'object') {
      // Loop through all editable data
      for (let key in this.modalData.content) {
        toEdit[key] = { data: this.modalData.content[key] }
      }
    } else {
      console.log("ModalEditContent: editable data is inappropriate - provide it as '' or { key: value, ... }")
    }

    this.contentToEdit = toEdit */
  },

  computed: {
    editables() {
      let type = dataType(this.contentToEdit)
      let toEdit = {}

      // Populate toEdit with data depending on it's type
      if (type === 'string') {
        toEdit = { data: this.contentToEdit }
      } else if (type === 'object') {
        // Loop through all editable data
        for (let key in this.contentToEdit) {
          let ifImage = isImage.test(this.contentToEdit[key])
          let componentType = ifImage
            ? 'dropzone'
            : 'base-input'

          toEdit[key] = {
            data: this.contentToEdit[key],
            is: componentType
          }
        }
      } else {
        console.log("ModalEditContent: editable data is inappropriate - provide it as '' or { key: value, ... }")
      }

      return toEdit

      //let editables = JSON.parse(JSON.stringify(this.contentToEdit))

      // Determine whether data is about image or not
      /* for (let editable in editables) {
        let ifImage = isImage.test(editables[editable].data)
        let componentType = ifImage
          ? 'dropzone'
          : 'base-input'

        editables[editable].is = componentType
      }

      return editables */
    }
  },

  methods: {
    emitFile(file) {
      this.$set(this.images, file.name, file)
    },

    save() {
      // Save edited data to store
      this.$store.dispatch('SET_STATE', {
        data: this.contentToEdit,
        path: 'content.' + this.modalData.path
      }, null, true)

      //TALLETA EDITOITU DATA KANTAAN
      //JOS KUVIA, TALLETA NE VASTAAVAAN SIJAINTIN STORAGEEN

      // Save edited data to database
      // ...

      // In case of images, save files to storage
      // ...

      //this.$emit('close-modal')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-edit-content {
}
</style>
