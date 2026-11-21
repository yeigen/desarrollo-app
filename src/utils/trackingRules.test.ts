import { classifySpeed, dueAlerts, isBatteryLow, isResting } from './trackingRules'

const MINUTE = 60_000
const NOW = 100 * MINUTE

test('la velocidad separa quieto, caminando y moviéndose rápido', () => {
  expect(classifySpeed(0.3)).toBe('still')
  expect(classifySpeed(5)).toBe('moving')
  expect(classifySpeed(40)).toBe('fast')
})

test('el rastreo se pausa tras un minuto sin movimiento y nunca sin lecturas del acelerómetro', () => {
  expect(isResting(NOW - 2 * MINUTE, NOW)).toBe(true)
  expect(isResting(NOW - 10_000, NOW)).toBe(false)
  expect(isResting(null, NOW)).toBe(false)
})

test('la batería es baja con 15 % o menos, salvo que esté cargando', () => {
  expect(isBatteryLow({ batteryLevel: 0.1, isCharging: false })).toBe(true)
  expect(isBatteryLow({ batteryLevel: 0.1, isCharging: true })).toBe(false)
  expect(isBatteryLow({ batteryLevel: 0.6, isCharging: false })).toBe(false)
  expect(isBatteryLow(undefined)).toBe(false)
})

test('avisa cuando lleva mucho tiempo quieto, sin conexión o va rápido', () => {
  const calm = { now: NOW, lastMoveAt: NOW, speedKmh: 4, connected: true, sent: {} }
  expect(dueAlerts(calm)).toEqual([])
  expect(dueAlerts({ ...calm, lastMoveAt: NOW - 6 * MINUTE })).toEqual(['still'])
  expect(dueAlerts({ ...calm, connected: false, speedKmh: 60 })).toEqual(['offline', 'fast'])
})

test('no repite el mismo aviso hasta que pasa la espera', () => {
  const offline = { now: NOW, lastMoveAt: NOW, speedKmh: 0, connected: false }
  expect(dueAlerts({ ...offline, sent: { offline: NOW - MINUTE } })).toEqual([])
  expect(dueAlerts({ ...offline, sent: { offline: NOW - 11 * MINUTE } })).toEqual(['offline'])
  expect(dueAlerts({ ...offline, sent: { fast: NOW } })).toEqual(['offline'])
})
