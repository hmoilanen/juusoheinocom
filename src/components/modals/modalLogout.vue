<template>
  <div class="modal-logout">
    <base-title size="l" mB="xl">Logout</base-title>
    <base-text size="l" mB="xl">Are you sure?</base-text>
    <base-button @click="logout">logout</base-button>
  </div>
</template>

<script>
export default {
  name: 'modalLogout',

  methods: {
    async logout () {
      await this.$api.logout()
      this.$store.dispatch('modals/SET_MODAL', '')
      //this.$router.push('/')
      /* .then(res => {
      })
      .catch(err => {
        console.log(err)
        alert('Something went wrong logging out')
      }) */
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-logout {
}
</style>
