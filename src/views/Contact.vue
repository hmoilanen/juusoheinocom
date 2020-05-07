<template>
  <base-view class="view-contact">
    
    <base-wrapper max-width="paragraph">
      <base-form v-if="!isLoading">

        <base-button @click.prevent="toggeloi">toggeloi</base-button>
        <br>

        <base-spacer :size="14">
          <!-- <base-input
            v-model="inputName"
            :required="true"
            label="your name"
            placeholder="you are wonderful :)"
            :feedback="feedbackInputName"
            :disabled="submitting"
          ></base-input> -->

          <base-input
            v-model="inputName"
            :required="true"
            :label="content.name.label[locale]"
            :placeholder="content.name.placeholder[locale]"
            :disabled="submitting"
          ></base-input>
          <base-input
            v-model="inputEmail"
            type="email"
            :required="true"
            :label="content.email.label[locale]"
            :placeholder="content.email.placeholder[locale]"
            :feedback="content.email.feedback[locale]"
            :disabled="submitting"
          ></base-input>
          <base-dropdown
            :value="content.budget.values"
            :label="content.budget.label[locale]"
            :placeholder="content.budget.placeholder[locale]"
            :disabled="submitting"
          ></base-dropdown>
          <base-textarea
            v-model="inputDescription"
            :required="true"
            :label="content.description.label[locale]"
            :placeholder="content.description.placeholder[locale]"
            :disabled="submitting"
            :maxLength="1000"
          ></base-textarea>
          <base-button
            @click.prevent="submit"
            :disabled="!allowSubmit"
            size="l"
          >{{ content.submit[locale] }}</base-button>
          <base-feedback v-if="feedbackSubmit">{{ this.content.completed[locale] }}</base-feedback>
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
      //feedbackInputName: 'jotain pientä valitettavaa aina löytyy',
      feedbackInputEmail: 'fsdffsf',
      //feedbackInputBudget: 'fsfdsfs',
      //feedbackInputDescription: 'sdfsfsd',
      feedbackSubmit: '',
      submitting: false
    }
  },

  computed: {
    isLoading() {
      return this.$store.state.app.isLoading
    },

    content() {
      return this.$store.state.content.text[this.$route.name]
    },

    locale() {
      return this.$store.state.app.locale
    },

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
    },

    toggeloi() { //POISTUU!!!
      let newLocale = this.locale === 'en' ? 'fi' : 'en'
      this.$store.dispatch('SET_STATE', { data: newLocale, path: 'app.locale' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>