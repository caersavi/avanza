# Progreso — Avanza

Última actualización: 2026-09-15. Léeme primero al empezar una sesión nueva.

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

**Auditoría de calidad de contenido (2026-09-15) — completa.** Se hizo una
auditoría exhaustiva de los 196 ejercicios + los 5 teoria.md: cada ejercicio
se resolvió de forma independiente (sin mirar la respuesta) para confirmar
que el resultado guardado es matemáticamente correcto, se revisaron pistas y
explicaciones por contradicciones, se comparó cada ejercicio contra lo que
su teoria.md realmente enseña, y se revisó la progresión de dificultad
dentro de cada subtema. Resultado: **0 errores de cálculo** en las 196
tarjetas. Se encontraron y corrigieron: 2 hallazgos críticos (enunciados que
regalaban la respuesta en Irracionales/racionalización), ~10 pistas que
resolvían el ejercicio en vez de orientar, ~15 huecos de teoría (conceptos
que un ejercicio exigía pero teoria.md nunca explicaba — jerarquía de
operaciones en Enteros, porcentajes inversos en Racionales, comparación de
fracciones/negativos y notación científica completa en Reales,
simplificación de radicales y racionalización avanzada en Irracionales,
entre otros), y ~13 recalibraciones de dificultad. Reverificado todo después:
schema 196/196, motor real 196/196, 0 duplicados, y las 5 páginas de teoría
renderizando sin errores de LaTeX/Markdown (se encontró y corrigió un bug
real en el camino: un `$` de pesos colombianos sin escapar correctamente
rompía el extractor de fórmulas de `teoria.html`).

**Lo que esa auditoría NO cubrió** (dejado fuera a propósito, ver sección 2):
observaciones de variedad/repetitividad entre ejercicios del mismo subtema
(sugerencias de estilo, no errores). El pulido de UI/UX sí se auditó y
corrigió aparte, ver siguiente punto.

**Pulido de UI — puntos 2-4 cerrados (2026-09-15).** Los 4 puntos de pulido
pedidos originalmente ya están completos: (1) responsive — verificado con
capturas mobile en una sesión anterior; (2) microinteracciones — agregadas:
animación de entrada al montar una tarjeta nueva (`exercise-card.js`, solo
en el primer montaje, no se repite al cambiar `estado`), fade-in del mensaje
de retroalimentación (`feedback.js`), transición animada en la barra de
progreso, estados `:active` (feedback táctil) en todos los botones/tarjetas,
y `:focus-visible` consistente para navegación por teclado (incluyendo
dentro del shadow DOM de `av-exercise-card`); (3) estados de carga/error —
diseñados con un spinner y una caja de error (icono + mensaje + botón
"Reintentar") usando los tokens `--av-error`/`--av-error-suave`, en vez de
texto plano; (4) consistencia — los 3 estados (carga/error/vacío) ahora
comparten una sola implementación (`mostrarCarga`/`mostrarError` en
`util.js`) usada igual en las 4 páginas, en vez de que cada página lo
resolviera a su manera. Todo respeta `prefers-reduced-motion` (el spinner de
carga queda exento por ser información funcional, no decorativa). Reverificado
después: 196/196 en el motor real, sin errores de consola en las 4 páginas.

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
  búsqueda de texto completo en el libro Tadeo). **Programado para
  retomarse el martes** (según lo acordado el 2026-09-15).
- **`matematica-basica/tarjetas/README.md`** todavía dice "123 en total"
  — desactualizado desde que se amplió a 196. Falta corregir ese número.
- **Observaciones de variedad/repetitividad** en los ejercicios (varias
  tarjetas del mismo subtema comparten plantilla casi idéntica, solo cambian
  los números) — identificadas en la auditoría de 2026-09-15 pero dejadas
  sin tocar a propósito, por ser sugerencias de estilo y no errores. Si se
  quiere más variedad de contexto/formato dentro de un subtema, es trabajo
  pendiente de redacción, no de corrección.
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
