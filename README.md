# desarrollo-app

Challenge 09: buscador de GIFs en Ionic React que consulta la API de búsqueda de GIPHY con `fetch`.

## Descripción

Es un proyecto nuevo sobre la misma base del challenge 7 (Ionic React, Capacitor 8 y TypeScript), sin las páginas de sensores. Se escribe un término en el buscador y la app muestra los GIFs que devuelve `GET https://api.giphy.com/v1/gifs/search`; al llegar al final de la lista carga la página siguiente.

Lo que pide el challenge y dónde está:

| Pedido | Dónde |
| --- | --- |
| 1. Crear una cuenta en developers.giphy.com y una App | App de tipo API creada en el panel de GIPHY; su key va en `.env.local` |
| 2. Leer la documentación de la API | [Search endpoint](https://developers.giphy.com/docs/api/endpoint#search) y [esquema de respuesta](https://developers.giphy.com/docs/api/schema/) |
| 3. Proyecto nuevo para buscar y mostrar GIFs | `src/pages/Search/Search.tsx`, con `src/components/GifGrid` y `src/components/GifCard` |
| 4. Buscar escribiendo en un campo de texto | `IonSearchbar` en `Search.tsx`; el hook espera 500 ms sin escribir antes de buscar |
| 5. Mostrar los GIFs en pantalla | `GifGrid` en dos columnas con la versión `fixed_width` (200 px de ancho) de cada GIF |
| 6. API key en variables de entorno (`.env`) | `.env.local` (ignorado por git), `.env.example` versionado, tipado en `src/vite-env.d.ts` y leído solo en `src/config.ts` |
| 7. Usar la API de búsqueda | `src/services/giphy.ts`: `searchGifs(term, offset, signal)` |
| 8. Llamar la API con Fetch o Axios | `fetch` con `URLSearchParams`, como en la clase; no hace falta Axios para un solo `GET` |
| Clase: cancelar con `AbortController` | `src/hooks/useGifSearch.ts`: cada búsqueda nueva o salir de la pantalla aborta la petición anterior |

## Capturas

| Inicio | Búsqueda | Más resultados al bajar |
| --- | --- | --- |
| ![Inicio](imgs/inicio.png) | ![Búsqueda](imgs/busqueda.png) | ![Scroll infinito](imgs/scroll.png) |

| Cargando | Sin resultados | Error |
| --- | --- | --- |
| ![Cargando](imgs/cargando.png) | ![Sin resultados](imgs/vacio.png) | ![Error](imgs/error.png) |

El error se forzó con Playwright respondiendo 429 (límite de peticiones) a la ruta de GIPHY.

Cancelación: con la red retrasada 2 segundos desde Playwright, se escribió "perro", luego "gato" y luego "gato feliz", dejando pasar el debounce entre cada uno. Las dos primeras peticiones quedaron abortadas (`net::ERR_ABORTED`) y solo la última llegó a la pantalla. El panel oscuro lo dibujó Playwright con los eventos de red de la página y solo muestra el parámetro `q`:

![Cancelación de búsquedas](imgs/cancelacion.png)

El hook que busca, espera al usuario y cancela:

![useGifSearch](imgs/codigo-hook.png)

## Cómo funciona

| Archivo | Qué hace |
| --- | --- |
| `src/config.ts` | Único lugar que lee `import.meta.env.VITE_GIPHY_API_KEY` |
| `src/services/giphy.ts` | Arma la URL de búsqueda (`limit` 25, `rating` g, `lang` es), llama a `fetch` con el `signal` y devuelve los GIFs con un tipo propio pequeño: `id`, `title`, `url`, `width` y `height` (GIPHY manda las medidas como texto) |
| `src/hooks/useGifSearch.ts` | Guarda los GIFs, si está cargando y el error. Espera 500 ms sin cambios en el término, crea un `AbortController` por petición y lo aborta al cambiar de búsqueda o al desmontar la página. Un `AbortError` no se muestra como error |
| `src/pages/Search/Search.tsx` | Buscador, mensajes de inicio, cargando, sin resultados y error, la grilla y el `IonInfiniteScroll` que pide la página siguiente con `offset` |
| `src/components/GifGrid`, `src/components/GifCard` | Grilla en columnas y tarjeta con el GIF y su título |

La atribución "Powered by GIPHY" va fija en el pie, como exige GIPHY a toda app que use su API.

## Requisitos

- Node.js 24
- Una API key de GIPHY (developers.giphy.com > Create an App > API)
- Para el APK: JDK 21 y Android SDK con `platforms;android-36` y `build-tools;36.0.0`

## Instalación

```bash
npm install
cp .env.example .env.local
```

En `.env.local` se pega la key después del `=`:

```
VITE_GIPHY_API_KEY=<tu key de GIPHY>
```

Para Android, en `android/local.properties` (ignorado por git) va la ruta del SDK:

```
sdk.dir=/home/<usuario>/Android/Sdk
```

## Uso

En el navegador:

```bash
npm run dev
```

Se abre `http://localhost:5173`, se escribe un término (por ejemplo "gatos") y a medio segundo aparecen los GIFs. Al bajar hasta el final se cargan 25 más.

En el celular:

```bash
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

## Configuración

| Variable | Para qué |
| --- | --- |
| `VITE_GIPHY_API_KEY` | API key de la App de GIPHY |

Vite inserta las variables `VITE_` en el JavaScript que llega al navegador, así que la key queda visible en la app compilada. Es lo esperado para una key de cliente de GIPHY; lo que se evita es subirla al repositorio. La key de prueba (beta) admite 100 peticiones por hora.

## Pruebas

```bash
npx vitest run
npx eslint .
npx tsc --noEmit
```

Las pruebas mockean `fetch`: el servicio convierte la respuesta y falla con el estado HTTP, y el hook cancela la búsqueda anterior, no busca mientras se escribe y cancela al salir de la pantalla.

![Pruebas](imgs/pruebas.png)

![Verificación](imgs/verificacion.png)

## Contribuir

Los commits siguen [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): tipo en inglés y descripción en español.

## Licencia

Proyecto académico, sin licencia definida.
