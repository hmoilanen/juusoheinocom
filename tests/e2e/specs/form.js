describe('Contact form functionality', () => {
	beforeEach(() => {
		cy.visit('/contact')
		cy.wait(2000)
	})

	it('The submit button of form is disabled in the beginning', () => {
		cy.get('[data-test="form--submit"]', { timeout: 10 * 1000 })
			.should('exist')
			.should('have.class', 'disabled')
	})

	it('Filling the form deficiently wont\'t enable submit', () => {
		// Requirement: the name, email and description fields.
		// Recaptcha is stubbed from Contact.vue due to Cypress' problems with iframes.
		cy.get('[data-test="form--name"]', { timeout: 10 * 1000 })
			.should('exist')
			.type('test')
		cy.get('[data-test="form--email"]').type('test@mail.com')

		cy.get('[data-test="form--submit"]')
			.should('exist')
			.should('have.class', 'disabled')
	})

	it('Filling the form appropriately enables submit', () => {
		// Requirement: the name, email and description fields.
		// Recaptcha is stubbed from Contact.vue due to Cypress' problems with iframes.
		cy.get('[data-test="form--name"]', { timeout: 10 * 1000 })
			.should('exist')
			.type('test')
		cy.get('[data-test="form--email"]').type('test@mail.com')
		cy.get('[data-test="form--description"]').type('test')

		cy.get('[data-test="form--submit"]').click()
		
		cy.get('.view-contact')
			.its('form')
			.should('not.exist')
	})

	it('Filling the form with incorrect email wont\'t enable submit', () => {
		cy.get('[data-test="form--name"]', { timeout: 10 * 1000 })
			.should('exist')
			.type('test')
		// Use improper email address
		cy.get('[data-test="form--email"]').type('testmail')
		cy.get('[data-test="form--description"]').type('test')

		cy.get('[data-test="form--submit"]').click()

		cy.get('[data-test="form--"]')
			.contains('email is invalid')
	})
})