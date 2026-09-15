# Módulo 4 — Números reales

> Fuente: libro Tadeo (secciones 1.3, 1.6.1, 1.7, pp. 43-48 y 55-63).
> Intervalos e inecuaciones quedan para el futuro módulo 9. Profundización
> en irracionales (π, e, densidad, demostraciones) en el
> [módulo 5](../05-irracionales/teoria.md).

## 1. Definición

En un cuadrado de lado 1, la diagonal mide $d=\sqrt{2}=1{,}414213562...$
— decimal infinito no periódico: un **irracional**. Racionales (ℚ) e
irracionales (𝕀) juntos forman los **reales**:

$$\mathbb{R} = \mathbb{Q} \cup \mathbb{I}$$

## 2. Propiedades de las operaciones en ℝ

| Propiedad | Regla | Ejemplo |
|---|---|---|
| Conmutativa de la suma | $a+b=b+a$ | $(-9)+8=8+(-9)$ |
| Conmutativa del producto | $a \cdot b = b \cdot a$ | $(-5)\cdot4=4\cdot(-5)$ |
| Asociativa de la suma | $(a+b)+c=a+(b+c)$ | $(-7+4)+8=-7+(4+8)$ |
| Asociativa de la multiplicación | $(a\cdot b)\cdot c=a\cdot(b\cdot c)$ | $((-3)\cdot6)\cdot2=(-3)\cdot(6\cdot2)$ |
| Distributiva | $a(b+c)=ab+ac$ | $5(4+3)=5\cdot4+5\cdot3$ |
| Invertiva de la suma | $a+(-a)=0$ | $8+(-8)=0$ |
| Invertiva de la multiplicación | $a\cdot\frac{1}{a}=1$ ($a\neq0$) | $(-5)\cdot(-\frac{1}{5})=1$ |

Válidas para cualquier real, racional o irracional.

## 3. Jerarquía de operaciones

Mismas 4 reglas del [módulo de Naturales](../01-naturales/teoria.md),
aplicadas ahora con signos y raíces:

$$(-5)(3+(-4)) - 3^3 + (11+(-5)) \div 6$$

## 4. Comparando números reales

$a < b$ si $a$ está a la izquierda de $b$ en la recta.

**Ejemplo:** $-2 < 9$, equivalente a $9 > -2$.

### 4.1 Comparar fracciones

Para comparar dos fracciones, llévalas a un común denominador y compara
los numeradores, o conviértelas a decimal.

**Ejemplo:** ¿Cuál es mayor, $\frac{1}{2}$ o $\frac{2}{3}$? Con común
denominador 6: $\frac{1}{2}=\frac{3}{6}$ y $\frac{2}{3}=\frac{4}{6}$, así
que $\frac{2}{3}$ es mayor. En decimal: $\frac{1}{2}=0{,}5$ y
$\frac{2}{3}=0{,}666...$, mismo resultado.

### 4.2 Comparar dos negativos

Entre dos números negativos, es mayor el que está más cerca de 0 (el de
menor valor absoluto).

**Ejemplo:** $-5 > -8$, porque $-5$ está más cerca de 0 que $-8$ en la
recta numérica.

### 4.3 Ordenar tres o más valores

Convierte todos los valores a una misma forma (decimal suele ser lo más
práctico) y ubícalos en la recta numérica.

**Ejemplo:** Ordena de menor a mayor $\frac{2}{5}$, $0{,}5$ y
$\frac{3}{4}$: en decimal son $0{,}4$, $0{,}5$ y $0{,}75$, así que el
orden es $\frac{2}{5} < 0{,}5 < \frac{3}{4}$.

## 5. Potenciación con exponentes enteros

$$b^1=b \qquad b^0=1 \;(b\neq0) \qquad b^{-n}=\frac{1}{b^n} \;(b\neq0)$$

| Propiedad | Ejemplo |
|---|---|
| $b^m\cdot b^n=b^{m+n}$ | $2^3\cdot2^2=2^5$ |
| $\dfrac{b^m}{b^n}=b^{m-n}$ | $\dfrac{2^2}{2^3}=2^{-1}$ |
| $(b^m)^n=b^{mn}$ | $(2^3)^2=2^6$ |
| $(a\cdot b)^n=a^n\cdot b^n$ | $(4\cdot3)^2=4^2\cdot3^2$ |
| $\left(\dfrac{a}{b}\right)^n=\dfrac{a^n}{b^n}$ | $\left(\dfrac{2}{4}\right)^2=\dfrac{2^2}{4^2}$ |

Cuidado: $(4+3)^2 \neq 4^2+3^2$ — no se distribuye sobre sumas.

## 6. Notación científica

$$a \times 10^n \quad 1 \leq a < 10$$

**Ejemplo:** $40\,400\,000\,000\,000\,000 = 4{,}04 \times 10^{16}$.

### 6.1 Números menores a 1 (exponente negativo)

Cuando el número es menor que 1, el exponente $n$ es negativo.

**Ejemplo:** $0{,}00412 = 4{,}12 \times 10^{-3}$.

### 6.2 De notación científica a notación estándar

Para volver a la notación estándar, mueve el punto decimal $|n|$
lugares: a la derecha si $n$ es positivo, a la izquierda si $n$ es
negativo.

**Ejemplo:** $7{,}08 \times 10^{-4} = 0{,}000708$.

### 6.3 Multiplicar y dividir en notación científica

| Operación | Regla | Ejemplo |
|---|---|---|
| Multiplicación | $(a\times10^m)(b\times10^n)=(a\cdot b)\times10^{m+n}$ | $(3\times10^2)(2\times10^3)=6\times10^5$ |
| División | $\dfrac{a\times10^m}{b\times10^n}=\dfrac{a}{b}\times10^{m-n}$ | $\dfrac{2\times10^3}{4\times10^{-1}}=0{,}5\times10^4$ |

Multiplica (o divide) los factores $a$ y $b$ entre sí, y suma (o resta)
los exponentes de las potencias de 10. Si el resultado del factor queda
fuera del rango $1 \leq a < 10$, ajusta moviendo el punto decimal y
corrigiendo el exponente.
