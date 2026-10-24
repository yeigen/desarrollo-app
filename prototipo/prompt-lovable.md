Construye el prototipo visual de **comprice**, una app móvil para comparar los precios del mercado entre los supermercados de Cali (Colombia) y armar un presupuesto de compra.

## Contexto

- **Qué es:** una app que muestra dónde sale más barato cada producto, comparando por precio por kilo, por litro o por unidad.
- **Para quién:** personas de Cali que hacen el mercado y quieren ahorrar, y un administrador que gestiona las tiendas.
- **Acción clave:** buscar un producto (o escanear su código de barras) y agregar la oferta más barata al presupuesto.
- **Tiendas:** Éxito, Carulla, Olímpica, Jumbo, D1 y Mercamío.

## Alcance

- Es un prototipo visual. Sin login ni base de datos reales y sin conectar ningún backend: usa datos de ejemplo en memoria.
- Diseña las pantallas como si el backend existiera, con estados de carga (skeleton), vacío, error y sin conexión.
- Cualquier correo y contraseña inician sesión como usuario. El correo `admin@comprice.co` entra como administrador.

## Formato y estilo

- Solo para celular (390 x 844). En pantallas grandes, centra la app en un contenedor de máximo 430 px de ancho, con fondo gris alrededor, como si fuera un teléfono.
- La app se va a construir después en Ionic React, así que usa patrones que existan en Ionic: encabezado superior con título, barra de pestañas inferior con ícono y texto, barra de búsqueda, chips, tarjetas, listas, hojas inferiores (bottom sheets), interruptores (toggles) y botón flotante.
- Estilo limpio, confiable y enfocado en el ahorro. Fondo claro, color principal azul `#228be6` y verde `#40c057` solo para la etiqueta "Mejor precio". Tipografía Inter, tarjetas con esquinas de 12 px y sombras suaves, objetivos táctiles de al menos 44 px e íconos lineales.
- Textos en español de Colombia. Precios en pesos colombianos sin decimales, por ejemplo `$ 22.900`, y precio por unidad como `$ 4.580/kg`.
- Cada tienda se muestra con un círculo de color con su inicial y su nombre; en la app real se cambian por los logos.

## Navegación

- Sin sesión: Iniciar sesión y Crear cuenta.
- Usuario: pestañas inferiores **Buscar**, **Escanear**, **Presupuesto** (con contador de productos) y **Perfil**.
- Administrador: las mismas pestañas más **Admin**.

## Pantallas

1. **Iniciar sesión:** nombre "comprice" y lema "Compara el precio de tu mercado en Cali", correo, contraseña con mostrar y ocultar, botón Entrar, enlace a Crear cuenta y mensaje de error cuando faltan datos.
2. **Crear cuenta:** nombre, correo, contraseña y confirmar contraseña, con validaciones debajo de cada campo y enlace para volver a Iniciar sesión.
3. **Buscar:**
   - Barra de búsqueda con búsquedas recientes como chips ("arroz diana 5 kg", "leche entera", "huevos aa x30") y botón de filtros con el número de filtros activos.
   - Resumen "24 ofertas para arroz diana" y un aviso cuando una tienda no respondió ("Jumbo no respondió").
   - Tarjeta de oferta: miniatura del producto (tocarla la amplía), nombre, marca y contenido ("Diana · 5 kg"), tienda con su sede ("Éxito · Unicentro"), precio grande, precio por unidad, etiqueta "Mejor precio" en la más barata, "Visto hoy" y botón Agregar, que cambia a un contador − 1 + cuando el producto ya está en el presupuesto.
   - Filtros en una hoja inferior: tiendas como chips, medida (Gramos, Mililitros, Unidades) en un control segmentado, precio mínimo y máximo, precio por unidad mínimo y máximo, ordenar por (Precio por unidad, Precio, Nombre) y botones Limpiar y Aplicar.
4. **Escanear:** vista de cámara a pantalla completa con un marco para el código de barras, el texto "Apunta al código de barras" y un botón de linterna. En el prototipo, tocar el marco simula la lectura y abre una hoja inferior con el producto, su código EAN y la comparación en cada tienda, ordenada de menor a mayor precio, con la más barata resaltada y un botón Agregar por tienda.
5. **Presupuesto:**
   - Arriba, el total general y el número de productos, y el indicador "Compartido con Ana · en vivo" con avatares y un punto verde.
   - Botón Compartir que abre una hoja inferior para invitar por correo y ver quién tiene acceso.
   - Secciones plegables por tienda con su color, unidades y subtotal. Cada producto con miniatura, nombre, sede, precio, contador − cantidad + y opción de eliminar.
   - En Éxito, Carulla y Olímpica, un botón "Preparar carrito" que después cambia a "Continuar compra en la tienda".
   - El aviso "Los precios son orientativos: la tienda recalcula envío, servicio y bolsa", un botón Vaciar presupuesto con confirmación y un estado vacío con el botón Ir a buscar.
6. **Perfil:** avatar con iniciales, nombre, correo y rol (Usuario o Administrador), lista de presupuestos compartidos conmigo, interruptor "Vibrar al agregar productos" y botón Cerrar sesión con confirmación.
7. **Admin (solo administrador):** tarjetas con usuarios registrados, búsquedas de hoy y presupuestos compartidos, y la lista de las seis tiendas, cada una con su estado y un interruptor para activarla o desactivarla. Al desactivar una, se muestra el aviso "Los usuarios dejarán de ver las ofertas de Jumbo".

## Datos de ejemplo

Usa productos reales de Colombia con precios realistas en pesos: Arroz Diana 5 kg, Leche entera Alquería 1 L, Huevos AA Kikes x30, Aceite Premier 3 L, Café Sello Rojo 500 g y Pan tajado Bimbo 600 g, cada uno con ofertas en varias tiendas y sedes de Cali (Unicentro, Chipichape, Ciudad Jardín, Valle del Lili, San Fernando, Pance).

No agregues login real, base de datos ni ningún backend: todo funciona con los datos de ejemplo.
