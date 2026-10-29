# Plan de pruebas: SauceDemo

**Datos de prueba:** contraseña común `secret_sauce`. Usuarios: `standard_user`, `locked_out_user`, `problem_user`, `performance_glitch_user`, `error_user`, `visual_user`.

**Leyenda de prioridad:** Alta = flujo crítico o regresión probable · Media = comportamiento importante · Baja = secundario.

---

## 1. Login y sesión

| ID | Caso | Resultado esperado | Prioridad | Automatizar | Revisado |
|---|---|---|---|---|---|
| L-01 | Login con `standard_user` y contraseña correcta | Se accede a `/inventory.html` y se ve el listado de productos | Alta | Sí | ✅ |
| L-02 | Login con contraseña incorrecta | Mensaje: "Epic sadface: Username and password do not match any user in this service"; se permanece en el login | Alta | Sí | ✅ |
| L-03 | Login con `locked_out_user` | Mensaje: "Epic sadface: Sorry, this user has been locked out."; no se accede | Alta | Sí | ✅ |
| L-04 | Login con usuario vacío | Mensaje "Epic sadface: Username is required" | Media | Sí | ✅ |
| L-05 | Login con contraseña vacía | Mensaje "Epic sadface: Password is required" | Media | Sí | ✅ |
| L-06 | Logout desde el menú lateral | Vuelve a la pantalla de login | Media | Sí | ✅ |
| L-07 | Acceso directo a `/inventory.html` sin sesión | Mensaje: "Epic sadface: You can only access '/inventory.html' when you are logged in."  | Media | Sí | ✅ |

## 2. Inventario y ordenación

| ID | Caso | Resultado esperado | Prioridad | Automatizar | Revisado |
|---|---|---|---|---|---|
| I-01 | Visualizar el catálogo | Se muestran 6 productos, cada uno con nombre, descripción, precio e imagen | Alta | Sí | ✅ |
| I-02 | Orden por nombre (A a Z y Z a A) | Los productos se reordenan alfabéticamente según la opción elegida | Media | Sí | ✅ |
| I-03 | Orden por precio (bajo a alto y alto a bajo) | Los productos se reordenan por precio según la opción elegida | Media | Sí | ✅ |
| I-04 | Abrir el detalle de un producto | Se muestra el detalle del producto correcto y se puede volver al catálogo | Baja | No | ✅ |

## 3. Carrito

| ID | Caso | Resultado esperado | Prioridad | Automatizar | Revisado |
|---|---|---|---|---|---|
| C-01 | Añadir un producto desde el catálogo | El contador del carrito pasa a 1 y el botón cambia a "Remove" | Alta | Sí | ✅ |
| C-02 | Añadir tres productos | El contador muestra 3 | Alta | Sí | ✅ |
| C-03 | Quitar un producto desde el catálogo | El contador baja; si era el único, desaparece | Media | Sí | ✅ |
| C-04 | Ver el carrito con productos añadidos | Se listan los productos con nombre, precio y cantidad correctos | Alta | Sí | ✅ |
| C-05 | Quitar un producto desde el carrito | El producto desaparece de la lista y el contador se actualiza | Media | Sí | ✅ |
| C-06 | Pulsar "Continue Shopping" desde el carrito | Vuelve al catálogo manteniendo los productos añadidos | Media | Sí | ✅ |

## 4. Checkout

| ID | Caso | Resultado esperado | Prioridad | Automatizar | Revisado |
|---|---|---|---|---|---|
| K-01 | Compra completa con datos válidos (flujo de extremo a extremo) | Se muestra la confirmación del pedido ("Thank you for your order!") | Alta | Sí | ✅ |
| K-02 | Checkout con nombre vacío | Mensaje de error "Error: First Name is required" | Alta | Sí | ✅ |
| K-03 | Checkout con apellido vacío | Mensaje de error "Error: Last Name is required" | Media | Sí | ✅ |
| K-04 | Checkout con código postal vacío | Mensaje de error "Error: Postal Code is required" | Media | Sí | ✅ |
| K-05 | Resumen del pedido | Subtotal = suma de precios; el impuesto y el total son correctos (comprobar el porcentaje aplicado) | Alta | Sí | ✅ |
| K-06 | Cancelar en el primer paso del checkout | Vuelve al carrito sin perder los productos | Baja | No | ✅ |
| K-07 | Iniciar checkout con el carrito vacío | **Explorar:** comprobar si la aplicación lo permite y si se considera un defecto | Media | No | ✅ |

## 5. Usuarios con comportamientos especiales

| ID | Caso | Resultado esperado / Defecto a verificar | Prioridad | Automatizar | Revisado |
|---|---|---|---|---|---|
| P-01 | `problem_user`: imágenes del catálogo | **Defecto a verificar:** las imágenes de los productos no corresponden al producto | Media | Sí | ✅ |
| P-02 | `problem_user`: añadir y quitar productos y ordenar | **Defecto a verificar:** algunas acciones de carrito u ordenación no funcionan | Alta | Sí | ✅ |
| P-03 | `problem_user`: formulario de checkout | **Defecto a verificar:** algún campo del formulario no se rellena correctamente | Alta | Sí | ✅ |
| P-04 | `error_user`: añadir/quitar y checkout | **Defecto a verificar:** fallos o errores en algunas acciones del flujo | Media | Sí | ✅ |
| P-05 | `performance_glitch_user`: login | El login funciona pero tarda notablemente más; el test debe tolerarlo con un timeout razonable | Media | Sí | ✅ |
| P-06 | `visual_user`: aspecto de la interfaz | **Defecto a verificar:** diferencias visuales respecto a `standard_user` | Baja | No (requiere pruebas visuales) | ✅ |

---
