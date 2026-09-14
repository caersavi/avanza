/**
 * <av-input-opcion-multiple> — interacción de tipo "opcion-multiple" y
 * "verdadero-falso" (verdadero-falso es solo una lista de 2 opciones).
 */
class AvInputOpcionMultiple extends HTMLElement {
  set tarjeta(datos) {
    this._tarjeta = datos;
    this._render();
  }

  connectedCallback() { this._render(); }

  _render() {
    if (!this._tarjeta) return;
    const nombre = `opcion-${this._tarjeta.id}`;
    this.innerHTML = (this._tarjeta.opciones ?? []).map((op) => `
      <label style="display:flex; gap:8px; align-items:center; padding:6px 0; cursor:pointer;">
        <input type="radio" name="${nombre}" value="${op.id}">
        <span>${op.texto}</span>
      </label>
    `).join('');
  }

  evaluar() {
    const seleccionado = this.querySelector('input[type="radio"]:checked');
    const valorUsuario = seleccionado?.value ?? null;
    const correcta = valorUsuario !== null && valorUsuario === this._tarjeta.respuesta;
    return { correcta, valorUsuario };
  }
}

customElements.define('av-input-opcion-multiple', AvInputOpcionMultiple);
export { AvInputOpcionMultiple };
