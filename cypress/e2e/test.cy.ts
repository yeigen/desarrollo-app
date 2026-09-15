describe('Pantalla inicial', () => {
  it('muestra el titulo de la app', () => {
    cy.visit('/')
    cy.contains('ion-title', 'Tareas')
  })
})
