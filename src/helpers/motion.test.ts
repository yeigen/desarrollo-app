import { isMoving } from './motion'

test('el celular quieto no se mueve sin importar cómo esté apoyado', () => {
  expect(isMoving({ x: 0, y: 0, z: 9.81 })).toBe(false)
  expect(isMoving({ x: 9.7, y: 0.2, z: 0.1 })).toBe(false)
})

test('caminar con el celular en la mano cuenta como movimiento', () => {
  expect(isMoving({ x: 2.5, y: 4, z: 13 })).toBe(true)
})
