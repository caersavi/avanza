/**
 * <av-feedback estado="correcta|incorrecta|pista" mensaje="...">
 * Retroalimentación inmediata. No tiene lógica propia: el motor (engine.js)
 * decide qué estado y mensaje mostrar tras evaluar una respuesta.
 */
class AvFeedback extends HTMLElement {
  static get observedAttributes() { return ['estado', 'mensaje']; }

  connectedCallback() { this._render(); }
  attributeChangedCallback() { this._render(); }

  _render() {
    const estado = this.getAttribute('estado');
    const mensaje = this.getAttribute('mensaje') ?? '';
    if (!estado || !mensaje) {
      this.innerHTML = '';
      return;
    }
    const iconos = { correcta: '✓', incorrecta: '✗', pista: '💡' };
    const colores = {
      correcta: 'var(--av-exito, #16a34a)',
      incorrecta: 'var(--av-error, #dc2626)',
      pista: 'var(--av-aviso, #d97706)',
    };
    // Fondos "suaves" como tokens propios en vez de intentar aplicar
    // opacidad a un var() por concatenación de texto (eso genera un valor
    // de color inválido que el navegador descarta en silencio).
    const fondos = {
      correcta: 'var(--av-exito-suave, #dcfce7)',
      incorrecta: 'var(--av-error-suave, #fee2e2)',
      pista: 'var(--av-aviso-suave, #fef3c7)',
    };
    this.innerHTML = `
      <style>
        @keyframes av-feedback-entrada {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .av-feedback-caja { animation: av-feedback-entrada 0.2s ease; }
        @media (prefers-reduced-motion: reduce) {
          .av-feedback-caja { animation: none; }
        }
      </style>
      <div class="av-feedback-caja" style="display:flex; gap:8px; align-items:flex-start; padding:10px 14px;
                  border-radius:var(--av-radio-control, 8px); background:${fondos[estado]}; color:${colores[estado]};
                  font-family: var(--av-fuente, system-ui, sans-serif); font-weight: 500;">
        <span aria-hidden="true">${iconos[estado] ?? ''}</span>
        <span>${mensaje}</span>
      </div>
    `;
  }
}

customElements.define('av-feedback', AvFeedback);
export { AvFeedback };
