# desarrollo-app

Challenge 06: app de Ionic React con login de Firebase, contactos en Firestore, tareas en Realtime Database y frutas en Dexie.

## Descripción

Es una app nueva que parte del challenge 05: conserva el login, el registro y el logout reales con Firebase Authentication, y organiza el contenido en tres pestañas. Cada pestaña guarda sus datos en un lugar distinto. La app revisa la conexión y, sin red, deshabilita las acciones de Contactos y Tareas; Frutas sigue funcionando porque se guarda en el dispositivo.

Lo que pide el challenge y dónde está:

| Pedido | Dónde |
| --- | --- |
| App con login real y rutas | `src/App.tsx` y `src/pages/Tabs.tsx`, con el login de Firebase del challenge 05 |
| Contactos en Firebase | `src/pages/Contacts.tsx` con `useCollection` sobre Firestore (`users/{uid}/contacts`) |
| Tareas en RealTime | `src/context/TasksProvider.tsx` con `useRealTimeCollection` sobre Realtime Database (`tasks/{uid}`) |
| Frutas en Dexie con newFunction | `src/pages/Fruits.tsx` con `useDexie(tabla, filterFn)`: la función de filtro es la del buscador |
| Habilitar o deshabilitar acciones según la red | `useNetwork` con `@capacitor/network`, usado en Contactos y en las páginas de tareas |

## Capturas

| Contactos en Firestore | Contactos sin conexión | Reglas: sin sesión no hay acceso |
| --- | --- | --- |
| ![Contactos](imgs/contactos.png) | ![Contactos sin conexión](imgs/contactos-sin-conexion.png) | ![Reglas](imgs/reglas-acceso-anonimo.png) |

| Tareas en tiempo real | Detalle de una tarea | Tareas sin conexión | Detalle sin conexión |
| --- | --- | --- | --- |
| ![Tareas en tiempo real](imgs/tareas-tiempo-real.png) | ![Detalle](imgs/tarea-detalle.png) | ![Tareas sin conexión](imgs/tareas-sin-conexion.png) | ![Detalle sin conexión](imgs/tarea-detalle-sin-conexion.png) |

| Frutas en Dexie | Buscar frutas sin conexión | Inicio de sesión | Credenciales incorrectas |
| --- | --- | --- | --- |
| ![Frutas](imgs/frutas.png) | ![Buscar sin conexión](imgs/frutas-buscar-sin-conexion.png) | ![Inicio de sesión](imgs/login.png) | ![Credenciales incorrectas](imgs/login-error.png) |

La tarea "Tarea creada desde otro dispositivo" se agregó desde la terminal con la CLI de Firebase mientras la app estaba abierta, y apareció en la lista sin recargar.

## Rutas

| Ruta | Página | Datos |
| --- | --- | --- |
| `/login`, `/register` | Inicio de sesión y registro | Firebase Authentication |
| `/tabs/contacts` | Contactos | Firestore |
| `/tabs/tasks` | Lista de tareas | Realtime Database |
| `/tabs/tasks/new` y `/tabs/tasks/:id/edit` | Agregar y editar una tarea | Realtime Database |
| `/tabs/tasks/:id` | Detalle de una tarea | Realtime Database |
| `/tabs/fruits` | Frutas | Dexie (IndexedDB) |

Todo lo que está bajo `/tabs` pide sesión; sin ella, la app redirige a `/login`. `/` y `/tabs` llevan a Contactos.

## Componentes y archivos

- `src/hooks/useCollection.ts`: CRUD de una colección de Firestore. Escucha con `onSnapshot`, así la lista se actualiza sola después de cada cambio.
- `src/hooks/useRealTimeCollection.ts`: CRUD de una ruta de Realtime Database. Escucha con `onValue`, guarda `createdAt` con la hora del servidor y ordena por ese campo, porque las claves de `push` dependen del reloj del cliente.
- `src/hooks/useDexie.ts` y `src/db/localDb.ts`: la base local y su CRUD con `useLiveQuery`. Recibe la función de filtro que usa el buscador (`src/utils/matchesSearch.ts`, que ignora mayúsculas y tildes).
- `src/hooks/useNetwork.ts` y `src/components/NetworkStatus.tsx`: estado de la red con `Network.getStatus()` y el evento `networkStatusChange`.
- `src/context/TasksProvider.tsx`: comparte las tareas del usuario entre la lista, el detalle y el formulario.
- `src/hooks/useCurrentUser.ts`: el usuario con sesión, para armar las rutas por usuario.
- `src/hooks/useConfirmDelete.ts`: la confirmación antes de eliminar un contacto, una tarea o una fruta.
- `src/components/TabHeader.tsx`: título de la pestaña y botón Salir.
- `firestore.rules` y `database.rules.json`: cada usuario solo lee y escribe sus propios datos.

## Requisitos

- Node.js 24
- El proyecto de Firebase `desarrollo-app-a610b` con Authentication (correo y contraseña), Firestore y Realtime Database. La configuración web está en `src/firebase/config.ts`; según Firebase, la `apiKey` web puede ir en el código.

## Instalación

```bash
npm install
```

## Uso

```bash
npm run dev
```

Se abre en http://localhost:5173. Para entrar, crea una cuenta desde "Crear una cuenta". Para probar el modo sin conexión en Chrome: F12, pestaña Network y la opción Offline.

Para desplegar las reglas de seguridad después de cambiarlas:

```bash
npx firebase-tools deploy --only firestore,database
```

## Pruebas

```bash
npx vitest run
npm run lint
```

## Contribuir

Los commits siguen [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): tipo en inglés y descripción en español.

## Licencia

Proyecto académico, sin licencia definida.
