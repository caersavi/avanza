/**
 * <av-number-line min max step marca-cada interactivo modo="click|arrastrar">
 * Recta numérica interactiva compartida por todos los módulos.
 * Propiedades: puntosFijos, puntosInteractivos (arreglos de {valor, etiqueta?, color?}).
 * Evento emitido: 'av-punto-seleccionado' con detail.valor cuando el usuario
 * hace click (modo="click") o arrastra un punto interactivo (modo="arrastrar").
 *
 * `step` controla la precisión del clic/arrastre (a qué valor se "engancha"
 * la selección). `marca-cada` controla cada cuánto se dibuja una marca con
 * su número — puede ser más grande que `step` para no saturar la recta
 * cuando se necesita precisión fina (ej. step=0.1 para ubicar √2≈1,41, pero
 * marca-cada=0.5 para no dibujar 30 números encimados). Si no se indica,
 * usa el mismo valor que `step`.
 *
 * El ancho del SVG se toma del ancho real del elemento en píxeles (no de un
 * viewBox fijo), así que el tamaño de fuente/círculos queda en píxeles reales
 * sin importar si el contenedor es angosto (celular) o ancho (escritorio) —
 * de lo contrario, con un viewBox fijo escalado, el texto se vuelve
 * ilegiblemente pequeño en pantallas angostas.
 */
class AvNumberLine extends HTMLElement {
  static get observedAttributes() {
    return ['min', 'max', 'step', 'marca-cada'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._puntosFijos = [];
    this._puntosInteractivos = [];
  }

  connectedCallback() {
    this._render();
    this._resizeObserver = new ResizeObserver(() => this._render());
    this._resizeObserver.observe(this);
  }

  disconnectedCallback() {
    this._resizeObserver?.disconnect();
  }

  attributeChangedCallback() {
    this._render();
  }

  get min() { return Number(this.getAttribute('min') ?? -10); }
  get max() { return Number(this.getAttribute('max') ?? 10); }
  get step() { return Number(this.getAttribute('step') ?? 1); }
  get marcaCada() { return Number(this.getAttribute('marca-cada') ?? this.step); }
  get interactivo() { return this.hasAttribute('interactivo'); }
  get modo() { return this.getAttribute('modo') ?? 'click'; }

  set puntosFijos(lista) {
    this._puntosFijos = lista ?? [];
    this._render();
  }

  set puntosInteractivos(lista) {
    this._puntosInteractivos = lista ?? [];
    this._render();
  }

  _xDeValor(valor, ancho, margen) {
    const { min, max } = this;
    return margen + ((valor - min) / (max - min)) * (ancho - 2 * margen);
  }

  _valorDeX(x, ancho, margen) {
    const { min, max } = this;
    const proporcion = (x - margen) / (ancho - 2 * margen);
    return min + proporcion * (max - min);
  }

  _render() {
    // Ancho real del elemento en píxeles; con eso, 1 unidad de viewBox = 1px
    // real, así que font-size/radios quedan en píxeles reales de verdad.
    const ancho = this.clientWidth || 600;
    const alto = 90;
    const margen = 24;
    const y = alto / 2;
    const { min, max, marcaCada } = this;

    const marcas = [];
    for (let v = min; v <= max + 1e-9; v += marcaCada) {
      const x = this._xDeValor(v, ancho, margen);
      marcas.push(`
        <line x1="${x}" y1="${y - 6}" x2="${x}" y2="${y + 6}" stroke="var(--av-linea, #64748b)" stroke-width="1"/>
        <text x="${x}" y="${y + 24}" font-size="13" text-anchor="middle" fill="var(--av-texto, #334155)">${Number(v.toFixed(6))}</text>
      `);
    }

    const todosLosPuntos = [
      ...this._puntosFijos.map((p) => ({ ...p, interactivo: false })),
      ...this._puntosInteractivos.map((p) => ({ ...p, interactivo: true })),
    ];

    const puntosSvg = todosLosPuntos.map((p) => {
      const x = this._xDeValor(p.valor, ancho, margen);
      const color = p.color ?? (p.interactivo ? 'var(--av-acento, #2563eb)' : 'var(--av-texto, #1e293b)');
      return `
        <circle data-draggable="${p.interactivo}" cx="${x}" cy="${y}" r="8"
          fill="${color}" stroke="white" stroke-width="2"
          style="cursor:${p.interactivo ? 'grab' : 'default'}"/>
        ${p.etiqueta ? `<text x="${x}" y="${y - 16}" font-size="13" font-weight="600" text-anchor="middle" fill="${color}">${p.etiqueta}</text>` : ''}
      `;
    }).join('');

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        svg { display: block; width: 100%; height: auto; touch-action: none; }
      </style>
      <svg viewBox="0 0 ${ancho} ${alto}" role="img" aria-label="Recta numérica de ${min} a ${max}">
        <line x1="${margen}" y1="${y}" x2="${ancho - margen}" y2="${y}" stroke="var(--av-linea, #64748b)" stroke-width="2"/>
        ${marcas.join('')}
        ${puntosSvg}
      </svg>
    `;

    if (this.interactivo) {
      this._activarInteraccion(ancho, margen);
    }
  }

  _activarInteraccion(ancho, margen) {
    const svg = this.shadowRoot.querySelector('svg');

    const seleccionarDesdeEvento = (evt) => {
      const rect = svg.getBoundingClientRect();
      const escalaX = ancho / rect.width;
      const xSvg = (evt.clientX - rect.left) * escalaX;
      let valor = this._valorDeX(xSvg, ancho, margen);
      valor = Math.round(valor / this.step) * this.step;
      valor = Math.min(this.max, Math.max(this.min, valor));
      this.dispatchEvent(new CustomEvent('av-punto-seleccionado', {
        detail: { valor },
        bubbles: true,
        composed: true,
      }));
    };

    if (this.modo === 'click') {
      svg.addEventListener('click', seleccionarDesdeEvento);
    } else if (this.modo === 'arrastrar') {
      let arrastrando = false;
      svg.addEventListener('pointerdown', (e) => {
        if (e.target?.dataset?.draggable === 'true') arrastrando = true;
      });
      window.addEventListener('pointermove', (e) => {
        if (arrastrando) seleccionarDesdeEvento(e);
      });
      window.addEventListener('pointerup', () => { arrastrando = false; });
    }
  }
}

customElements.define('av-number-line', AvNumberLine);
export { AvNumberLine };
