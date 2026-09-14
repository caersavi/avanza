# Tarjetas de ejercicio

Banco de datos de ejercicios, no código. Cada archivo `.json` en las carpetas
de módulo contiene un objeto o un arreglo de objetos que cumplen
[`assets/schema/exercise.schema.json`](../../assets/schema/exercise.schema.json).

El motor en `assets/core/engine.js` renderiza cualquier tarjeta que cumpla el
schema sin necesitar cambios de código — agregar contenido nuevo es agregar
un archivo JSON aquí.

## Organización

Espeja la numeración de `matematica-basica/modulos/`:

```
tarjetas/
├── 01-naturales/
├── 02-enteros/
├── 03-racionales/
├── 04-reales/
└── 05-irracionales/
```

Dentro de cada carpeta de módulo, un archivo por subtema es la convención
sugerida (ej. `05-irracionales/clasificacion.json`,
`05-irracionales/operaciones-con-radicales.json`), pero no es obligatorio.

Los 5 módulos ya tienen ejercicios cargados (123 en total — ver
[`modulos/README.md`](../modulos/README.md) para el detalle por módulo).

## `manifest.json`

Como esto es un sitio estático sin backend, `matematica-basica/estudiante/`
no puede listar el contenido de una carpeta por sí solo — necesita saber de
antemano qué archivos existen. `manifest.json` es ese índice: por cada
módulo, lista su `id`, `nombre` para mostrar, `carpeta` y el arreglo de
`archivos` de tarjetas.

**Importante:** si agregas o quitas un archivo `.json` de tarjetas, actualiza
`manifest.json` para que aparezca (o deje de aparecer) en la vista del
estudiante. El campo `subtema` de cada tarjeta sigue siendo la única fuente
de verdad para agrupar/nombrar subtemas — el manifest solo dice qué archivos
leer, no duplica esa información.
