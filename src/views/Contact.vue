<template>
  <base-view class="view-contact">
    <base-wrapper max-width="paragraph">

      <template v-if="!isLoading">
        <editable-content
          v-if="!$app.isLoading()"
          path="contact.main"
          #default="{ content }"
        >
          <base-title size="xl">{{ content[`title-${$app.locale()}`] }}</base-title>
          <base-text m-b="l">{{ content[`text-${$app.locale()}`] }}</base-text>
        </editable-content>
        
        <base-form v-if="!submitted">
          <base-spacer :size="14">
            <base-input
              v-model="inputName"
              :required="true"
              :label="formContent.name.label[locale]"
              :placeholder="formContent.name.placeholder[locale]"
              :disabled="submitting"
            ></base-input>
            <base-input
              v-model="inputEmail"
              type="email"
              :required="true"
              :label="formContent.email.label[locale]"
              :placeholder="formContent.email.placeholder[locale]"
              :feedback="emailFeedback"
              :disabled="submitting"
            ></base-input>
            <base-dropdown
              :value="budgetCategories"
              @itemSelected="budgetSelected"
              :label="formContent.budget.label[locale]"
              :placeholder="formContent.budget.placeholder[locale]"
              :disabled="submitting"
              :clear="submitted"
            ></base-dropdown>
            <base-textarea
              v-model="inputDescription"
              :required="true"
              :label="formContent.description.label[locale]"
              :placeholder="formContent.description.placeholder[locale]"
              :disabled="submitting"
              :maxLength="1000"
              :rows="4"
            ></base-textarea>

            <base-button
              @click.prevent="submit"
              :disabled="!allowSubmit"
              :loading="!allowSubmit && submitting"
              size="l"
            >{{ formContent.submit[locale] }}</base-button>
            <!-- <base-feedback v-if="submitted !== null">{{ this.mainFeedback }}</base-feedback> -->
          </base-spacer>
        </base-form>
        <base-feedback v-else size="l">{{ this.mainFeedback }}</base-feedback>        
      </template>

    </base-wrapper>
  </base-view>
</template>

<script>
// reCaptcha, see: https://developers.google.com/recaptcha/docs/display

import editableContent from '@/components/editableContent'
import { mapState } from 'vuex'
import { validateEmail } from '@/utils/regex'
import { genericTimeStamp } from '@/utils/time'

export default {
  name: 'viewContact',

  components: { editableContent },

  data() {
    return {
      inputName: '',
      inputEmail: '',
      inputBudget: '',
      inputDescription: '',
      invalidEmail: false,
      submitting: false,
      submitted: null, // false -> error, true -> success, see: this.submit()
      clear: false
    }
  },

  computed: {
    ...mapState('app', ['isLoading', 'locale']),

    formContent() {
      let { main, ...formContent } = this.$store.state.content[this.$route.name]
      return formContent
    },

    budgetCategories() {
      let values = this.formContent.budget.values
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
      if (this.inputName && this.inputEmail && this.inputDescription && !this.submitting) {
        return true
      } else return false
    },

    emailFeedback() {
      return this.invalidEmail
        ? this.formContent.email.feedback[this.locale]
        : ''
    },

    mainFeedback() {
      let status
      if (this.submitted === false) { status = 'error' }
      else if (this.submitted) { status = 'success' }

      return this.formContent.completed[status][this.locale]
    }
  },

  methods: {
    budgetSelected(budget) {
      this.inputBudget = budget
    },

    async submit() {
      if (!validateEmail.test(this.inputEmail)) {
        this.invalidEmail = true
        return
      }

      const contact = {
        name: this.inputName,
        email: this.inputEmail,
        budget: this.inputBudget || null,
        description: this.inputDescription,
        time: genericTimeStamp(),
        handled: false // for sorting
      }

      this.submitting = true
      await this.$api.setDocument('contacts', null, contact)
      .then(() => {
        setTimeout(() => {
        
          this.sendEmail(contact)
          this.submitting = false
          this.submitted = true
          this.inputName = ''
          this.inputEmail = ''
          this.inputBudget = ''
          this.inputDescription = ''
          this.invalidEmail = false
        }, 3000);
      })
      .catch(error => {
        this.submitting = false
        this.submitted = false
      })
    },

    sendEmail(contact) {
      const email = this.$store.state.content.meta.email
      const data = {
        to: email.to || 'juuso.ville.henrikki@gmail.com',
        from: 'juusoheino.com',
        subject: 'juusoheino.com - UUSI YHTEYDENOTTO',
        html: `<h3>Uusi yhteydenotto</h3>
              <ul>
                <li>nimi: ${contact.name}</li>
                <li>email: ${contact.email}</li>
                <li>tarve/idea: ${contact.description}</li>
                <li>budjetti: ${contact.budget || '-'}</li>
                <li>aika: ${contact.time}</li>
              </ul>`
      }

      return new Promise((resolve, reject) => {
        const xmlhttp = new XMLHttpRequest() // to interact with server
        const cloudSenderURL = email.cloudSenderURL || 'https://us-central1-constlet.cloudfunctions.net/emailMessage'

        // Initialize a request
        xmlhttp.open('POST', cloudSenderURL)
        // Tell the server what kind of data is sent
        xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xmlhttp.send(JSON.stringify(data))
        resolve()
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