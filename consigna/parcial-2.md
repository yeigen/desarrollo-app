# Parcial 2

Construir, en 4 horas de trabajo, una app donde los usuarios desbloquean y completan misiones y por esto ganan puntos. Los usuarios son reales, pueden loguearse y registrarse en la app.

## Contexto

El usuario logueado podrá:

- Ver misiones disponibles
- Completar acciones
- Ganar puntos
- Ver progreso y ranking básico

## Requisitos funcionales

### 1. Pantalla principal

Mostrar:

- Lista de misiones:
  - Tomar foto
  - Moverse 50 metros de su posición original
  - Esperar 10 segundos quieto y entonces vibrar

Cada misión debe tener:

- estado: pendiente / completada
- puntos

### 2. Sistema de misiones

Cada misión tiene una lógica real:

**Misión 1: Evidencia**

- Tomar una foto con la cámara
- Se completa al guardar imagen

**Misión 2: Movimiento real**

- Debe detectar cambio de ubicación
- Condición: distancia > 30m

**Misión 3: Permanencia activa**

- Una vez recorrido los 50mts, se habilita la siguiente misión y el usuario deberá mantenerse quieto 10 segundos
- Pasados los 10 segundos el celular vibra (sin bloquear pantalla)

### 3. Sistema de puntos

- Cada misión suma puntos
- Mostrar total acumulado

### 4. Progreso

Barra de progreso:

- % completado
- misiones completadas / total

### 5. Persistencia

Guardar en firebase y local:

```json
{
  "points": 120,
  "missions": [
    { "id": 1, "completed": true }
  ]
}
```

### 6. Pantalla de resultados

Mostrar:

- puntos totales
- misiones completadas
- estado general

## API

- Enviar puntos a firebase
- Notificaciones locales:
  - "Has completado una misión"
  - "Te falta 1 misión para completar"
- Ranking fake: Top 5 usuarios reales con puntaje real, el tuyo debe posicionarte frente a los otros 4.

## Requisitos técnicos

- Ionic + React
- Capacitor:
  - Camera
  - Geolocation
  - Vibrador
  - Local Notifications
  - Acelerómetro
- Hooks
- Manejo de estado
- Firebase y local storage
