<template>
  <div
    id="g-recaptcha"
    :class="classing"
    :data-sitekey="sitekey"
  ></div>
</template>

<script>
// reCaptcha, see: https://developers.google.com/recaptcha/docs/display
// For admin, see: https://www.google.com/recaptcha/admin
// About reCaptcha, see: https://stackoverflow.com/questions/45754869/way-to-skip-recaptcha-images-challenge

export default {
  name: 'recaptcha',

  props: {
    disabled: Boolean // For styling
  },
  
  mounted () {
    // See: https://developers.google.com/recaptcha/docs/verify
    // Render the reCAPTCHA widget, see: index.html
    // Note: Each reCAPTCHA user response token is valid for two minutes,
    // and can only be verified once to prevent replay attacks.
    // If a new token is needed, re-run the reCAPTCHA verification.
    if (window.grecaptcha) {
      const widget = window.grecaptcha.render('g-recaptcha', {
        sitekey: this.sitekey,
        // Executed when user solves the reCAPTCHA.
        callback: (responseToken) => {
          const xhr = new XMLHttpRequest() // To intereact with server.
          const URL = 'https://us-central1-constlet.cloudfunctions.net/recaptchaJuusoheinocom'
          const data = {
            token: responseToken
          }
          
          // Initialize a request.
          xhr.open('POST', URL)
          // Communicate with server what kind of data is sent.
          xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
          xhr.send(JSON.stringify(data))
          // An event handler called whenever XMLHttpRequest.readystate changes.
          xhr.onreadystatechange = async () => {
            if (xhr.readyState === XMLHttpRequest.DONE) { // XMLHttpRequest.DONE === 4
              const response = JSON.parse(xhr.responseText)
              if (response.success) {
                this.$emit('verified', true)
              }
            }
          }
        },
        // Executed when the reCAPTCHA response expires and user needs to re-verify.
        'expired-callback': () => {
          this.$emit('verified', false)
        }
      })
    }
  },

  computed: {
    sitekey() {
      return this.$app.isLoading()
        ? false
        : this.$store.state.content.meta.recaptcha.sitekey
    },

    classing() {
      return {
        disabled: this.disabled
      }
    }
  },

  methods: {
    // If component needs to be controlled from the parent component:

    execute () {
      window.grecaptcha.execute(this.widget)
    },

    reset () {
      window.grecaptcha.reset(this.widget)
    }
  }
}
</script>

<style lang="scss" scoped>
#g-recaptcha {
  &.disabled { @extend %input--disabled; }
}
</style>