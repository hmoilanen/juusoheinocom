<template>
  <div class="modal-add-content">
    <base-title size="l" mB="xl">Add content</base-title>

    <base-list :gap="10" :mB="30">
      <base-button>add content</base-button>
      <dropzone></dropzone>
      <base-textarea
        v-model="contentText"
        label="description"
        placeholder="..."
      ></base-textarea>
      <base-input
        v-model="contentTitle"
        label="title"
        placeholder="..."
      ></base-input>
    </base-list>
    
    <base-button @click="confirmAdd">Confirm</base-button>
  </div>
</template>

<script>
export default {
  name: 'modalAddContent',

  components: {
    dropzone: () => import('@/components/dropzone')
  },

  props: ['modalData'],

  data() {
    return {
      contentTitle: '',
      contentText: '',
      contentImage: null,
    }
  },

  methods: {
    confirmAdd() {
      /* this.$store.dispatch('SET_STATE', {
        data: this.editedContent,
        path: this.modalData.path
      }) */
      console.log('tähän vähän koodia');
      
      
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-add-content {
}
</style>
