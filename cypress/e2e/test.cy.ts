describe('Pantalla inicial', () => {
  it('pide iniciar sesión cuando no hay sesión guardada', () => {
    cy.visit('/')
    cy.contains('ion-title', 'Iniciar sesión')
  })
})
