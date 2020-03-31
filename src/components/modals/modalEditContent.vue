<template>
  <div class="modal-edit-content">
    <base-title size="l" mB="xl">Edit content</base-title>
    <base-input v-model="editedContent" mB="l"></base-input>
    <base-button @click="confirmEdit">Confirm edit</base-button>
  </div>
</template>

<script>
export default {
  name: 'modalEditContent',

  props: ['modalData'],

  data() {
    return {
      editedContent: ''
    }
  },

  created() {
    this.editedContent = this.modalData.text
  },

  methods: {
    confirmEdit() {
      this.$store.dispatch('SET_STATE', {
        data: this.editedContent,
        path: this.modalData.path
      })
      // RIKU! HEITÄ TÄHÄN VÄHÄN TAIKAKOOOODIA!
      // RIKU! HEITÄ TÄHÄN VÄHÄN TAIKAKOOOODIA!
      // RIKU! HEITÄ TÄHÄN VÄHÄN TAIKAKOOOODIA!
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-edit-content {
}
</style>
