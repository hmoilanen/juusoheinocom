<template>
  <base-view class="view-contact" content-padding-y="y">
    <app-content-wrapper max-width="paragraph">

        <editable-content path="contact.main" #default="{ content }">
          <app-title class="gsap--view-contact--title" :m-b="16">
            <template #default>
              {{ content[`title-${locale}`] }}
            </template>
            <template #icon>
              <contact-success-animation v-if="submitted"></contact-success-animation>
            </template>
          </app-title>
          <app-text
            v-if="!submitted"
						class="gsap--view-contact--title"
            :m-b="16"
          >{{ content[`text-${locale}`] }}</app-text>
        </editable-content>
        
        <form v-if="!submitted" @submit.prevent>
          <base-spacer :size="15">
            <base-input
							class="gsap--view-contact--form"
              v-model="inputName"
              :required="true"
              :label="formContent.name.label[locale]"
              :placeholder="formContent.name.placeholder[locale]"
              :disabled="submitting"
            ></base-input>
            <base-input
							class="gsap--view-contact--form"
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
							class="gsap--view-contact--form"
              :value="budgetCategories"
              @itemSelected="budgetSelected"
              :label="formContent.budget.label[locale]"
              :placeholder="formContent.budget.placeholder[locale]"
              :disabled="submitting"
            ></base-dropdown>
            <base-textarea
							class="gsap--view-contact--form"
              v-model="inputDescription"
              :required="true"
              :label="formContent.description.label[locale]"
              :placeholder="formContent.description.placeholder[locale]"
              :disabled="submitting"
              :maxLength="1000"
              :rows="4"
            ></base-textarea>

            <recaptcha
							class="gsap--view-contact--form"
              ref="recaptcha"
              @verified="verify"
              :disabled="submitting"
            ></recaptcha>

						<div class="gsap--view-contact--form">
							<base-button
								@click.prevent="submit"
								:disabled="!allowSubmit"
								:loading="!allowSubmit && submitting"
								size="l"
							>{{ formContent.submit[locale] }}</base-button>
							<app-text v-if="submitted === false && !submitting" m-t="m">{{ this.mainFeedback }}</app-text>
						</div>
          </base-spacer>
        </form>
        <div v-else>
          <app-text>{{ this.mainFeedback }}</app-text>
        </div>
    </app-content-wrapper>
  </base-view>
</template>

<script>
import ContactSuccessAnimation from '@/components/ContactSuccessAnimation'
import AppContentWrapper from '@/components/AppContentWrapper'
import AppTitle from '@/components/AppTitle'
import AppText from '@/components/AppText'
import EditableContent from '@/components/EditableContent'
import Recaptcha from '@/components/Recaptcha'
import { mapState } from 'vuex'
import { validateEmail } from '@/utils/regex'
import { genericTimeStamp } from '@/utils/time'
import { gsap } from 'gsap'

const tl = gsap.timeline({ paused: true })

export default {
  name: 'ViewContact',

  components: {
    ContactSuccessAnimation,
    AppContentWrapper,
    AppTitle,
    AppText,
    EditableContent,
    Recaptcha
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
      submitted: null // false -> error, true -> success, see: this.submit
    }
	},
	
	mounted() {
		tl
			.from('.gsap--view-contact--title', {
				stagger: 0.2,
				duration: 0.5,
				y: 70,
				opacity: 0,
				ease: 'Power3.out'
			}, 0.25)
			.from('.gsap--view-contact--form', {
				stagger: 0.2,
				duration: 0.8,
				y: 70,
				autoAlpha: 0,
				ease: 'power2.out'
			}, 1.4)
	},

	watch: {
		'$store.state.ui.curtainDisplayed': {
			immediate: true,
			handler(newValue, oldValue) {
				if (newValue === false) {
					tl.restart() // For playing the animation also when returned to the page
				}
			}
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
        handled: false // For sorting
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