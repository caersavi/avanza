# Progreso — Avanza

Última actualización: 2026-09-14. Léeme primero al empezar una sesión nueva.

Avanza es una plataforma web de nivelación en matemáticas básicas para
estudiantes universitarios colombianos. Sitio estático (sin backend),
publicado en GitHub Pages: **https://caersavi.github.io/avanza/matematica-basica/estudiante/index.html**

---

## 1. Qué está completo y funcionando

**Motor de ejercicios** (`assets/`) — vanilla JS con Web Components, sin
frameworks ni dependencias externas. No conoce matemáticas: renderiza y
valida cualquier tarjeta JSON que cumpla `assets/schema/exercise.schema.json`.
6 tipos de interacción soportados: numérico, opción múltiple,
verdadero-falso, clasificar, arrastrar-a-la-recta, paso-a-paso. Agregar
contenido nuevo = agregar un archivo JSON, sin tocar código.

**Diseño visual "Punto de partida"** — implementado en todo el sitio
(portada, módulo, práctica, teoría), responsive mobile-first verificado,
con wordmark "Avanza" en portada y headers secundarios. Ver decisiones de
diseño en la sección 3.

**Módulos 1-5 (sistemas numéricos) — completos:**

| Módulo | Subtemas | Ejercicios | Teoría |
|---|---|---|---|
| 1. Naturales | 6 | 42 | ✅ |
| 2. Enteros | 5 | 35 | ✅ |
| 3. Racionales | 7 | 49 | ✅ |
| 4. Reales | 5 | 35 | ✅ |
| 5. Irracionales | 5 | 35 | ✅ |
| **Total** | **28** | **196** | |

Todos los subtemas tienen mínimo 7 ejercicios con progresión de dificultad,
pistas progresivas y explicación del porqué. Las 196 tarjetas están
validadas contra el schema, revisadas por enunciados duplicados, y
verificadas una por una en el motor real (interacciones de UI reales, no
solo revisión del JSON) — ver sección 4 para cómo repetir esa verificación.

**Portal de estudiante** (`matematica-basica/estudiante/`) —
`index.html` (portada + lista de módulos), `modulo.html` (lista de
subtemas), `practica.html` (tarjetas de ejercicio), `teoria.html`
(teoria.md renderizado con Markdown + LaTeX/MathJax). Progreso guardado en
`localStorage` (por navegador, sin cuenta ni backend): tarjetas vistas,
aciertos, badges de estado (en progreso / completado), precisión %.

**Publicación** — GitHub Pages vía GitHub Actions
(`.github/workflows/static.yml`, deploy automático en cada push a
`master`). Rutas del sitio son **relativas** (no absolutas) porque el sitio
vive en un subpath (`/avanza/...`) — con rutas absolutas se rompía en
producción aunque funcionara en local.

**Libro de referencia** — `matematica-basica/libro/libro-tadeo.pdf`
comprimido de 62MB a 45.2MB (bajo el límite de 50MB de GitHub) sin pérdida
de calidad de texto (extracción de texto byte-idéntica, verificado).

---

## 2. Qué quedó pendiente o a medias

- **Módulos 6-9** (Polinomios, Factorización, Ecuaciones, Inecuaciones) —
  solo planeados en `matematica-basica/modulos/README.md`, sin `teoria.md`
  ni tarjetas todavía. El módulo 9 (Inecuaciones) va a necesitar teoría
  100% propia porque ningún libro de referencia lo cubre (confirmado por
  búsqueda de texto completo en el libro Tadeo).
- **Pulido "siguiente nivel"** — de los 4 puntos pedidos en su momento
  (1. responsive, 2. microinteracciones, 3. estados de carga/error,
  4. consistencia entre páginas), solo el punto 1 (responsive) quedó
  verificado a fondo con capturas mobile. Los puntos 2-4 no tienen
  confirmación explícita de estar terminados — vale la pena auditarlos en
  la próxima sesión antes de asumir que están completos.
- **`matematica-basica/tarjetas/README.md`** todavía dice "123 en total"
  — desactualizado desde que se amplió a 196. Falta corregir ese número.
- **`_test-verificacion-modulo.html`** vive en la raíz del repo (es una
  herramienta de QA para verificar tarjetas en el motor real vía
  `?modulo=X`, no parte del sitio publicado). Sigue siendo útil, pero
  convendría moverla a una carpeta de herramientas de desarrollo si se
  sigue usando, para que no se confunda con contenido del sitio.

---

## 3. Decisiones importantes

**Paleta "Punto de partida"** (en `assets/styles/tokens.css`) — cálida y
alentadora, pensada para estudiantes que pueden sentirse inseguros con la
materia:
- `--av-acento: #E8664B` (coral) — acciones, enlaces, wordmark
- `--av-progreso: #E0A458` (dorado) — estado "en progreso"
- `--av-exito: #4F9153` (verde) — correcto / completado
- `--av-error: #C1503E` (rojo)
- `--av-fondo: #FDF9F6` (crema) / `--av-texto: #2E2033` (ciruela oscuro)
- Tipografías: **Bricolage Grotesque** (títulos/display) + **Work Sans**
  (cuerpo), vía Google Fonts.
- Barra de progreso de cada módulo cambia de color según estado: dorado
  mientras está en progreso, verde cuando se completa.

**Wordmark "Avanza"** — texto solo (Bricolage Grotesque + coral), sin
elemento gráfico adicional. Se probaron un trazo/subrayado orgánico y una
flecha integrada; ambos se descartaron porque se veían desconectados del
logo. Un solo componente reutilizado (`.marca-avanza` en
`estudiante.css`) en las 4 páginas: grande en portada, compacto junto a
las migas en las demás.

**Fuentes bibliográficas por módulo** — se usan **dos libros a la vez**,
cada uno donde tiene mejor cobertura (complemento, no reemplazo):
`libro-ean.pdf` y `libro-tadeo.pdf`. Detalle completo en
`matematica-basica/modulos/README.md`. Resumen:
- Naturales: EAN (divisibilidad/primos/MCD/MCM) + jerarquía de operaciones
  adaptada de Tadeo (el EAN no la cubre)
- Enteros a Reales: principalmente Tadeo
- Irracionales: teoría 100% propia (ningún libro demuestra la
  irracionalidad de √2, desarrolla *e*, ni cubre densidad)
- Reales va *antes* que Irracionales en el currículo porque así los
  presenta el libro Tadeo (R = Q ∪ I dentro del capítulo de reales)
- Intervalos/inecuaciones se retiraron de la teoría de Reales — son
  responsabilidad exclusiva del futuro módulo 9, para no duplicar teoría

**`metadata.fuente` NO va en las tarjetas individuales** — la cita
bibliográfica vive una sola vez en el encabezado de `teoria.md` de cada
módulo; repetirla en cada una de las 196 tarjetas sería redundante.

**Convenciones de nombres/estructura:**
- Carpetas de módulo numeradas: `01-naturales`, `02-enteros`, etc. —
  `matematica-basica/tarjetas/` espeja la numeración de
  `matematica-basica/modulos/`.
- Un archivo `.json` por subtema dentro de `tarjetas/<módulo>/` (sugerido,
  no obligatorio).
- `manifest.json` es la única fuente de verdad de qué archivos de
  tarjetas cargar — si se agrega o quita un archivo, hay que actualizarlo
  ahí. El campo `subtema` de cada tarjeta es la fuente de verdad para
  agrupar/nombrar subtemas, no el manifest.

**Verificación de tarjetas nuevas** — todo lote de tarjetas nuevas o
modificadas se valida contra el schema, se revisa por enunciados
duplicados, y se verifica montándolas en el motor real dentro de un
navegador headless (no alcanza con revisar el JSON a simple vista).

---

## 4. Comandos y pasos que se repiten

**Levantar el servidor local:**
```bash
npx http-server -p 8123 -c-1
```
desde la raíz del repo (`avanza/`), y luego abrir en el navegador:
```
http://localhost:8123/matematica-basica/estudiante/index.html
```

**Publicar cambios (lo hace el usuario manualmente — Claude nunca hace
`git push` por su cuenta salvo que se pida explícitamente):**
```bash
git add <archivos>
git commit -m "..."
git push origin master
```
GitHub Actions despliega automático a GitHub Pages en cada push a
`master` (workflow: `.github/workflows/static.yml`). El sitio en vivo
tarda uno o dos minutos en actualizarse después del push.

**Verificar tarjetas de un módulo en el motor real** (patrón usado para
validar los 196 ejercicios): script de Playwright/patchright que navega
`practica.html?modulo=X&subtema=Y` para cada subtema, autocompleta la
respuesta correcta de cada tarjeta según su `tipo`, hace clic en
"Verificar" con interacciones reales de UI, y reporta cuántas quedaron en
estado `correcta`. Ejemplo de invocación (vía skill `browser-automation`):
```bash
node <ruta-al-skill>/browser.mjs "http://localhost:8123/matematica-basica/estudiante/practica.html?modulo=<id>&subtema=<primer-subtema>" --script qa-modulo-completo.mjs
```
(el script itera el resto de subtemas navegando internamente — ver
scratchpad de la sesión anterior si hace falta recrearlo).
