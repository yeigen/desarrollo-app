import { boundsAround, distanceInMeters, pathLengthInMeters, speedInKmh } from './geo'

const CALI = { lat: 3.4516, lng: -76.532 }
const ONE_KM_NORTH = { lat: 3.460593, lng: -76.532 }

test('un grado de latitud hacia el norte mide unos 111 km', () => {
  expect(distanceInMeters(CALI, { lat: 4.4516, lng: -76.532 })).toBeCloseTo(111_195, -2)
  expect(distanceInMeters(CALI, CALI)).toBe(0)
})

test('la velocidad sale de la distancia y el tiempo entre dos puntos', () => {
  const start = { ...CALI, time: 0 }
  expect(speedInKmh(start, { ...ONE_KM_NORTH, time: 3_600_000 })).toBeCloseTo(1, 1)
  expect(speedInKmh(start, { ...ONE_KM_NORTH, time: 60_000 })).toBeCloseTo(60, 0)
})

test('dos lecturas con la misma hora no dan una velocidad infinita', () => {
  expect(speedInKmh({ ...CALI, time: 5 }, { ...ONE_KM_NORTH, time: 5 })).toBe(0)
})

test('el largo del recorrido suma cada tramo y es cero con menos de dos puntos', () => {
  expect(pathLengthInMeters([CALI, ONE_KM_NORTH, CALI])).toBeCloseTo(2000, -1)
  expect(pathLengthInMeters([CALI])).toBe(0)
  expect(pathLengthInMeters([])).toBe(0)
})

test('la caja alrededor de un punto llega hasta el radio pedido en cada dirección', () => {
  const box = boundsAround(CALI, 1000)
  expect(distanceInMeters(CALI, { lat: box.north, lng: CALI.lng })).toBeCloseTo(1000, -1)
  expect(distanceInMeters(CALI, { lat: CALI.lat, lng: box.east })).toBeCloseTo(1000, -1)
  expect(box.south).toBeLessThan(CALI.lat)
  expect(box.west).toBeLessThan(CALI.lng)
})
