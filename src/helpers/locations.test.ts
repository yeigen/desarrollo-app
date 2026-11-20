import { formatDistance } from './format'
import { distanceInMeters, nearbyLocations, type StoreLocation } from './locations'

const origin = { lat: 3.4516, lng: -76.532 }

const location = (id: string, store_id: string, lat: number, lng: number): StoreLocation => ({
  id,
  store_id,
  name: id,
  address: null,
  lat,
  lng,
})

test('ordena las sedes de la más cercana a la más lejana y deja fuera las tiendas desactivadas', () => {
  const locations = [
    location('lejana', 'exito', 3.38, -76.54),
    location('apagada', 'd1', 3.4517, -76.532),
    location('cercana', 'jumbo', 3.455, -76.53),
    location('media', 'exito', 3.43, -76.52),
  ]

  const result = nearbyLocations(locations, origin, (store) => store !== 'd1')

  expect(result.map((item) => item.id)).toEqual(['cercana', 'media', 'lejana'])
})

test('mide la distancia real entre dos puntos', () => {
  const oneDegreeNorth = { lat: origin.lat + 1, lng: origin.lng }

  expect(distanceInMeters(origin, origin)).toBe(0)
  expect(distanceInMeters(origin, oneDegreeNorth)).toBeCloseTo(111195, -2)
})

test('muestra metros bajo un kilómetro y kilómetros desde ahí', () => {
  expect(formatDistance(350)).toBe('350 m')
  expect(formatDistance(2440)).toBe('2,4 km')
})
