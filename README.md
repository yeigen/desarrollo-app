# desarrollo-app

Challenge 07: app de Ionic React con una página por cada sensor del celular, usando los plugins de Capacitor 8.

## Descripción

Es una app nueva, creada vacía con `ionic start sensores blank --type=react --capacitor`. La página Home tiene un botón por sensor y cada botón abre una página que lo usa con su propio custom hook, como en la clase 07. Se probó en un Samsung Galaxy A15 con Android 16.

Lo que pide el challenge y dónde está:

| Pedido | Dónde |
| --- | --- |
| 1. Crear una app vacía | Commit `chore: crear la app ionic en blanco para el challenge 7` |
| 2. Home con un botón por sensor | `src/pages/Home.tsx` |
| 3. Una página por sensor | `src/pages/*Page.tsx`, cada una con su hook en `src/hooks/` |

## Capturas

| Home | Cámara | Dispositivo | Archivos |
| --- | --- | --- | --- |
| ![Home](imgs/home.png) | ![Cámara](imgs/camara.png) | ![Dispositivo](imgs/dispositivo.png) | ![Archivos](imgs/archivos.png) |

| Ubicación | Vibración | Notificaciones locales | Notificaciones push |
| --- | --- | --- | --- |
| ![Ubicación](imgs/ubicacion.png) | ![Vibración](imgs/vibracion.png) | ![Notificaciones locales](imgs/notificaciones-locales.png) | ![Notificaciones push](imgs/push-token.png) |

| Movimiento (acelerómetro) |
| --- |
| ![Movimiento](imgs/movimiento.png) |

Notificación local mostrada por la app:

![Notificación local](imgs/notificacion-local.png)

Notificación push enviada desde Firebase > Messaging con el token del dispositivo y la app en segundo plano:

![Notificación push recibida](imgs/push-recibida.png)

La vibración no se ve en una captura; Android registró las tres vibraciones de la app (impacto, notificación y la vibración de un segundo):

![Registro de vibraciones](imgs/vibracion-registro.png)

En las capturas se ocultaron el identificador del dispositivo, las coordenadas y el token de push.

## Sensores

| Página | Plugin | Qué hace |
| --- | --- | --- |
| Cámara | `@capacitor/camera` | Abre la cámara (`takePhoto`) o la galería (`chooseFromGallery`) y muestra la foto |
| Dispositivo | `@capacitor/device` | Modelo, fabricante, sistema, batería, si está cargando e identificador |
| Archivos | `@capacitor/filesystem` | Guarda, lee y borra una nota JSON en la carpeta Documentos |
| Ubicación | `@capacitor/geolocation` | Posición actual y seguimiento con `watchPosition` hasta detenerlo |
| Vibración | `@capacitor/haptics` | Impactos ligero, medio y fuerte, notificaciones hápticas y una vibración de un segundo |
| Notificaciones locales | `@capacitor/local-notifications` | Pide permiso, notifica al instante y programa un recordatorio a cinco segundos |
| Movimiento | `@capacitor/motion` | Lee el acelerómetro y clasifica reposo, movimiento o sacudida |
| Notificaciones push | `@capacitor/push-notifications` | Registra el dispositivo en Firebase Cloud Messaging y muestra el token |

Lo que se encontró al probar en el celular:

- `getPhoto` de la diapositiva está deprecado en `@capacitor/camera` 8.1; se usan `takePhoto` y `chooseFromGallery`.
- El Galaxy A15 no tiene giroscopio, así que el WebView entrega `acceleration` en cero. Movimiento usa `accelerationIncludingGravity` y mide cuánto se aleja su magnitud de la gravedad (9.81 m/s²). Con mediciones reales, el reposo da 0.1 m/s² y una sacudida fuerte 10.5 m/s² de mediana; los umbrales quedaron en 2 (movimiento) y 10 (sacudida).
- `Directory.Data` es la carpeta interna de la app, donde Firebase guarda sus propios archivos; por eso las notas van en `Directory.Documents`.
- Desde `local-notifications` 8.3, una notificación que pide alarma exacta abre los ajustes de "Alarmas y recordatorios" si falta el permiso. La notificación inmediata va con `isExactNotification: false`.

## Requisitos

- Node.js 24
- JDK 21 (en Ubuntu, `openjdk-21-jdk-headless`; el JRE no alcanza para compilar)
- Android SDK con `platforms;android-36`, `build-tools;36.0.0` y `platform-tools`
- Un celular Android con la depuración por USB activada
- El proyecto de Firebase `desarrollo-app-a610b`, con la app Android `com.yeigen.sensores`, para las notificaciones push

## Instalación

```bash
npm install
```

En `android/local.properties` (ignorado por git) va la ruta del SDK:

```
sdk.dir=/home/<usuario>/Android/Sdk
```

## Uso

En el navegador, para la interfaz (Dispositivo y Ubicación funcionan con las APIs web; el resto necesita el celular):

```bash
npm run dev
```

En el celular:

```bash
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

Si el SDK está en WSL y el celular conectado a Windows, se instala con el `adb.exe` de Windows pasándole la ruta de Windows del APK (`wslpath -w`).

Para probar las notificaciones push: en la página Notificaciones push, pulsa "Activar notificaciones push" y copia el token. En Firebase > Messaging, crea una campaña de Notificaciones, escribe el título y el texto, pulsa "Enviar mensaje de prueba", pega el token y pulsa "Probar".

## Pruebas

```bash
npx vitest run
npm run lint
```

## Contribuir

Los commits siguen [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/): tipo en inglés y descripción en español.

## Licencia

Proyecto académico, sin licencia definida.
