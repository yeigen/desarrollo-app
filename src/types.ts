export interface Task {
  id: number
  title: string
  description: string
  completed: boolean
}

export type TaskValues = Pick<Task, 'title' | 'description'>

export interface Contact {
  id: string
  name: string
  phone: string
}

export type ContactValues = Omit<Contact, 'id'>
