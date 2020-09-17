// For testing the connection and functionality of Firebase

describe('Generic Firebase Tests', () => {
  it('Adds document to "tests" collection of Firestore', () => {
		cy.callFirestore('get', 'tests')
			.then(resBefore => {
				cy.log('response:', resBefore.length)

				cy.callFirestore('add', 'tests', { some: 'value' })

				cy.callFirestore('get', 'tests')
					.then(resAfter => {
						cy.log('response:', resAfter.length)

						expect(resAfter.length).to.be.greaterThan(resBefore.length)
					})
			})
	})

  /* it('Deletes a document from "tests" collection of Firestore', () => {
    cy.callFirestore('add', 'tests', { some: 'value' })
	}) */
})