import { distanceInMeters } from './geo'

const CALI = { latitude: 3.4516, longitude: -76.532 }

test('sin moverse la distancia es cero', () => {
  expect(distanceInMeters(CALI, CALI)).toBe(0)
})

test('0,0003 grados hacia el norte son unos 33 metros', () => {
  const north = { ...CALI, latitude: CALI.latitude + 0.0003 }

  expect(distanceInMeters(CALI, north)).toBeCloseTo(33.4, 1)
})

test('la misma diferencia de longitud mide la mitad a 60 grados de latitud', () => {
  const equator = distanceInMeters({ latitude: 0, longitude: 0 }, { latitude: 0, longitude: 0.001 })
  const sixty = distanceInMeters({ latitude: 60, longitude: 0 }, { latitude: 60, longitude: 0.001 })

  expect(sixty / equator).toBeCloseTo(0.5, 3)
})
