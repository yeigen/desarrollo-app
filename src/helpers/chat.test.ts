import { MAX_MESSAGE_LENGTH, validateMessage } from './chat'

test('quita los espacios de los extremos y acepta un mensaje normal', () => {
  expect(validateMessage('  Hola  ')).toEqual({ body: 'Hola', error: '' })
})

test('conserva los saltos de línea', () => {
  expect(validateMessage('Hola\nmundo').body).toBe('Hola\nmundo')
})

test('rechaza un mensaje vacío o solo con espacios', () => {
  expect(validateMessage('   ').error).toBe('Escribe un mensaje.')
})

test('acepta hasta 500 caracteres', () => {
  const body = 'a'.repeat(MAX_MESSAGE_LENGTH)

  expect(validateMessage(body)).toEqual({ body, error: '' })
})

test('rechaza más de 500 caracteres', () => {
  const result = validateMessage('a'.repeat(MAX_MESSAGE_LENGTH + 1))

  expect(result.error).toContain('500')
})
