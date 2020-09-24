<template>
  <div class="modal-login" :class="classing">
    <base-title size="l" mB="xl">Login</base-title>
		<base-spacer :size="10">
			<base-input
				id="modal-login--email"
				v-model="inputEmail"
				label="email"
				mB="m"
			></base-input>
			<base-input
				id="modal-login--password"
				v-model="inputPassword"
				type="password"
				label="password"
				mB="xl"
			></base-input>
			<base-feedback v-if="!loading && feedback">{{ feedback }}</base-feedback>
			<base-button
				id="modal-login--submit"
				@click="login"
			>submit</base-button>
		</base-spacer>

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
			loading: false,
			feedback: ''
    }
  },

  methods: {
    async login() {
      this.loading = true
      let result = await this.$api.login(this.inputEmail, this.inputPassword)
      .then(response => {
				console.log(response)
				this.feedback = ''
      	this.$emit('close-modal')
				this.loading = false
      })
      .catch(err => {
        console.log(err)
				this.feedback = 'Wrong email or password!'
				this.loading = false
      })
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