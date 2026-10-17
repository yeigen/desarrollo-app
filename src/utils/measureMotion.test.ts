import { measureMotion } from './measureMotion'

test('el celular quieto solo mide la gravedad y queda en reposo', () => {
  const motion = measureMotion({ x: 0.1, y: 0, z: 9.7 })
  expect(motion.magnitude).toBeCloseTo(0.11, 2)
  expect(motion.state).toBe('rest')
})

test('la gravedad cuenta igual en cualquier orientación del celular', () => {
  expect(measureMotion({ x: 9.81, y: 0, z: 0 }).state).toBe('rest')
  expect(measureMotion({ x: 0, y: -9.81, z: 0 }).state).toBe('rest')
})

test('una aceleración moderada cuenta como movimiento y una fuerte como sacudida', () => {
  expect(measureMotion({ x: 0, y: 3, z: 12 }).state).toBe('moving')
  expect(measureMotion({ x: 18, y: -12, z: 9.81 }).state).toBe('shaking')
})
