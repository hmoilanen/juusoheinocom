<template>
  <base-view class="view-contact">
    
    <base-wrapper max-width="paragraph">
      <base-form>
        <base-spacer :size="16">
          <base-input
            v-model="inputName"
            :required="true"
            label="your name"
            placeholder="you are wonderful :)"
            :feedback="feedbackInputName"
          ></base-input>
          <base-input
            v-model="inputEmail"
            :required="true"
            label="...and your email"
            placeholder="@lifeIsBeautiful"
            :feedback="feedbackInputEmail"
            :disabled="true"
          ></base-input>
          <base-textarea
            v-model="inputDescription"
            :required="true"
            label="description"
            placeholder="word is free"
            :feedback="feedbackInputDescription"
          ></base-textarea>
          <base-button
            @click="submit"
            :disabled="!allowSubmit"
            size="l"
          >send</base-button>
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
      feedbackInputEmail: '',
      feedbackInputBudget: '',
      feedbackInputDescription: '',
      feedbackSubmit: '',
      submitting: false,
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
        this.feedbackSubmit = 'Your contact has been sent successfully'
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>