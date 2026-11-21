import { appendPoint, dayKey, savedDays, summarizeDay, trackFileName } from './tracks'

const CALI = { lat: 3.4516, lng: -76.532 }
const ONE_KM_NORTH = { lat: 3.460593, lng: -76.532 }

test('el día del recorrido es la fecha local, también cerca de la medianoche', () => {
  expect(dayKey(new Date(2026, 10, 20, 23, 59).getTime())).toBe('2026-11-20')
  expect(dayKey(new Date(2026, 0, 5, 0, 1).getTime())).toBe('2026-01-05')
})

test('el historial lista solo los archivos de recorrido, del día más reciente al más viejo', () => {
  const files = [trackFileName('2026-11-18'), 'foto-1.jpg', trackFileName('2026-11-20'), 'recorrido-viejo.json']
  expect(savedDays(files)).toEqual(['2026-11-20', '2026-11-18'])
})

test('cada inicio de rastreo es una sesión nueva y los puntos siguientes se suman a ella', () => {
  let sessions = appendPoint([], 100, { ...CALI, time: 100 })
  sessions = appendPoint(sessions, 100, { ...ONE_KM_NORTH, time: 200 })
  sessions = appendPoint(sessions, 900, { ...CALI, time: 900 })
  expect(sessions.map(session => session.points.length)).toEqual([2, 1])
})

test('el resumen del día suma la distancia y el tiempo de todas las sesiones', () => {
  const sessions = [
    { startedAt: 0, points: [{ ...CALI, time: 0 }, { ...ONE_KM_NORTH, time: 600_000 }] },
    { startedAt: 1, points: [{ ...ONE_KM_NORTH, time: 900_000 }, { ...CALI, time: 1_200_000 }] },
  ]
  const summary = summarizeDay(sessions)
  expect(summary.distance).toBeCloseTo(2000, -1)
  expect(summary.durationMs).toBe(900_000)
  expect(summary.points).toBe(4)
  expect(summarizeDay([])).toEqual({ distance: 0, durationMs: 0, points: 0 })
})
