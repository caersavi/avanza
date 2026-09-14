/**
 * <av-input-clasificar> — interacción de tipo "clasificar".
 * Útil para, por ejemplo, clasificar una lista de valores en
 * racional / irracional. `tarjeta.opciones` trae {valor, categoria}
 * y `tarjeta.categorias` la lista de categorías disponibles.
 */
class AvInputClasificar extends HTMLElement {
  set tarjeta(datos) {
    this._tarjeta = datos;
    this._render();
  }

  connectedCallback() { this._render(); }

  _render() {
    if (!this._tarjeta) return;
    const categorias = this._tarjeta.categorias ?? [];
    this.innerHTML = (this._tarjeta.opciones ?? []).map((item, i) => `
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:6px 0;">
        <span>${item.valor}</span>
        <select data-idx="${i}" style="font: inherit; padding:6px 10px; border-radius:var(--av-radio-control, 6px);
                border:1px solid var(--av-borde, #cbd5e1); color: var(--av-texto, inherit); background: var(--av-fondo-tarjeta, white);">
          <option value="">Elige...</option>
          ${categorias.map((c) => `<option value="${c}">${c}</option>`).join('')}
        </select>
      </div>
    `).join('');
  }

  evaluar() {
    const selects = [...this.querySelectorAll('select')];
    const valorUsuario = selects.map((s) => s.value);
    const correcta = valorUsuario.every(
      (valor, i) => valor !== '' && valor === this._tarjeta.opciones[i].categoria
    );
    return { correcta, valorUsuario };
  }
}

customElements.define('av-input-clasificar', AvInputClasificar);
export { AvInputClasificar };
