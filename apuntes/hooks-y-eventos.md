# Apuntes: hooks y funciones en eventos

Basado en las diapositivas de clase en `imagenes-clases/01-INICIO/hooks/` e `imagenes-clases/01-INICIO/functions/`.

## Qué es un hook

Un componente de React es una función de JavaScript que retorna lo que se ve en pantalla (el JSX). El problema es que una función normal se ejecuta y muere: no recuerda nada entre una ejecución y otra, y no puede hacer cosas por fuera de dibujar la pantalla.

Los hooks resuelven eso. Son funciones que React trae incluidas, todas empiezan con `use`, y se llaman en la primera línea del componente. Cada una le da al componente una capacidad distinta:

- `useState` le da memoria
- `useEffect` le permite hacer cosas fuera del render (timers, avisos, peticiones)

Regla importante: los hooks solo se llaman en el nivel de arriba del componente, nunca dentro de un if, un for o una función anidada.

## useState: la memoria del componente

```jsx
const [segundos, setSegundos] = useState(0);
```

Esta línea crea una variable que sobrevive entre renders:

- `segundos` es el valor actual (arranca en 0, el argumento de `useState`)
- `setSegundos` es la única forma correcta de cambiarlo

Cuando llamas `setSegundos(5)`, pasan dos cosas: el valor cambia, y React vuelve a ejecutar el componente para redibujar la pantalla con el valor nuevo. Ese redibujado se llama render. Si cambiaras la variable a mano (`segundos = 5`), React no se entera y la pantalla no se actualiza.

## useEffect: hacer cosas fuera del render

`useEffect` recibe dos argumentos: una función con el trabajo a hacer, y un array que le dice a React cuándo repetir ese trabajo.

```jsx
useEffect(() => {
  // el trabajo
}, [dependencias]);
```

### Caso 1: ejecutar algo cuando el componente aparece (montaje)

Diapositiva `imagenes-clases/01-INICIO/hooks/hooks-montaje.png`:

```jsx
function EjemploCleanup() {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSegundos(s => s + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      console.log('Intervalo limpiado');
    };
  }, []);

  return <p>Segundos: {segundos}</p>;
}
```

Con el array vacío `[]`, el efecto corre una sola vez: cuando el componente aparece en pantalla por primera vez. A eso se le llama montar el componente. Aquí se aprovecha para arrancar un cronómetro que suma 1 cada segundo.

### La función de limpieza (cleanup)

El `return` que está dentro del efecto es una función que React guarda y ejecuta cuando el componente desaparece de la pantalla (se desmonta), por ejemplo al navegar a otra vista.

Por qué es necesaria: `setInterval` sigue ejecutándose para siempre hasta que alguien lo detenga. Si el componente muere y nadie llama `clearInterval`, ese timer queda vivo en memoria intentando actualizar un componente que ya no existe. Eso produce errores y fugas de memoria.

Regla: todo lo que un efecto encienda (timers, escuchas de eventos, conexiones), la limpieza lo debe apagar.

### Caso 2: reaccionar cuando un dato cambia (dependencias)

Diapositiva `imagenes-clases/01-INICIO/hooks/hooks-dependencia.png`:

```jsx
function EjemploDependencia() {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    console.log('El nombre cambió:', nombre);
  }, [nombre]);

  return (
    <>
      <input
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        placeholder="Escribe tu nombre"
      />
    </>
  );
}
```

El array ya no está vacío: tiene `[nombre]`. Eso significa: ejecuta el efecto al montar, y vuelve a ejecutarlo cada vez que `nombre` cambie de valor. Cada letra que se escribe en el input dispara el `console.log`.

### Resumen del array de dependencias

| Array | Cuándo corre el efecto |
|---|---|
| Sin array | Después de cada render (casi nunca se quiere) |
| `[]` vacío | Solo al montar; la limpieza corre al desmontar |
| `[nombre]` | Al montar y cada vez que `nombre` cambie |

## Funciones en eventos (onClick, onChange)

Diapositiva `imagenes-clases/01-INICIO/functions/ejemplo_funciones.png`. En JSX los eventos se escriben como props en camelCase (`onClick`, `onChange`, `onSubmit`) y reciben una función entre llaves.

```jsx
function EjemploFunciones() {
  const sumar = (e, valor) => {
    console.log(e);
    console.log('has presionado un click con ' + valor);
  };

  return (
    <button onClick={(evt) => sumar(evt, 4)}>
      Sumar
    </button>
  );
}
```

### Forma 1: con función flecha envolvente

```jsx
onClick={() => funcion(params)}
onClick={(evt) => funcion(evt, params)}
```

Se usa cuando la función necesita argumentos propios. La flecha crea una función nueva que React ejecutará al hacer click, y adentro tú llamas la tuya con lo que quieras pasarle.

### Forma 2: referencia directa

```jsx
onClick={funcion}
onClick={(evt) => funcion(evt)}
```

Se usa cuando la función no necesita argumentos extra. React la llama por ti al hacer click y le pasa automáticamente el evento como primer argumento. Las dos líneas de arriba hacen lo mismo, por eso la primera es la preferida por corta.

### El objeto evt

`evt` (o `e`) es el objeto del evento: trae la información de lo que pasó. Su propiedad más usada es `evt.target`, el elemento HTML que disparó el evento. En un input, `evt.target.value` es el texto que el usuario escribió; por eso el ejemplo de dependencias usa `onChange={e => setNombre(e.target.value)}`.

### Error común

```jsx
onClick={sumar(4)}
```

Con paréntesis directos la función se ejecuta de inmediato al renderizar, no al hacer click. Si hay argumentos, siempre va envuelta en flecha: `onClick={() => sumar(4)}`.

## Documentación oficial (en español)

- useState: https://es.react.dev/reference/react/useState
- El estado como memoria del componente: https://es.react.dev/learn/state-a-components-memory
- useEffect: https://es.react.dev/reference/react/useEffect
- Sincronizar con efectos (montaje y limpieza): https://es.react.dev/learn/synchronizing-with-effects
- Responder a eventos: https://es.react.dev/learn/responding-to-events
