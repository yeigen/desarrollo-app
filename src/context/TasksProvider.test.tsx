import { act, renderHook } from '@testing-library/react'
import TasksProvider from './TasksProvider'
import { useTasks } from '../hooks/useTasks'

const renderTasks = () => renderHook(() => useTasks(), { wrapper: TasksProvider })

test('una tarea nueva se agrega al final y queda pendiente', () => {
  const { result } = renderTasks()
  const previousTasks = result.current.tasks

  act(() => result.current.addTask({ title: 'Estudiar Firebase', description: 'Auth con correo' }))

  expect(result.current.tasks.slice(0, -1)).toEqual(previousTasks)
  expect(result.current.tasks.at(-1)).toMatchObject({
    title: 'Estudiar Firebase',
    description: 'Auth con correo',
    completed: false,
  })
})

test('editar una tarea cambia solo esa tarea', () => {
  const { result } = renderTasks()
  const [first, ...rest] = result.current.tasks

  act(() => result.current.updateTask(first.id, { title: 'Título nuevo', completed: true }))

  expect(result.current.tasks).toEqual([{ ...first, title: 'Título nuevo', completed: true }, ...rest])
})

test('eliminar una tarea quita solo esa tarea', () => {
  const { result } = renderTasks()
  const [first, second, ...rest] = result.current.tasks

  act(() => result.current.deleteTask(second.id))

  expect(result.current.tasks).toEqual([first, ...rest])
})
