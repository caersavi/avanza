# Módulo 5 — Números irracionales

> Contenido original — ningún libro demuestra la irracionalidad de √2,
> desarrolla π/e en profundidad, ni cubre densidad. Apoyado en el
> [módulo de Reales](../04-reales/teoria.md) (Pitágoras, R = Q ∪ I).

## 1. Definición

- **Racional:** $a/b$, enteros, $b\neq0$. Decimal **finito** o **periódico**.
- **Irracional:** decimal **infinito no periódico**. No se escribe como
  fracción de enteros.

Todo real es racional o irracional, nunca ambos.

## 2. ¿Por qué $\sqrt{2}$ es irracional? (demostración)

Reducción al absurdo:

1. Supongamos $\sqrt{2}$ racional: $\sqrt{2}=a/b$, fracción ya simplificada
   al máximo.
2. Elevando al cuadrado: $2=a^2/b^2 \Rightarrow a^2=2b^2$.
3. $a^2$ es par $\Rightarrow$ $a$ es par $\Rightarrow$ $a=2k$.
4. Sustituyendo: $(2k)^2=2b^2 \Rightarrow 4k^2=2b^2 \Rightarrow b^2=2k^2$.
5. Por el mismo argumento, $b$ también es par.
6. $a$ y $b$ ambos pares contradice que la fracción estaba simplificada al
   máximo.

Contradicción $\Rightarrow$ $\sqrt{2}$ no puede escribirse como fracción: es
irracional. El mismo argumento aplica a $\sqrt{n}$ para cualquier $n$ que no
sea cuadrado perfecto.

## 3. Ejemplos

- Raíces no exactas: $\sqrt{2}, \sqrt{3}, \sqrt{5}, \sqrt{7}...$
- π, e (sección 4)
- Irracional ± racional = irracional (ej. $1+\sqrt{2}$)

**Cuidado:** irracional + irracional puede dar racional:
$\sqrt{2}+(2-\sqrt{2})=2$.

## 4. π y e

$\pi = \text{circunferencia}/\text{diámetro} = 3{,}141592653...$ — $3{,}14$
es solo una aproximación.

$e \approx 2{,}71828...$ — aparece en crecimiento continuo (interés
compuesto, poblaciones). Ambos son irracionales.

## 5. Ubicación en la recta

Raíces: con Pitágoras (hipotenusa = la raíz buscada, trasladada con compás).
π: por aproximación decimal ($3{,}14$ a $3{,}15$, cada vez más preciso).

## 6. Densidad

Entre dos racionales cualesquiera siempre hay un irracional (y viceversa).

**Ejemplo:** entre 1,41 y 1,42 está $\sqrt{2}=1{,}41421356...$

## 7. Operaciones con radicales

**Suma de semejantes:**
$$3\sqrt{2}+5\sqrt{2}-\sqrt{8} = 3\sqrt{2}+5\sqrt{2}-2\sqrt{2} = 6\sqrt{2}$$

**Multiplicación:**
$$\sqrt{2}\cdot\sqrt{8}=\sqrt{16}=4$$

**Racionalización:**
$$\frac{1}{\sqrt{2}} = \frac{1}{\sqrt{2}}\cdot\frac{\sqrt{2}}{\sqrt{2}} = \frac{\sqrt{2}}{2}$$

## 8. Errores comunes

- Decimal largo ≠ irracional necesariamente ($0{,}\overline{142857}=1/7$, es
  racional).
- $\sqrt{9}=3$ es racional, no irracional.
- $\pi \neq 3{,}14$ exactamente.
- Suma de dos irracionales no siempre es irracional (ver sección 3).
