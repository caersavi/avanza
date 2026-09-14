/**
 * Seguimiento de progreso del estudiante. Sin backend por ahora: se guarda
 * en localStorage del navegador, por módulo y subtema. Si más adelante se
 * necesitan cuentas/persistencia entre dispositivos, esta es la capa a
 * reemplazar por llamadas a un backend, sin tocar el motor ni las tarjetas.
 */
const CLAVE_ALMACENAMIENTO = 'avanza:progreso-estudiante';

function leerProgreso() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_ALMACENAMIENTO)) ?? {};
  } catch {
    return {};
  }
}

function guardarProgreso(progreso) {
  localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(progreso));
}

/** Número de tarjetas ÚNICAS cuyo último resultado registrado fue correcto.
 *  No se puede derivar de un contador acumulado (ver nota en
 *  `registrarResultado`): hay que recalcularlo desde `tarjetas` cada vez. */
function contarAciertos(bloque) {
  return Object.values(bloque.tarjetas).filter(Boolean).length;
}

/** Registra el resultado de una tarjeta. Se llama al escuchar
 *  'av-tarjeta-evaluada' desde el motor (ver assets/core/engine.js).
 *
 *  `tarjetas[tarjetaId]` guarda solo el ÚLTIMO resultado de esa tarjeta
 *  (se sobrescribe en cada intento) — así "aciertos" (derivado de este mapa,
 *  ver `contarAciertos`) cuenta ejercicios únicos correctos, sin inflarse si
 *  el estudiante vuelve a verificar la misma tarjeta más de una vez.
 *  `intentos` sí es acumulativo a propósito: cuenta cada clic en "Verificar",
 *  reintentos incluidos. */
export function registrarResultado(modulo, subtema, tarjetaId, correcta) {
  const progreso = leerProgreso();
  progreso[modulo] ??= {};
  progreso[modulo][subtema] ??= { tarjetas: {}, intentos: 0 };
  const bloque = progreso[modulo][subtema];
  bloque.tarjetas[tarjetaId] = correcta;
  bloque.intentos += 1;
  guardarProgreso(progreso);
  return { ...bloque, aciertos: contarAciertos(bloque) };
}

export function obtenerProgresoModulo(modulo) {
  return leerProgreso()[modulo] ?? {};
}

export function obtenerProgresoCompleto() {
  return leerProgreso();
}

export function reiniciarProgreso() {
  localStorage.removeItem(CLAVE_ALMACENAMIENTO);
}

/** Totales de aciertos/intentos/tarjetas vistas, agregados de todos los
 *  subtemas de un módulo. Útil para la tarjeta de módulo en index.html. */
export function resumenModulo(modulo) {
  const datos = obtenerProgresoModulo(modulo);
  let aciertos = 0;
  let intentos = 0;
  let tarjetasVistas = 0;
  Object.values(datos).forEach((bloque) => {
    aciertos += contarAciertos(bloque);
    intentos += bloque.intentos;
    tarjetasVistas += Object.keys(bloque.tarjetas).length;
  });
  return { aciertos, intentos, tarjetasVistas };
}

/** Totales de un subtema puntual dentro de un módulo. Útil para la lista de
 *  subtemas en modulo.html. */
export function resumenSubtema(modulo, subtema) {
  const datos = obtenerProgresoModulo(modulo);
  const bloque = datos[subtema] ?? { tarjetas: {}, intentos: 0 };
  return {
    aciertos: contarAciertos(bloque),
    intentos: bloque.intentos,
    tarjetasVistas: Object.keys(bloque.tarjetas).length,
  };
}
