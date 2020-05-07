<template>
  <base-view class="view-contact">
    
    <base-wrapper max-width="paragraph">
      <base-form v-if="!isLoading">

        <!-- POISTUU!!! -->
        <base-button @click.prevent="toggeloi">toggeloi</base-button><br>
        <!-- POISTUU!!! -->

        <base-spacer :size="14">
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
            :value="budgetCategories"
            @itemSelected="budgetSelected"
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
          <base-feedback v-if="submitted !== null">{{ this.mainFeedback }}</base-feedback>
        </base-spacer>
      </base-form>
    </base-wrapper>
  </base-view>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'viewContact',

  data() {
    return {
      inputName: '',
      inputEmail: '',
      inputBudget: '',
      inputDescription: '',
      submitting: false,
      submitted: null // false -> error, true -> success, see: this.submit()
    }
  },

  computed: {
    ...mapState('app', ['isLoading', 'locale']),

    content() {
      return this.$store.state.content.text[this.$route.name]
    },

    budgetCategories() {
      let values = this.content.budget.values
      let categories = []

      for (let i = 0; i < values.length; i++) {
        let currency = this.locale === 'en'
          ? '$'
          : '€'
        let max = i === values.length - 1
          ? ''
          : values[i + 1]
        categories.push(`${currency}${values[i]} - ${max}`)
      }
      return categories
    },

    allowSubmit() {
      if (this.inputName && this.inputEmail && this.inputDescription) {
        return true
      } else return false
    },

    mainFeedback() {
      let status
      if (this.submitted === false) { status = 'error' }
      else if (this.submitted) { status = 'success' }

      return this.content.completed[status][this.locale]
    }
  },

  methods: {
    budgetSelected(budget) {
      this.inputBudget = budget
    },

    async submit() {
      const contact = {
        name: this.inputName,
        email: this.inputEmail,
        budget: this.inputBudget || null,
        description: this.inputDescription
      }

      this.submitting = true
      await this.$api.setDocument('contacts', null, contact)
      .then(response => {
        //console.log(response);
        this.submitting = false
        this.submitted = true
        this.inputName = ''
        this.inputEmail = ''
        this.inputBudget = ''
        this.inputDescription = ''
      })
      .catch(error => {
        this.submitting = false
        this.submitted = false
      })
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