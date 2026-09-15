/**
 * Utilidades compartidas por las páginas de estudiante/: cargar el manifest
 * de tarjetas, cargar todas las tarjetas de un módulo, y dar formato legible
 * a slugs de subtema (ej. "jerarquia-operaciones" -> "Jerarquia Operaciones").
 */

export async function cargarManifest() {
  const res = await fetch('../tarjetas/manifest.json');
  if (!res.ok) throw new Error(`No se pudo cargar manifest.json (${res.status})`);
  const datos = await res.json();
  return datos.modulos;
}

export async function obtenerModulo(idModulo) {
  const modulos = await cargarManifest();
  const modulo = modulos.find((m) => m.id === idModulo);
  if (!modulo) throw new Error(`Módulo desconocido: ${idModulo}`);
  return modulo;
}

/** Descarga todos los archivos de tarjetas de un módulo y los combina en un
 *  solo arreglo plano. */
export async function cargarTarjetasDeModulo(modulo) {
  const listas = await Promise.all(
    modulo.archivos.map((archivo) =>
      fetch(`../tarjetas/${modulo.carpeta}/${archivo}`).then((r) => r.json())
    )
  );
  return listas.flat();
}

/** Descarga el teoria.md (texto crudo, sin procesar) del módulo. Vive en
 *  matematica-basica/modulos/<carpeta>/teoria.md — usa la misma `carpeta`
 *  que el manifest de tarjetas, porque ambas carpetas comparten numeración. */
export async function cargarTeoriaDeModulo(modulo) {
  const res = await fetch(`../modulos/${modulo.carpeta}/teoria.md`);
  if (!res.ok) throw new Error(`No se pudo cargar la teoría de este módulo (${res.status}).`);
  return res.text();
}

/** Agrupa un arreglo de tarjetas por su campo `subtema`, preservando el
 *  orden de aparición y ordenando cada grupo por dificultad ascendente. */
export function agruparPorSubtema(tarjetas) {
  const grupos = new Map();
  for (const tarjeta of tarjetas) {
    if (!grupos.has(tarjeta.subtema)) grupos.set(tarjeta.subtema, []);
    grupos.get(tarjeta.subtema).push(tarjeta);
  }
  for (const lista of grupos.values()) {
    lista.sort((a, b) => a.dificultad - b.dificultad);
  }
  return grupos;
}

/** Reemplaza el contenido de `contenedor` con un estado de carga (spinner +
 *  mensaje), consistente en las 4 páginas de estudiante/. */
export function mostrarCarga(contenedor, mensaje = 'Cargando…') {
  contenedor.innerHTML = `
    <div class="estado-carga">
      <span class="spinner" aria-hidden="true"></span>
      <span></span>
    </div>`;
  contenedor.querySelector('span:last-child').textContent = mensaje;
}

/** Reemplaza el contenido de `contenedor` con un estado de error (icono +
 *  mensaje + botón de reintentar), consistente en las 4 páginas. El mensaje
 *  se inserta con textContent (nunca como HTML) porque puede contener texto
 *  derivado de la URL (ej. un id de módulo desconocido). */
export function mostrarError(contenedor, mensaje, alReintentar = () => location.reload()) {
  contenedor.innerHTML = `
    <div class="estado-error">
      <span class="icono" aria-hidden="true">⚠</span>
      <div>
        <p></p>
        <button type="button">Reintentar</button>
      </div>
    </div>`;
  contenedor.querySelector('p').textContent = mensaje;
  contenedor.querySelector('button').addEventListener('click', alReintentar);
}

// Palabras que son siglas y van completas en mayúscula (no solo la
// primera letra) al humanizar un slug de subtema.
const SIGLAS = new Set(['mcd', 'mcm']);

export function humanizar(slug) {
  return slug
    .split('-')
    .map((palabra) =>
      SIGLAS.has(palabra) ? palabra.toUpperCase() : palabra.charAt(0).toUpperCase() + palabra.slice(1)
    )
    .join(' ');
}
