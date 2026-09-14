# Módulo 1 — Números naturales

> Fuente: libro EAN (Cap. 1, pp. 27-49). Jerarquía de operaciones adaptada
> del libro Tadeo (sección 1.3.2) — el EAN no la cubre.

## 1. Naturales y operaciones

$$\mathbb{N} = \{0, 1, 2, 3, 4, 5, ...\}$$

Suma y multiplicación son cerradas en ℕ (el resultado siempre es natural).
Resta y división no lo son: $9-4=5$ funciona, pero $3-7$ no tiene resultado
en ℕ.

## 2. Jerarquía de operaciones

1. Paréntesis
2. Potencias
3. Multiplicación y división, izquierda a derecha
4. Suma y resta, izquierda a derecha

**Ejemplo:**
$$3 + 5 \times 4 + 2^3 - 18 \div 2 = 3 + 20 + 8 - 9 = 22$$

## 3. Divisibilidad

$d$ es divisible por $c$ si existe un natural $b$ tal que $d = c \cdot b$.
$c$ y $b$ son divisores de $d$; $d$ es múltiplo de $c$ y $b$.

**Ejemplo:** 36 es divisible por 2 y por 18, pero no por 7.

**Primo:** mayor que 1, divisible solo por 1 y por sí mismo. **Compuesto:**
admite alguna factorización distinta de la trivial ($d=d\cdot1$). El 1 no es
ni primo ni compuesto.

Primos menores que 100:
$$2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97$$

**Reglas de divisibilidad:**

| Divisible por | Regla | Ejemplo |
|---|---|---|
| 2 | termina en cifra par | 58 sí, 53 no |
| 3 | suma de cifras divisible por 3 | 105 ($1+0+5=6$) sí |
| 5 | termina en 0 o 5 | 205 sí, 48 no |

## 4. Descomposición en factores primos

División sucesiva por primos, de menor a mayor:

$$
\begin{array}{c|c}
360 & 2 \\ 180 & 2 \\ 90 & 2 \\ 45 & 3 \\ 15 & 3 \\ 5 & 5 \\ 1 &
\end{array}
\qquad 360 = 2^3 \cdot 3^2 \cdot 5
$$

## 5. Máximo común divisor (MCD)

**Por factorización:** factores comunes con el menor exponente.
$$84=2^2\cdot3\cdot7 \quad 360=2^3\cdot3^2\cdot5 \quad \text{MCD}(84,360)=2^2\cdot3=12$$

**Por Euclides:** se divide el mayor entre el menor, luego el divisor entre
el residuo, hasta residuo 0. El MCD es el último divisor.

$$258=78\cdot3+24 \qquad 78=24\cdot3+6 \qquad 24=6\cdot4+0 \qquad \text{MCD}(258,78)=6$$

**Primos entre sí:** $\text{MCD}(a,b)=1$ (ej. 39 y 32), aunque ninguno sea
primo.

## 6. Mínimo común múltiplo (mcm)

**Por factorización:** todos los factores primos con el mayor exponente.
$$12=2^2\cdot3 \quad 15=3\cdot5 \quad \text{mcm}(12,15)=2^2\cdot3\cdot5=60$$

**Fórmula:**
$$\text{mcm}(a,b) = \frac{a \times b}{\text{MCD}(a,b)}$$

Ejemplo: $\text{MCD}(242,110)=22 \Rightarrow \text{mcm}(242,110)=\frac{242\times110}{22}=1210$.

*(MCD y mcm se usan directamente en [Racionales](../03-racionales/teoria.md)
para simplificar fracciones y sumar con distinto denominador.)*
