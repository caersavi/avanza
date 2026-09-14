# Módulos — Matemática básica

Cada carpeta de módulo contiene un `teoria.md` con la teoría del tema,
organizada en secciones (`##`) por subtema. Los subtemas ahí definidos son
los que después alimentan las tarjetas correspondientes en
`../tarjetas/<mismo-modulo>/`.

## Roadmap completo (9 módulos, currículo de Matemáticas Generales)

Se usan **dos libros a la vez**, cada uno donde tiene mejor cobertura —
ver `../libro/libro-ean.pdf` y `../libro/libro-tadeo.pdf`. Trabajamos
activamente solo en los módulos 1-5 (sistemas numéricos); 6-9 quedan
planeados, sin desarrollar todavía.

| # | Carpeta | Módulo | Fuente | Estado |
|---|---|---|---|---|
| 1 | `01-naturales` | Naturales (incluye fracciones, MCM/MCD) | Libro EAN (divisibilidad/primos/MCD/mcm) + jerarquía de operaciones adaptada del libro Tadeo (el EAN no la cubre) | ✅ `teoria.md` escrito |
| 2 | `02-enteros` | Enteros | Libro Tadeo (7 bloques de ejercicios propios) + valor absoluto como contenido propio (0 coincidencias en Tadeo) | ✅ `teoria.md` escrito |
| 3 | `03-racionales` | Racionales | Libro Tadeo | ✅ `teoria.md` escrito |
| 4 | `04-reales` | Reales | Libro Tadeo — propiedades, jerarquía, orden, potenciación, notación científica | ✅ `teoria.md` escrito |
| 5 | `05-irracionales` | Irracionales | Teoría propia — ningún libro demuestra irracionalidad de √2, desarrolla *e*, ni cubre densidad | ✅ `teoria.md` escrito |
| 6 | `06-polinomios` (futuro) | Polinomios | Libro Tadeo, Unidad 2 (pp. 71-104) | ⏸️ Planeado, no iniciado |
| 7 | `07-factorizacion` (futuro) | Factorización (incluye fracciones algebraicas) | Libro Tadeo, Unidad 3 (pp. 105-134) | ⏸️ Planeado, no iniciado |
| 8 | `08-ecuaciones` (futuro) | Ecuaciones (1º y 2º grado, con radicales) | Libro Tadeo, Unidad 4 (pp. 135-192) | ⏸️ Planeado, no iniciado |
| 9 | `09-inecuaciones` (futuro) | Inecuaciones (1er grado, valor absoluto) | **Ningún libro la cubre** — ver huecos abajo | ⏸️ Planeado, sin fuente aún |

Nota de orden: Reales va *antes* que Irracionales en el currículo (el libro
Tadeo introduce R = Q ∪ I dentro de su capítulo de reales, y ahí mismo cubre
propiedades/jerarquía/notación científica; la demostración de irracionalidad,
π, e y densidad quedan como profundización posterior). Las carpetas
`04-reales` y `05-irracionales` ya están numeradas según este orden.

Nota sobre intervalos e inecuaciones: el contenido de intervalos/inecuaciones
que antes vivía dentro de la teoría de Reales se retiró de ahí — ahora es
responsabilidad exclusiva del futuro módulo 9, para no duplicar teoría entre
módulos.

### Módulo 9 — Inecuaciones: confirmado que ningún libro lo cubre

Búsqueda de texto completo sobre las 262 páginas del libro Tadeo:

- `"inecuaci"` — 0 coincidencias
- `"intervalo"` — 0 coincidencias
- `"desigualdad"` — 1 coincidencia (p. 48), y es solo la palabra usada de
  forma informal en un ejercicio de fracciones ("halle una fracción que
  satisfaga las desigualdades..."), no una sección de inecuaciones
- `"valor absoluto"` — 0 coincidencias en todo el libro

El libro EAN tampoco cubre inecuaciones (ya se había detectado que no trae
notación de intervalos). **Conclusión: el módulo 9 completo — tanto
inecuaciones de primer grado como valor absoluto — necesitará teoría propia**,
igual que Irracionales.
