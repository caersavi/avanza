/**
 * <av-exercise-card enunciado="..." estado="pendiente|correcta|incorrecta">
 * Shell visual de una tarjeta de ejercicio. No sabe de matemáticas: solo
 * organiza enunciado + slot de interacción + slot de retroalimentación + botones.
 * Eventos emitidos: 'av-verificar', 'av-pista' (al hacer clic en los botones).
 */
class AvExerciseCard extends HTMLElement {
  static get observedAttributes() { return ['enunciado', 'estado']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._yaMontada = false;
  }

  connectedCallback() {
    this._render();
    this._yaMontada = true;
  }

  // Antes de que el elemento esté conectado (ej. engine.js hace
  // `setAttribute('enunciado', ...)` justo después de crearlo, todavía
  // desconectado), no hace falta re-renderizar: connectedCallback ya lo
  // hará con el atributo puesto. Evita un render "fantasma" y, sobre todo,
  // evita que la animación de entrada (solo pensada para el primer montaje)
  // se dispare de nuevo en cada cambio de atributo posterior (ej. al
  // cambiar `estado` tras verificar una respuesta).
  attributeChangedCallback() {
    if (this._yaMontada) this._render();
  }

  get enunciado() { return this.getAttribute('enunciado') ?? ''; }
  get estado() { return this.getAttribute('estado') ?? 'pendiente'; }
  set estado(valor) { this.setAttribute('estado', valor); }

  _render() {
    // La animación de entrada solo debe verse la primera vez que la tarjeta
    // aparece (un ejercicio nuevo), no en cada re-render por cambio de
    // `estado` (ej. al verificar una respuesta) — ver el comentario en
    // attributeChangedCallback.
    const esPrimerRender = !this._yaMontada;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--av-fuente, system-ui, sans-serif);
          border: 1px solid var(--av-borde, #e2e8f0);
          border-radius: var(--av-radio, 12px);
          padding: 22px;
          background: var(--av-fondo-tarjeta, #ffffff);
          transition: border-color 0.15s ease;
          ${esPrimerRender ? 'animation: av-card-entrada 0.25s ease;' : ''}
        }
        @keyframes av-card-entrada {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          :host { animation: none; }
        }
        :host([estado="correcta"]) { border-color: var(--av-exito, #16a34a); }
        :host([estado="incorrecta"]) { border-color: var(--av-error, #dc2626); }
        .enunciado { font-size: 1.08rem; line-height: 1.5; margin-bottom: 16px; color: var(--av-texto, #1e293b); }
        .bloque { margin-bottom: 16px; }
        .pie { display: flex; gap: 10px; justify-content: flex-end; }
        button {
          font: inherit; font-weight: 600; padding: 10px 20px;
          border-radius: var(--av-radio-control, 8px); border: none;
          cursor: pointer; background: var(--av-acento, #2563eb); color: white;
          transition: filter 0.15s ease, background 0.15s ease, transform 0.1s ease;
        }
        button:hover { filter: brightness(0.93); }
        button:active { transform: scale(0.96); }
        button:focus-visible {
          outline: 2px solid var(--av-texto, #1e293b);
          outline-offset: 2px;
        }
        button.secundario {
          background: transparent; color: var(--av-acento, #2563eb);
          border: 1px solid var(--av-acento, #2563eb);
        }
        button.secundario:hover { background: var(--av-acento-suave, rgba(0,0,0,0.05)); filter: none; }
      </style>
      <div class="enunciado">${this.enunciado}</div>
      <div class="bloque"><slot name="interaccion"></slot></div>
      <div class="bloque"><slot name="retroalimentacion"></slot></div>
      <div class="pie">
        <button class="secundario" data-accion="pista">Pista</button>
        <button data-accion="verificar">Verificar</button>
      </div>
    `;
    this.shadowRoot.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent(`av-${btn.dataset.accion}`, { bubbles: true, composed: true }));
      });
    });
  }
}

customElements.define('av-exercise-card', AvExerciseCard);
export { AvExerciseCard };
