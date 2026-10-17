import { matchesSearch } from './matchesSearch'

test('encuentra la fruta sin importar mayúsculas ni tildes', () => {
  expect(matchesSearch('Limón', 'limon')).toBe(true)
  expect(matchesSearch('limon', 'LIMÓN')).toBe(true)
})

test('encuentra la fruta por una parte del nombre', () => {
  expect(matchesSearch('Maracuyá', 'cuya')).toBe(true)
  expect(matchesSearch('Mango', 'pera')).toBe(false)
})

test('una búsqueda vacía muestra todas las frutas', () => {
  expect(matchesSearch('Mango', '  ')).toBe(true)
})
