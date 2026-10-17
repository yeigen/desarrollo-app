import { useState, type ReactNode } from 'react'
import { TasksContext } from './TasksContext'
import initialTasks from '../data/tasks'
import type { Task, TaskValues } from '../types'

interface TasksProviderProps {
  children: ReactNode
}

function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState(initialTasks)

  const addTask = (values: TaskValues) => {
    setTasks(current => [...current, { id: Date.now(), ...values, completed: false }])
  }

  const updateTask = (id: number, changes: Partial<Omit<Task, 'id'>>) => {
    setTasks(current => current.map(task => (task.id === id ? { ...task, ...changes } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(current => current.filter(task => task.id !== id))
  }

  return (
    <TasksContext value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TasksContext>
  )
}

export default TasksProvider
