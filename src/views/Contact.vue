<template>
  <base-view class="view-contact" content-padding-y="y">
    <!-- <base-wrapper max-width="paragraph"> -->
    <app-content-wrapper max-width="paragraph">
      <template v-if="!isLoading">
        <editable-content
          v-if="!$app.isLoading()"
          path="contact.main"
          #default="{ content }"
        >
          <app-title :m-b="16">
            <template #default>
              {{ content[`title-${$app.locale()}`] }}
            </template>
            <template #icon>
              <contact-success-animation v-if="submitted"></contact-success-animation>
            </template>
          </app-title>
          <app-text
            v-if="!submitted"
            :size="8"
            :m-b="16"
          >{{ content[`text-${$app.locale()}`] }}</app-text>
        </editable-content>
        
        <base-form v-if="!submitted">
          <base-spacer :size="15">
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
              ref="budget"
              :value="budgetCategories"
              @itemSelected="budgetSelected"
              :label="formContent.budget.label[locale]"
              :placeholder="formContent.budget.placeholder[locale]"
              :disabled="submitting"
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

            <recaptcha
              ref="recaptcha"
              @verified="verify"
              :disabled="submitting"
            ></recaptcha>

            <base-button
              @click.prevent="submit"
              :disabled="!allowSubmit"
              :loading="!allowSubmit && submitting"
              size="l"
            >{{ formContent.submit[locale] }}</base-button>
          </base-spacer>
        </base-form>
        <div v-else>
          <!-- <base-flex center="x">
            <contact-success-animation @animation-completed="jou"></contact-success-animation>
          </base-flex> -->
          <app-text :size="8">{{ this.mainFeedback }}</app-text>
        </div>
      </template>
    </app-content-wrapper>


    <!-- </base-wrapper> -->
  </base-view>
</template>

<script>
import contactSuccessAnimation from '@/components/contactSuccessAnimation'
import appContentWrapper from '@/components/appContentWrapper'
import appTitle from '@/components/appTitle'
import appText from '@/components/appText'
import editableContent from '@/components/editableContent'
import recaptcha from '@/components/recaptcha'
import { mapState } from 'vuex'
import { validateEmail } from '@/utils/regex'
import { genericTimeStamp } from '@/utils/time'

export default {
  name: 'viewContact',

  components: {
    contactSuccessAnimation,
    appContentWrapper,
    appTitle,
    appText,
    editableContent,
    recaptcha
  },

  data() {
    return {
      inputName: '',
      inputEmail: '',
      inputBudget: '',
      inputDescription: '',
      invalidEmail: false,
      recaptchaVerified: false,
      submitting: false,
      submitted: null // false -> error, true -> success, see: this.submit()
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
      if (this.inputName && this.inputEmail && this.inputDescription && this.recaptchaVerified && !this.submitting) {
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
    jou(value) {
      console.log('valmis', value);
    },

    verify(verified) {
      this.recaptchaVerified = verified
    },

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
          this.$refs.budget.clear()
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
        // Communicate with server what kind of data is sent
        xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xmlhttp.send(JSON.stringify(data))
        resolve()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$view-contact--color-hl: $app-color--hl;
$saissi: 50px;
.view-contact {
  .ikonit {
    width: $saissi;
    height: $saissi;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    //background: pink;
  }
  .base-icon {
    position: absolute;
    width: $saissi;
    height: $saissi;
    color: transparent;
    stroke: $view-contact--color-hl;
    stroke-width: 5px;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: jooo 3s ease forwards 2s;

    @keyframes jooo {
      to {
        stroke-dashoffset: 0;
      }
    }

    &.eka { stroke-width: 10px; }
    &.toka {
      transform: rotate(-45deg);
      transform-origin: calc(19.67 / 50 * 100%) calc(35.66 / 50 * 100%);
    }
    
  }
}
</style>