const cali = { coords: { latitude: 3.4516, longitude: -76.532, accuracy: 10 }, timestamp: Date.now() }

describe('Rastreo', () => {
  it('abre el mapa en la ubicacion actual', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((success) => success(cali))
        cy.stub(win.navigator.geolocation, 'watchPosition').callsFake((success) => success(cali))
      },
    })
    cy.contains('Mapa y rastreo').click()
    cy.get('.leaflet-container').should('be.visible')
  })
})
