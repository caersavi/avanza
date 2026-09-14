/**
 * <av-input-numerico> — interacción de tipo "numerico".
 * Contrato común a todos los input-types: propiedad `tarjeta` (datos que
 * cumplen exercise.schema.json) y método `evaluar()` que retorna
 * { correcta, valorUsuario }.
 */
class AvInputNumerico extends HTMLElement {
  set tarjeta(datos) {
    this._tarjeta = datos;
    this._render();
  }

  connectedCallback() { this._render(); }

  _render() {
    if (!this._tarjeta) return;
    this.innerHTML = `
      <input type="number" step="any" placeholder="Tu respuesta"
        style="font: inherit; font-size:1rem; padding:10px 12px; border-radius:var(--av-radio-control, 6px);
               border:1px solid var(--av-borde, #cbd5e1); width:160px; color: var(--av-texto, inherit);">
    `;
  }

  evaluar() {
    const input = this.querySelector('input');
    const valorUsuario = input.value === '' ? null : Number(input.value);
    const tolerancia = this._tarjeta.tolerancia ?? 0;
    const correcta = valorUsuario !== null &&
      Math.abs(valorUsuario - this._tarjeta.respuesta) <= tolerancia;
    return { correcta, valorUsuario };
  }
}

customElements.define('av-input-numerico', AvInputNumerico);
export { AvInputNumerico };
