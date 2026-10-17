import { createContext } from 'react'
import type { Task, TaskValues } from '../types'

export interface TasksContextValue {
  tasks: Task[]
  isPending: boolean
  error: string
  addTask: (values: TaskValues) => void
  updateTask: (id: string, changes: Partial<Omit<Task, 'id'>>) => void
  deleteTask: (id: string) => void
}

export const TasksContext = createContext<TasksContextValue | null>(null)
