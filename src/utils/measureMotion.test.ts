import { measureMotion } from './measureMotion'

test('la magnitud combina los tres ejes', () => {
  expect(measureMotion({ x: 3, y: 4, z: 0 }).magnitude).toBe(5)
})

test('el celular quieto queda en reposo', () => {
  expect(measureMotion({ x: 0.1, y: -0.2, z: 0.05 }).state).toBe('rest')
})

test('una aceleración moderada cuenta como movimiento y una fuerte como sacudida', () => {
  expect(measureMotion({ x: 0, y: 3, z: 0 }).state).toBe('moving')
  expect(measureMotion({ x: 12, y: -10, z: 4 }).state).toBe('shaking')
})
