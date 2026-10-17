import { createContext } from 'react'
import type { Task, TaskValues } from '../types'

export interface TasksContextValue {
  tasks: Task[]
  addTask: (values: TaskValues) => void
  updateTask: (id: number, changes: Partial<Omit<Task, 'id'>>) => void
  deleteTask: (id: number) => void
}

export const TasksContext = createContext<TasksContextValue | null>(null)
