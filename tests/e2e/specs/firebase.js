describe('Some Firebase Test', () => {
  it('Adds document to "tests" collection of Firestore', () => {
    cy.callFirestore('add', 'tests', { some: 'value' })
	})
})