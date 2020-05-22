<template>
  <div class="modal-login" :class="classing">
    <base-title size="l" mB="xl">Login</base-title>
    <base-input v-model="inputEmail" label="email" mB="m"></base-input>
    <base-input v-model="inputPassword" type="password" label="password" mB="xl"></base-input>
    <base-button @click="login">submit</base-button>

    <base-loader v-if="loading" :fulfill="true"></base-loader>
  </div>
</template>

<script>
export default {
  name: 'modalLogin',

  data() {
    return {
      inputEmail: '',
      inputPassword: '',
      loading: false
    }
  },

  methods: {
    async login() {
      this.loading = true
      let result = await this.$api.login(this.inputEmail, this.inputPassword)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
        alert('Wrong email or password.')
      })
      // await this.$api.getDefer('logging') // this code waits logging as well
      this.loading = false
      this.$emit('close-modal')
    }
  },

  computed: {
    classing() {
      return {
        loading: this.loading
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-login {
  &.loading > *:not(.loader) {
    opacity: 0.2;
    pointer-events: none;
  }
  
  .loader {
    @extend %absolute-0000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>