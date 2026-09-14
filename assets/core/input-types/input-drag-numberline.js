/**
 * <av-input-arrastrar-recta> — interacción de tipo "arrastrar-recta".
 * Envuelve <av-number-line> y traduce la selección del usuario en la recta
 * a una respuesta evaluable. `tarjeta.recta` define min/max/paso/puntosFijos
 * y `tarjeta.respuesta` es el valor objetivo (con `tarjeta.tolerancia`).
 */
import '../numberline/number-line.js';

class AvInputArrastrarRecta extends HTMLElement {
  set tarjeta(datos) {
    this._tarjeta = datos;
    this._valorSeleccionado = null;
    this._render();
  }

  connectedCallback() { this._render(); }

  _render() {
    if (!this._tarjeta) return;
    const { min = -10, max = 10, paso = 1, marcaCada, puntosFijos = [] } = this._tarjeta.recta ?? {};
    this.innerHTML = '';

    const recta = document.createElement('av-number-line');
    recta.setAttribute('min', min);
    recta.setAttribute('max', max);
    recta.setAttribute('step', paso);
    recta.setAttribute('marca-cada', marcaCada ?? paso);
    recta.setAttribute('interactivo', '');
    recta.setAttribute('modo', 'click');
    recta.puntosFijos = puntosFijos;

    recta.addEventListener('av-punto-seleccionado', (e) => {
      this._valorSeleccionado = e.detail.valor;
      recta.puntosInteractivos = [{ valor: e.detail.valor, etiqueta: 'Tu respuesta' }];
    });

    this.append(recta);
  }

  evaluar() {
    const tolerancia = this._tarjeta.tolerancia ?? this._tarjeta.recta?.paso ?? 0;
    const correcta = this._valorSeleccionado !== null &&
      Math.abs(this._valorSeleccionado - this._tarjeta.respuesta) <= tolerancia;
    return { correcta, valorUsuario: this._valorSeleccionado };
  }
}

customElements.define('av-input-arrastrar-recta', AvInputArrastrarRecta);
export { AvInputArrastrarRecta };
