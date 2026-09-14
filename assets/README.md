# Motor visual — Avanza

Motor genérico en vanilla JS con Web Components, sin dependencias externas.
No conoce matemáticas: renderiza y valida tarjetas de ejercicio a partir de
datos JSON, para que los 5 módulos (y `cursos/` a futuro) compartan el mismo
código.

## Uso

```html
<script type="module">
  import { montarTarjeta } from '/assets/core/engine.js';

  const tarjeta = {
    id: 'irracionales-clasificar-01',
    modulo: 'irracionales',
    subtema: 'clasificacion',
    dificultad: 1,
    tipo: 'opcion-multiple',
    enunciado: '¿√9 es racional o irracional?',
    opciones: [
      { id: 'a', texto: 'Racional' },
      { id: 'b', texto: 'Irracional' },
    ],
    respuesta: 'a',
    explicacion: '√9 = 3, que se puede escribir como fracción 3/1.',
  };

  montarTarjeta(document.querySelector('#contenedor'), tarjeta);
</script>
<div id="contenedor"></div>
```

Cada tarjeta debe cumplir [`schema/exercise.schema.json`](schema/exercise.schema.json).

## Estructura

- `core/numberline/` — `<av-number-line>`: recta numérica interactiva (click o
  arrastrar), configurable en rango/paso, con puntos fijos e interactivos.
- `core/exercise-card/` — `<av-exercise-card>`: shell de la tarjeta (enunciado,
  slots de interacción/retroalimentación, botones verificar/pista).
- `core/feedback/` — `<av-feedback>`: mensaje de retroalimentación inmediata.
- `core/input-types/` — un Web Component por tipo de interacción
  (numérico, opción múltiple, clasificar, arrastrar a la recta, paso a paso).
  Cada uno implementa el contrato `tarjeta` (setter) + `evaluar()`.
- `core/engine.js` — orquestador: dado un contenedor y datos de tarjeta,
  monta el input correcto, escucha verificar/pista y actualiza la
  retroalimentación. Es el único archivo que las páginas de módulo necesitan
  importar.
- `schema/exercise.schema.json` — contrato de datos de toda tarjeta.
- `styles/tokens.css` — variables de diseño compartidas (colores, tipografía).

## Agregar un tipo de interacción nuevo

1. Crear el Web Component en `core/input-types/` implementando `set tarjeta()`
   y `evaluar()` (retorna `{ correcta, valorUsuario }`).
2. Registrarlo en `ETIQUETA_POR_TIPO` en `core/engine.js`.
3. Agregar el `tipo` correspondiente y su validación condicional en
   `schema/exercise.schema.json`.
