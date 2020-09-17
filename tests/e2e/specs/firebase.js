// For testing the connection and functionality of Firebase

describe('Generic Firebase Tests', () => {
	const mockFileName = 'CY-test'

  it('Adds document to "tests" collection of Firestore', () => {
		cy.callFirestore('get', 'tests')
			.then(resBefore => {
				const resBeforeLength = resBefore ? resBefore.length : 0

				cy.log('response:', resBeforeLength)

				cy.callFirestore('set', `tests/${mockFileName}`, { some: 'value' })

				cy.callFirestore('get', 'tests')
					.then(resAfter => {
						cy.log('response:', resAfter.length)

						expect(resAfter.length).to.be.greaterThan(resBeforeLength)
					})
			})
	})

  it('Deletes a document from "tests" collection of Firestore', () => {
		const opts = { recursive: true }
    cy.callFirestore('delete', `tests/${mockFileName}`)
	})
})