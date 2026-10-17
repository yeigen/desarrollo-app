import { snapshotToList } from './useRealTimeCollection'

test('cada registro de Realtime Database queda en la lista con su clave como id', () => {
  expect(snapshotToList({ a1: { title: 'Uno', createdAt: 1 } })).toEqual([
    { title: 'Uno', createdAt: 1, id: 'a1' },
  ])
})

test('los registros quedan en orden de creación aunque sus claves no lo estén', () => {
  const tasks = snapshotToList({
    '-P49fjJULiwTONVJLPT-': { title: 'Segunda', createdAt: 2000 },
    '-P49fjPKTpYv9AXObrds': { title: 'Primera', createdAt: 1000 },
  })

  expect(tasks.map(task => task.title)).toEqual(['Primera', 'Segunda'])
})

test('una ruta sin datos da una lista vacía', () => {
  expect(snapshotToList(null)).toEqual([])
})
