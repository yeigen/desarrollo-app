import type { Task } from '../types'

const tasks: Task[] = [
  {
    id: 1,
    title: 'Repasar la anatomía de Ionic',
    description: 'IonPage, IonHeader, IonToolbar e IonContent.',
    completed: false,
  },
  {
    id: 2,
    title: 'Crear la lista de tareas',
    description: 'Una lista con IonList que pinta cada tarea con su propio componente.',
    completed: true,
  },
  {
    id: 3,
    title: 'Agregar el login con Firebase',
    description: 'Registro, inicio de sesión y cierre de sesión con correo y contraseña.',
    completed: false,
  },
]

export default tasks
