import { nearbyPlaces, shouldRefreshAddress } from './places'

const CALI = { lat: 3.4516, lng: -76.532 }

const results = [
  { formatted: 'Droguería Comfandi, Avenida 6 Norte, Cali', geometry: { lat: 3.4601, lng: -76.5305 } },
  { formatted: 'Comuna 3, Cali ciudad, Colombia', geometry: { lat: 3.45, lng: -76.535 } },
  { formatted: 'Droguería, Carrera 5, Cali', geometry: { lat: 3.4520, lng: -76.5321 } },
]

test('los lugares cercanos quedan del más cercano al más lejano, con nombre y dirección separados', () => {
  const places = nearbyPlaces(results, CALI, 'drogueria')
  expect(places.map(place => place.name)).toEqual(['Droguería', 'Droguería Comfandi'])
  expect(places[0].address).toBe('Carrera 5, Cali')
  expect(places[0].distance).toBeLessThan(places[1].distance)
})

test('descarta resultados que no son el lugar buscado, como un barrio entero', () => {
  expect(nearbyPlaces(results, CALI, 'Droguería').map(place => place.name)).not.toContain('Comuna 3')
  expect(nearbyPlaces(results, CALI, 'banco')).toEqual([])
})

test('la dirección se vuelve a pedir solo la primera vez o tras moverse 150 m', () => {
  expect(shouldRefreshAddress(null, CALI)).toBe(true)
  expect(shouldRefreshAddress(CALI, { lat: 3.4520, lng: -76.532 })).toBe(false)
  expect(shouldRefreshAddress(CALI, { lat: 3.4535, lng: -76.532 })).toBe(true)
})
