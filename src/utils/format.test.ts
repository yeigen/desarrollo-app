import { formatDistance, formatDuration } from './format'

test('las distancias cortas van en metros y las largas en kilómetros con un decimal', () => {
  expect(formatDistance(849.6)).toBe('850 m')
  expect(formatDistance(1000)).toBe('1.0 km')
  expect(formatDistance(12_345)).toBe('12.3 km')
})

test('las duraciones pasan a horas desde los 60 minutos', () => {
  expect(formatDuration(0)).toBe('0 min')
  expect(formatDuration(45 * 60_000)).toBe('45 min')
  expect(formatDuration(125 * 60_000)).toBe('2 h 5 min')
})
