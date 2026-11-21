import { watermarkLines } from './watermark'

const CALI = { lat: 3.4516, lng: -76.532 }
const DATE = new Date(2026, 10, 20, 15, 30)

test('la marca de agua lleva las coordenadas con seis decimales, la fecha y la dirección', () => {
  const lines = watermarkLines(CALI, DATE, 'Calle 12 5-37, Cali')
  expect(lines[0]).toBe('Lat 3.451600, Lng -76.532000')
  expect(lines[1]).toContain('2026')
  expect(lines[2]).toBe('Calle 12 5-37, Cali')
})

test('sin dirección la marca de agua no deja una línea vacía', () => {
  expect(watermarkLines(CALI, DATE, '')).toHaveLength(2)
})
