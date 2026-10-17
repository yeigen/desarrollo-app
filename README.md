# desarrollo-app

Challenge 05: app de tareas en Ionic React con login, registro y logout de Firebase, contexts y custom hooks.

## Descripción

Es la app de tareas de los challenges 03 y 04, ahora con usuarios reales. El login demo con `localStorage` se reemplazó por Firebase Authentication con correo y contraseña. Para ver las tareas hay que iniciar sesión o crear una cuenta, y la sesión se recuerda al volver a abrir la app.

Lo que pide el challenge y dónde está:

| Pedido | Dónde |
| --- | --- |
| Login, registro y logout con Firebase | `src/hooks/useFirebaseAuth.ts`, páginas `Login` y `Register`, botón Salir de `Tasks` |
| Páginas con rutas: Login, Register, lista, agregar/editar y detalle | `src/App.tsx` |
| Un context para las tareas entre páginas | `src/context/TasksProvider.tsx`, leído con `useTasks` |
| Otro context para el login y el registro | `src/context/AuthProvider.tsx`, leído con `useAuth` |
| Custom hooks para la lógica de Firebase | `useFirebaseAuth`, que usa `AuthProvider` |

## Capturas

| Inicio de sesión | Credenciales incorrectas | Contraseña débil al registrarse |
| --- | --- | --- |
| ![Inicio de sesión](imgs/login.png) | ![Credenciales incorrectas](imgs/login-error.png) | ![Contraseña débil](imgs/registro-error.png) |

| Lista de tareas | Nueva tarea | Detalle |
| --- | --- | --- |
| ![Lista de tareas](imgs/lista.png) | ![Nueva tarea](imgs/nueva-tarea.png) | ![Detalle](imgs/detalle.png) |

| Editar tarea | Confirmar eliminación |
| --- | --- |
| ![Editar tarea](imgs/editar-tarea.png) | ![Confirmar eliminación](imgs/eliminar-tarea.png) |

## Rutas

| Ruta | Página | Sin sesión |
| --- | --- | --- |
| `/login` | Inicio de sesión | Se muestra. Con sesión, salta a `/tasks` |
| `/register` | Crear cuenta | Se muestra. Con sesión, salta a `/tasks` |
| `/tasks` | Lista de tareas | Redirige a `/login` |
| `/tasks/new` | Nueva tarea | Redirige a `/login` |
| `/tasks/:id` | Detalle de una tarea | Redirige a `/login` |
| `/tasks/:id/edit` | Editar una tarea | Redirige a `/login` |
| `/` | Redirige a `/tasks` | |

## Componentes y archivos

- `src/firebase/config.ts`: inicializa Firebase. En el celular, Auth usa `initializeAuth` con `indexedDBLocalPersistence`, porque `getAuth` asume un navegador. En el navegador usa `getAuth`.
- `src/hooks/useFirebaseAuth.ts`: el custom hook con la lógica de Firebase. Escucha la sesión con `onAuthStateChanged` y expone `login`, `register` y `logout`.
- `src/context/AuthProvider.tsx`: comparte lo que devuelve `useFirebaseAuth` con toda la app. Mientras Firebase restaura la sesión muestra un indicador de carga.
- `src/context/TasksProvider.tsx`: guarda las tareas y define agregar, editar y eliminar. Las tareas viven en memoria; Firestore y Realtime Database son del challenge 06.
- `src/hooks/useAuth.ts` y `src/hooks/useTasks.ts`: leen cada context.
- `src/components/RequireAuth.tsx`: protege las rutas de tareas.
- `src/components/AuthForm.tsx`: el formulario de correo y contraseña que comparten Login y Register. Traduce los errores de Firebase al español.
- `src/components/TaskForm.tsx`: título y descripción, para crear y para editar.
- `src/components/TaskList.tsx`, `TaskItem.tsx` y `TaskStatusBadge.tsx`: la lista, cada fila y la insignia de estado.
- `src/pages/`: `Login`, `Register`, `Tasks`, `TaskDetail` y `TaskEditor` (agregar y editar).

Ionic React 9 trae React Router 6, así que las rutas se declaran con `element` y la navegación por código se hace con `useIonRouter`, en lugar del `useHistory` de las diapositivas. Los contexts se renderizan como `<AuthContext value={...}>`, la forma de React 19; `.Provider` quedó como forma legacy.

## Requisitos

- Node.js 24
- Un proyecto de Firebase con el método de acceso Correo/Contraseña activado. La configuración del proyecto `desarrollo-app-a610b` está en `src/firebase/config.ts`; según Firebase, la `apiKey` web puede ir en el código.

## Instalación

```bash
npm install
```

## Uso

```bash
npm run dev
```

Se abre en http://localhost:5173. En Chrome, con F12 y el modo de dispositivo, se ve como en un celular. Para entrar, crea una cuenta desde "Crear una cuenta" (mínimo 6 caracteres de contraseña).

## Pruebas

```bash
npx vitest run
npm run lint
```

## Contribuir

Los commits siguen [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): tipo en inglés y descripción en español.

## Licencia

Proyecto académico, sin licencia definida.
