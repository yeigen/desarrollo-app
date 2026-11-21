describe('Buscador de GIFs', () => {
  it('abre la app con el buscador', () => {
    cy.visit('/')
    cy.contains('Buscador de GIFs')
    cy.get('ion-searchbar').should('be.visible')
  })
})
