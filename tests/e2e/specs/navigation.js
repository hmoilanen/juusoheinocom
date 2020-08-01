describe('Navigation', () => {
	beforeEach(() => {
		cy.visit('/')
		cy.get('.app-curtain--reset').click()
	})

  it('opens navigation menu and closes it correctly', () => {
		cy.get('.nav-top-toggler')
			.click()
		
		cy.get('.nav-top > .menu')
			.should('exist')
		
		cy.get('.nav-top-toggler')
			.click()

		cy.get('.nav-top > .menu')
			.should('not.exist')
	})

	it('navigation menu\'s link trigger click and hides it', () => {
		cy.get('.nav-top-toggler')
			.click()
		
		cy.get('.nav-top-link')
			.first()
			.click()

		cy.get('.nav-top > .menu')
			.should('not.exist')
	})
})