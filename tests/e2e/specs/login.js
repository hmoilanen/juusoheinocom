// https://docs.cypress.io/api/introduction/api.html

describe('Login / logout', () => {
	beforeEach(() => {
		cy.logout()
		cy.visit('https://juusoheino.com')
		cy.get('.CY--app-curtain--reset').click()
		cy.get('.CY--login--juusoheino').click()
		cy.contains('Login')
	})

  it('Login modal opens and closes manually', () => {
		cy.contains('close').click()
		cy.contains('Login').should('not.exist')
	})

  it('Manual login works with Firebase', () => {
		cy.login()
	})

	it('Login prevented with wrong credentials', () => {		
		cy.get('#modal-login--email').type('test')
		cy.get('#modal-login--password').type('test')
		cy.get('#modal-login--submit').click()

		cy.contains('Wrong email or password')
	})

  it('Login enables editing of content straight from UI', () => {
		cy.get('.is-editable').should('not.exist')

		cy.window().should('have.property', '__store__')
		cy.window().then(win => {
			win.__store__.dispatch('SET_STATE', { data: true, path: 'app.isLogged' })
		})

		cy.get('.is-editable').should('exist')
	})
})
