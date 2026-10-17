import type { ReactNode } from 'react'
import { TasksContext } from './TasksContext'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { useRealTimeCollection } from '../hooks/useRealTimeCollection'
import type { Task, TaskValues } from '../types'

interface TasksProviderProps {
  children: ReactNode
}

function TasksProvider({ children }: TasksProviderProps) {
  const user = useCurrentUser()
  const { results, isPending, error, addItem, updateItem, removeItem } = useRealTimeCollection<Omit<Task, 'id'>>(
    `tasks/${user.uid}`,
  )

  const addTask = (values: TaskValues) => {
    addItem({ ...values, completed: false })
  }

  return (
    <TasksContext value={{ tasks: results, isPending, error, addTask, updateTask: updateItem, deleteTask: removeItem }}>
      {children}
    </TasksContext>
  )
}

export default TasksProvider
