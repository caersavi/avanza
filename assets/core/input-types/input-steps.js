/**
 * <av-input-pasos> — interacción de tipo "paso-a-paso".
 * Para ejercicios de simplificación/justificación guiada, donde el
 * estudiante llena un valor en cada paso (`tarjeta.pasos`: [{texto, esperado}]).
 */

// Ignora espacios (incluidos los internos, ej. "6 √2" vs "6√2") y
// mayúsculas/minúsculas al comparar la respuesta del estudiante.
function normalizar(texto) {
  return texto.replace(/\s+/g, '').toLowerCase();
}

class AvInputPasos extends HTMLElement {
  set tarjeta(datos) {
    this._tarjeta = datos;
    this._render();
  }

  connectedCallback() { this._render(); }

  _render() {
    if (!this._tarjeta) return;
    this.innerHTML = (this._tarjeta.pasos ?? []).map((paso, i) => `
      <div style="display:flex; gap:8px; align-items:center; padding:4px 0;">
        <span>${paso.texto}</span>
        <input type="text" data-idx="${i}"
          style="font: inherit; width:100px; padding:6px 10px; border:1px solid var(--av-borde, #cbd5e1);
                 border-radius:var(--av-radio-control, 6px); color: var(--av-texto, inherit);">
      </div>
    `).join('');
  }

  evaluar() {
    const inputs = [...this.querySelectorAll('input')];
    const valorUsuario = inputs.map((i) => i.value.trim());
    const correcta = valorUsuario.every(
      (valor, i) => valor !== '' && normalizar(valor) === normalizar(String(this._tarjeta.pasos[i].esperado))
    );
    return { correcta, valorUsuario };
  }
}

customElements.define('av-input-pasos', AvInputPasos);
export { AvInputPasos };
