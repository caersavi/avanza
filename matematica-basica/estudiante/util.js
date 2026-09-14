/**
 * Utilidades compartidas por las páginas de estudiante/: cargar el manifest
 * de tarjetas, cargar todas las tarjetas de un módulo, y dar formato legible
 * a slugs de subtema (ej. "jerarquia-operaciones" -> "Jerarquia Operaciones").
 */

export async function cargarManifest() {
  const res = await fetch('/matematica-basica/tarjetas/manifest.json');
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
      fetch(`/matematica-basica/tarjetas/${modulo.carpeta}/${archivo}`).then((r) => r.json())
    )
  );
  return listas.flat();
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
