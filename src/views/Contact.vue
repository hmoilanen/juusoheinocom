<template>
  <base-view class="view-contact">
    
    <base-wrapper max-width="paragraph">
      <base-form>
        <base-spacer :size="14">
          <base-input
            v-model="inputName"
            :required="true"
            label="your name"
            placeholder="you are wonderful :)"
            :feedback="feedbackInputName"
            :disabled="submitting"
          ></base-input>
          <base-input
            v-model="inputEmail"
            type="email"
            :required="true"
            label="...and your email"
            placeholder="@lifeIsBeautiful"
            :feedback="feedbackInputEmail"
            :disabled="submitting"
          ></base-input>
          <!-- TÄHÄN VÄLIIN TULEE DROPDOWNI ! -->
          <base-textarea
            v-model="inputDescription"
            :required="true"
            label="description"
            placeholder="word is free"
            :feedback="feedbackInputDescription"
            :disabled="submitting"
            :maxLength="1000"
          ></base-textarea>
          <base-button
            @click="submit"
            :disabled="!allowSubmit"
            size="l"
          >send</base-button>
          <base-feedback v-if="feedbackSubmit">{{ this.feedbackSubmit }}</base-feedback>
        </base-spacer>
      </base-form>
    </base-wrapper>
  </base-view>
</template>

<script>
export default {
  name: 'viewContact',

  data() {
    return {
      inputName: '',
      inputEmail: '',
      inputBudget: '',
      inputDescription: '',
      feedbackInputName: 'jotain pientä valitettavaa aina löytyy',
      feedbackInputEmail: 'fsdffsf',
      feedbackInputBudget: '',
      feedbackInputDescription: 'sdfsfsd',
      feedbackSubmit: '',
      submitting: false
    }
  },

  computed: {
    allowSubmit() {
      if (this.inputName && this.inputEmail && this.inputDescription) {
        return true
      } else return false
    }
  },

  methods: {
    submit() {
      this.submitting = true

      setTimeout(() => {
        this.submitting = false
        this.feedbackSubmit = 'Your contact has been sent successfully. I\'ll get back to you asap!'
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>