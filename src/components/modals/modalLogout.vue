<template>
  <div class="modal-logout">
    MODAALI

    <!-- <h3 class="font-10 bold mb-6">Logout</h3> -->
    <!-- <base-title size="l" :highlighted="true">Logout</base-title>
    <br>
    <p>Are you sure?</p>
    <br><br> -->
    <!-- <button @click="logout" class="btn block mx-auto">logout</button> -->
    <!-- <base-button @click="logout">logout</base-button> -->
  </div>
</template>

<script>
export default {
  name: "modalLogout",

  methods: {
    /* logout () {
      this.$store.dispatch('auth/logout')
      this.$store.dispatch('modals/SET_MODAL', '')
      this.$router.push('/')
    } */
  }
};
</script>

<style lang="scss" scoped>
.modal-logout {
}
</style>
