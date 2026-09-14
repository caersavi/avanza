# Portal del estudiante

Vista del estudiante: selección de módulo → selección de subtema → práctica,
con progreso guardado en `localStorage`.

## Estructura de navegación

```
index.html                          Selección de módulo (5 tarjetas, con % de avance)
  └─ modulo.html?modulo=X           Selección de subtema dentro del módulo X
       └─ practica.html?modulo=X&subtema=Y   Práctica del subtema Y, tarjeta por tarjeta
```

- `util.js` — carga `tarjetas/manifest.json`, descarga y agrupa tarjetas por
  subtema (ordenadas por dificultad ascendente), y humaniza slugs para
  mostrarlos como título (`jerarquia-operaciones` → "Jerarquia Operaciones").
- `progreso.js` — persistencia en `localStorage`, con helpers de resumen:
  `resumenModulo(id)` (agregado de todo el módulo, para `index.html`) y
  `resumenSubtema(modulo, subtema)` (para `modulo.html` y `practica.html`).
- `estudiante.css` — estilos mínimos para que la navegación sea usable.
  El detalle visual (branding, animaciones, feedback más rico) es la
  siguiente fase, deliberadamente pospuesta.

## Cómo funciona `practica.html`

1. Lee `?modulo=` y `?subtema=` de la URL.
2. Descarga las tarjetas del módulo, filtra las del subtema pedido.
3. Monta la tarjeta actual con `montarTarjeta()` (`assets/core/engine.js`).
4. Al recibir `'av-tarjeta-evaluada'` (evento que dispara el motor al
   verificar una respuesta), llama a `registrarResultado()`.
5. Botones Anterior/Siguiente avanzan por la lista; al llegar a la última
   tarjeta, "Siguiente" se convierte en "Terminar" y muestra un resumen de
   aciertos/intentos, con enlaces para repetir el subtema o volver al módulo.

## Requisito para correr esto localmente

Las páginas usan rutas **relativas** (`../../assets/...`, `../tarjetas/...`),
así que funcionan sin importar si el sitio se sirve desde la raíz del dominio
(localhost) o desde una subcarpeta (ej. GitHub Pages en `/avanza/`). Sí deben
servirse por HTTP — no abrirse directamente como `file://`, porque `fetch()`
no funciona con ese esquema. Cualquier servidor estático simple sirve, ej.
`npx serve .` desde la raíz del repo.

## Pendiente (fases siguientes)

- Diseño visual: branding, tipografía, feedback más rico, responsive real.
- Si más adelante se requieren cuentas o progreso entre dispositivos, se
  reemplaza la capa de `progreso.js` por llamadas a un backend, sin tocar
  el motor (`assets/`) ni el banco de tarjetas.
