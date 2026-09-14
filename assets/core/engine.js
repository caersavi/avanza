/**
 * Motor de tarjetas de Avanza. Punto de entrada único: importa este módulo
 * y usa `montarTarjeta(contenedor, datos)` donde `datos` cumple
 * assets/schema/exercise.schema.json.
 */
import './exercise-card/exercise-card.js';
import './feedback/feedback.js';
import './numberline/number-line.js';
import './input-types/input-numeric.js';
import './input-types/input-choice.js';
import './input-types/input-classify.js';
import './input-types/input-drag-numberline.js';
import './input-types/input-steps.js';

const ETIQUETA_POR_TIPO = {
  'numerico': 'av-input-numerico',
  'opcion-multiple': 'av-input-opcion-multiple',
  'verdadero-falso': 'av-input-opcion-multiple',
  'clasificar': 'av-input-clasificar',
  'arrastrar-recta': 'av-input-arrastrar-recta',
  'paso-a-paso': 'av-input-pasos',
};

/**
 * Monta una tarjeta dentro de `contenedor` (un elemento del DOM).
 * Emite 'av-tarjeta-evaluada' en `contenedor` con detail {id, correcta}
 * cada vez que el estudiante verifica una respuesta.
 */
export function montarTarjeta(contenedor, datos) {
  const etiquetaInput = ETIQUETA_POR_TIPO[datos.tipo];
  if (!etiquetaInput) {
    throw new Error(`Tipo de tarjeta desconocido: ${datos.tipo}`);
  }

  const card = document.createElement('av-exercise-card');
  card.setAttribute('enunciado', datos.enunciado);

  const input = document.createElement(etiquetaInput);
  input.slot = 'interaccion';
  input.tarjeta = datos;

  const feedback = document.createElement('av-feedback');
  feedback.slot = 'retroalimentacion';

  card.append(input, feedback);
  contenedor.innerHTML = '';
  contenedor.append(card);

  let indicePista = 0;

  card.addEventListener('av-verificar', () => {
    const resultado = input.evaluar();
    card.estado = resultado.correcta ? 'correcta' : 'incorrecta';

    if (resultado.correcta) {
      feedback.setAttribute('estado', 'correcta');
      feedback.setAttribute('mensaje', datos.explicacion ?? '¡Correcto!');
    } else {
      feedback.setAttribute('estado', 'incorrecta');
      feedback.setAttribute('mensaje', 'Todavía no. Intenta de nuevo o pide una pista.');
    }

    contenedor.dispatchEvent(new CustomEvent('av-tarjeta-evaluada', {
      detail: { id: datos.id, correcta: resultado.correcta },
      bubbles: true,
    }));
  });

  card.addEventListener('av-pista', () => {
    const pistas = datos.pistas ?? [];
    if (indicePista < pistas.length) {
      feedback.setAttribute('estado', 'pista');
      feedback.setAttribute('mensaje', pistas[indicePista]);
      indicePista += 1;
    }
  });

  return { card, input, feedback };
}
