# Progreso — Avanza

Última actualización: 2026-10-07. Léeme primero al empezar una sesión nueva.

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

**Módulos 1-6 (sistemas numéricos + polinomios) — completos:**

| Módulo | Subtemas | Ejercicios | Teoría |
|---|---|---|---|
| 1. Naturales | 6 | 42 | ✅ |
| 2. Enteros | 5 | 35 | ✅ |
| 3. Racionales | 7 | 49 | ✅ |
| 4. Reales | 5 | 35 | ✅ |
| 5. Irracionales | 5 | 35 | ✅ |
| 6. Polinomios | 6 | 42 | ✅ |
| **Total** | **34** | **238** | |

Todos los subtemas tienen mínimo 7 ejercicios con progresión de dificultad,
pistas progresivas y explicación del porqué. Las 238 tarjetas están
validadas contra el schema, revisadas por enunciados duplicados, y
verificadas una por una en el motor real (interacciones de UI reales, no
solo revisión del JSON) — ver sección 4 para cómo repetir esa verificación.
(La auditoría de calidad profunda — resolución independiente, pistas,
alineación con teoría, dificultad — descrita más abajo solo cubrió
Módulos 1-5; Polinomios se validó con schema + motor real + revisión
propia al escribirlo, pero no pasó por esa auditoría exhaustiva todavía.)

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

**Fix: tipo de campo incorrecto en 2 tarjetas de Racionales (reportado por
el usuario, 2026-09-15).** El usuario detectó usando el sitio real que
`racionales-equivalencia-03` no lo dejaba responder — el enunciado hace una
operación sobre una fracción ("Amplifica 2/5 ×3") y antes solo preguntaba
por una pieza aislada del resultado ("¿Cuál es el nuevo denominador?"),
usando `tipo: "numerico"`. Es una redacción confusa: el estudiante espera
responder con la fracción completa, no con un número suelto. Se auditaron
las 49 tarjetas de Racionales con este criterio (operación sobre fracción +
`tipo: "numerico"` que pide solo una pieza del resultado, en vez de la
fracción completa) y se encontraron exactamente 2 con el problema, ambas en
`equivalencia-simplificacion.json`: `racionales-equivalencia-03` y
`racionales-equivalencia-05`. Las 47 tarjetas restantes que sí requieren
fracción completa ya usaban correctamente `tipo: "paso-a-paso"` (campo de
texto libre, acepta "/"). **El motor ya soportaba respuestas en formato de
fracción desde antes** — no hizo falta crear un input type nuevo, solo usar
`paso-a-paso` (que ya usan 47 de las 49 tarjetas del módulo) en vez de
`numerico` en esas 2. Corrección aplicada: ambas ahora piden la fracción
resultante completa en forma a/b vía `paso-a-paso`. Verificado: schema
49/49 sin errores, 0 duplicados, motor real 49/49 correctas (incluida una
verificación específica escribiendo "6/15" a mano en el campo de texto de
`equivalencia-03`, replicando el caso exacto que reportó el usuario).

**Auditoría específica de Irracionales, criterio ampliado (2026-09-15).**
Tras el hallazgo de Racionales, se re-auditaron las 35 tarjetas de
Irracionales con el mismo criterio nuevo (¿el `tipo` de campo coincide con
el formato de respuesta que pide el enunciado?) además de todo lo del
primer round (matemática, pistas, teoría, dificultad). Resultado: **0
mismatches de tipo/formato** — todas las tarjetas que piden un radical o
una fracción con raíz ya usan `paso-a-paso` (texto libre), y las que piden
un número plano ya usan `numerico`. Se encontraron y corrigieron 3 cosas
menores: (1) **hueco de teoría** — `aplicacion-combinada-03` y `-06` piden
calcular una hipotenusa con Pitágoras, y la fórmula
($\text{hipotenusa}^2=\text{cateto}_1^2+\text{cateto}_2^2$) solo estaba en
la pista de esas tarjetas, nunca en `teoria.md` (la única mención a
Pitágoras ahí era sobre construcción geométrica con compás, no sobre
calcular una hipotenusa) — se agregó como regla explícita con ejemplo
propio en la sección 7; (2) **pistas reveladoras** — `clasificacion-01` y
`clasificacion-05` daban la clasificación de 1 y 2 de los 4 valores
respectivamente en vez de solo orientar el método, reescritas; (3)
**dificultad mal calibrada** — `operaciones-radicales-02` (dificultad 2)
usaba la misma técnica exacta que `-01` (dificultad 1, sumar vs. restar
radicales semejantes), bajada a dificultad 1 para igualarlas. Verificado
después: schema 35/35, 0 duplicados, motor real 35/35 correctas, y la
página de teoría renderizando el nuevo bloque de Pitágoras sin errores de
LaTeX.

**Módulo 6 — Polinomios, completo (2026-10-06).** Primer módulo nuevo
desde que se cerraron los 5 originales. Se siguió el mismo proceso que
Naturales-Irracionales: primero se confirmó la cobertura real del libro
Tadeo (Unidad 2 "Expresiones algebraicas", pp. 71-104) extrayendo el texto
del PDF con PyMuPDF, se propusieron 6 subtemas basados en esa estructura y
se pidió aprobación antes de escribir nada. Subtemas:
`expresiones-algebraicas`, `clasificacion-terminos`, `suma-resta`,
`multiplicacion`, `productos-especiales`, `division` — 7 ejercicios cada
uno (42 en total). **Decisión de formato nueva:** las respuestas de tipo
`paso-a-paso` que incluyen exponentes usan notación con `^` (ej. "x^2+6x+9")
en vez de superíndice unicode, porque un superíndice no se puede escribir
fácil desde un teclado normal — cada enunciado que lo requiere incluye la
aclaración "usa ^ para exponentes" (mismo patrón que ya se usó en Reales
para los decimales de notación científica). Se agregó `"polinomios"` al
enum de `modulo` en `assets/schema/exercise.schema.json` (antes solo
tenía los 5 módulos numéricos) y se registró el módulo en
`manifest.json`. **Bug encontrado y corregido en el camino:** el mismo
error de `$` sin escapar en pesos colombianos que ya había aparecido en
Racionales — reapareció en el ejemplo de la sección 1 de esta teoría
nueva, reescrito sin el símbolo de peso. Verificado: schema 42/42, 0
duplicados, motor real 42/42 correctas, teoría renderizando sin errores
de LaTeX. Roadmap actualizado en `modulos/README.md` y conteo total en
`tarjetas/README.md` (123→196→238 según se fue ampliando el proyecto).

**Favicon (2026-10-07).** Monograma "A" blanco sobre fondo coral
redondeado (`assets/favicon.svg`), diseñado y rasterizado con ImageMagick
en los formatos necesarios: `favicon.svg` (navegadores modernos),
`favicon.ico` multi-resolución 16/32/48px (navegadores viejos),
`apple-touch-icon.png` 180px (ícono al agregar el sitio a inicio en
iOS/Android). No contradice la decisión de wordmark "solo texto" (ver
más abajo) — esa fue sobre el logo visible en la página; el favicon es un
contexto distinto (pestaña del navegador, 16-32px) donde el texto
"Avanza" completo no cabe, así que un monograma de una letra es la
solución estándar. Agregado con `<link>` en las 4 páginas del portal.
Verificado: los 4 archivos responden 200, 0 errores de consola.

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

- **Módulos 7-9** (Factorización, Ecuaciones, Inecuaciones) — solo
  planeados en `matematica-basica/modulos/README.md`, sin `teoria.md` ni
  tarjetas todavía (Módulo 6, Polinomios, ya se completó el 2026-10-06).
  El módulo 9 (Inecuaciones) va a necesitar teoría 100% propia porque
  ningún libro de referencia lo cubre (confirmado por búsqueda de texto
  completo en el libro Tadeo).
- **Módulo 6 (Polinomios) sin pasar por la auditoría de calidad
  profunda** que sí tuvieron los módulos 1-5 (resolución independiente de
  cada ejercicio, revisión de pistas/explicaciones, alineación con
  teoria.md, progresión de dificultad, criterio "tipo vs. formato"). Se
  validó con schema + motor real + revisión propia al escribirlo, pero no
  con el proceso de auditoría exhaustiva completo.
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
- **Naturales, Enteros y Reales sin reauditar con el criterio "tipo vs.
  formato de respuesta"** — el criterio se descubrió por un bug real que
  reportó el usuario en Racionales (una tarjeta pedía una fracción pero
  usaba `tipo: "numerico"`). Ya se aplicó a Racionales (2 tarjetas
  corregidas) e Irracionales (0 encontradas), pero los otros 3 módulos
  (Naturales, Enteros, Reales) no se han revisado todavía con este
  criterio específico — vale la pena hacerlo antes de dar por cerrada la
  auditoría completa de los 196 ejercicios.

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

**Color por módulo — descartado (2026-10-06).** Se consideró dar un
acento de color distinto a Polinomios (o a futuros módulos de álgebra)
para diferenciarlo visualmente de los módulos numéricos. Se decidió NO
hacerlo: el color en este sitio ya tiene un significado funcional (coral
= acento/acción, dorado = en progreso, verde = completado, rojo = error);
agregar color por categoría de módulo lo volvería ambiguo y abriría la
pregunta de qué color le toca a cada módulo futuro. Todos los módulos
(1-6, y los futuros 7-9) comparten el mismo acento coral — sin excepción.

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
- Cada módulo nuevo que use variables con exponente (`x²`, `a³`, etc.)
  debe agregarse al enum `modulo` en
  `assets/schema/exercise.schema.json`, o la validación de schema falla
  — se descubrió al crear Polinomios (módulo 6).

**Exponentes en respuestas de texto libre (`paso-a-paso`)** — usar
notación con `^` (ej. "x^2+6x+9"), nunca superíndice unicode (²³), porque
un superíndice no se puede escribir desde un teclado normal y el
estudiante quedaría sin forma de responder. Cada enunciado que lo requiere
debe aclararlo explícitamente (ej. "usa ^ para exponentes, ej. x^2+2x+1")
— mismo patrón que ya se usó en Reales para los decimales de notación
científica. Establecido al escribir Polinomios (módulo 6); aplica también
a los futuros módulos 7-9.

**Verificación de tarjetas nuevas** — todo lote de tarjetas nuevas o
modificadas se valida contra el schema, se revisa por enunciados
duplicados, y se verifica montándolas en el motor real dentro de un
navegador headless (no alcanza con revisar el JSON a simple vista).
**Criterio agregado (2026-09-15, tras el fix de Racionales):** además de
que la respuesta sea matemáticamente correcta, hay que revisar que el
`tipo` de campo coincida con el formato que el enunciado realmente pide —
una tarjeta que exige una fracción o un radical como respuesta (formato
"a/b" o "a√b") debe usar `tipo: "paso-a-paso"` (texto libre), nunca
`tipo: "numerico"` (que solo acepta un número suelto). Este chequeo no
estaba en la lista original y causó un bug real que un estudiante reportó
usando el sitio — ya se aplicó retroactivamente a Racionales e
Irracionales (0 casos encontrados en Irracionales); Naturales, Enteros y
Reales no se han reauditado todavía con este criterio específico.

**Capacidad del sitio (analizado 2026-09-15)** — se confirmó que no hay
riesgo de saturación por muchos estudiantes entrando a la vez. Razón
arquitectónica: el sitio es 100% estático (sin backend, sin base de datos),
servido por GitHub Pages a través de una CDN (Fastly) — no existe un cupo de
"conexiones simultáneas" como en un servidor tradicional, y el progreso de
cada estudiante vive solo en su propio `localStorage`, nunca en un servidor
compartido. El único límite real es el de GitHub Pages (confirmado en su
documentación oficial): **100 GB de transferencia al mes** (límite blando,
no un corte automático). Cada sesión de estudiante pesa muy poco (~1 MB o
menos: el HTML/CSS/JS/JSON del sitio son unos pocos KB por módulo; MathJax y
la fuente de Google se cargan desde sus propios CDN y no cuentan contra ese
límite; el PDF del libro de 45 MB **no está enlazado desde el portal del
estudiante**, así que tampoco pesa). Con eso, el sitio soporta
cómodamente decenas de miles de sesiones al mes — muy por encima de lo que
necesita un curso universitario. Si algún día el tráfico se vuelve masivo de
verdad, la salida es trivial: mover el mismo contenido estático a otro host
gratuito sin ese límite blando (Cloudflare Pages, Netlify), sin cambiar
código.

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
