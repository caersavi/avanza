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

2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97

**Reglas de divisibilidad:**

| Divisible por | Regla | Ejemplo |
|---|---|---|
| 2 | termina en cifra par | 58 sí, 53 no |
| 3 | suma de cifras divisible por 3 | 105 ($1+0+5=6$) sí |
| 5 | termina en 0 o 5 | 205 sí, 48 no |

**Composición de divisores:** si un número es divisible por dos números que
no comparten factores primos entre sí (por ejemplo 2 y 3), también es
divisible por su producto (6). Por eso, para saber si un número es
divisible por 6, basta con comprobar que sea divisible por 2 y por 3 a la
vez.

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
$$
\begin{aligned}
84 &= 2^2\cdot3\cdot7 \\
360 &= 2^3\cdot3^2\cdot5 \\
\text{MCD}(84,360) &= 2^2\cdot3=12
\end{aligned}
$$

El método por factorización se extiende igual a tres o más números: se
factoriza cada uno y se toman los factores comunes a **todos** ellos, con
el menor exponente.
$$
\begin{aligned}
80 &= 2^4\cdot5 \\
75 &= 3\cdot5^2 \\
60 &= 2^2\cdot3\cdot5 \\
\text{MCD}(80,75,60) &= 5
\end{aligned}
$$

**Por Euclides:** se divide el mayor entre el menor, luego el divisor entre
el residuo, hasta residuo 0. El MCD es el último divisor.

$$
\begin{aligned}
258 &=78\cdot3+24 \\
78 &=24\cdot3+6 \\
24 &=6\cdot4+0 \\
\text{MCD}(258,78) &=6
\end{aligned}
$$

**Primos entre sí:** $\text{MCD}(a,b)=1$ (ej. 39 y 32), aunque ninguno sea
primo.

## 6. Mínimo común múltiplo (mcm)

**Por factorización:** todos los factores primos con el mayor exponente.
$$
\begin{aligned}
12 &= 2^2\cdot3 \\
15 &= 3\cdot5 \\
\text{mcm}(12,15) &= 2^2\cdot3\cdot5=60
\end{aligned}
$$

**Fórmula:**
$$\text{mcm}(a,b) = \frac{a \times b}{\text{MCD}(a,b)}$$

Ejemplo:
$$
\begin{aligned}
\text{MCD}(242,110) &= 22 \\
\text{mcm}(242,110) &= \frac{242\times110}{22}=1210
\end{aligned}
$$

*(MCD y mcm se usan directamente en [Racionales](../03-racionales/teoria.md)
para simplificar fracciones y sumar con distinto denominador.)*
