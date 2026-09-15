# Módulo 2 — Números enteros

> Fuente: libro Tadeo (sección 1.1, pp. 23-31). Valor absoluto agregado como
> contenido propio — no aparece en ninguna de las 262 páginas del libro.

## 1. Definición

$$\mathbb{Z} = \{..., -3, -2, -1, 0, +1, +2, +3, ...\}$$

Números como $+5$ y $-5$ se llaman opuestos. El $+$ suele omitirse en
positivos. Sirven para modelar lo que ℕ no puede: temperaturas bajo cero,
deudas, profundidades, ecuaciones como $x+5=3$.

## 2. Recta numérica y valor absoluto

$$-4 \quad -3 \quad -2 \quad -1 \quad 0 \quad 1 \quad 2 \quad 3 \quad 4$$

$$|a| = \begin{cases} a & \text{si } a \geq 0 \\ -a & \text{si } a < 0 \end{cases}$$

**Ejemplo:** $|5|=5$, $|-5|=5$ — opuestos comparten valor absoluto (misma
distancia a 0).

Las barras de valor absoluto también funcionan como símbolo de
agrupación: si hay una operación dentro de ellas, esa operación se
resuelve primero y recién después se aplica el valor absoluto.

**Ejemplo:** $|-8+3| = |-5| = 5$ (no $|-8|+3=11$).

## 3. Adición

$$(-10) + 15 = 5$$

Distinto signo: se resta el menor valor absoluto del mayor; el resultado
toma el signo del mayor.

## 4. Sustracción

$$a - b = a + (-b)$$

**Ejemplo:** $\Delta T = T_f - T_i = 5 - (-3) = 5+3 = 8$.

El orden importa: si $a \neq b$, entonces $a-b \neq b-a$.

## 5. Multiplicación y potenciación

| × | positivo | negativo |
|---|---|---|
| **positivo** | positivo | negativo |
| **negativo** | negativo | positivo |

**Ejemplo:** $3 \times (-5) = -15$.

Con más de dos factores, cuenta cuántos son negativos: un número par de
factores negativos da un resultado positivo, y un número impar da un
resultado negativo.

**Ejemplo:** $(-2)\times(-3)\times(-1) = -6$ (tres factores negativos, un
número impar → resultado negativo).

$$b^n = \underbrace{b \cdot b \cdots b}_{n \text{ factores}}$$

Cuidado con el signo: $(-2)^4=16$ (exponente par) pero $(-2)^5=-32$
(exponente impar).

El paréntesis también importa: en $(-4)^2$ el signo está dentro del
paréntesis y se eleva junto con el 4, así que $(-4)^2=16$. En cambio, en
$-4^2$ el signo queda fuera: primero se eleva el 4 y después se aplica el
signo, así que $-4^2=-(4^2)=-16$. Son expresiones distintas aunque se
parezcan.

## 6. División

$$15 \div (-3) = -5$$

Misma regla de signos que la multiplicación. $4 \div 0$ **no está
definida** — ningún número multiplicado por 0 da 4.

## 7. Propiedades

Conmutativa, asociativa y distributiva aplican igual que en ℕ, incluyendo
signos. Tabla unificada con todas sus formas en el
[módulo de Reales](../04-reales/teoria.md).

## 8. Jerarquía de operaciones

Cuando una expresión combina varias operaciones con enteros, se resuelven
en este orden:

1. Valor absoluto y potencias.
2. Multiplicación y división, de izquierda a derecha.
3. Suma y resta, de izquierda a derecha.

**Ejemplo:** $5 - 2 \times (-3)^2$: primero la potencia, $(-3)^2=9$;
luego la multiplicación, $2\times9=18$; finalmente la resta,
$5-18=-13$.
