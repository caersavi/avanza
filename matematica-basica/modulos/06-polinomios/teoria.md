# Módulo 6 — Polinomios

> Fuente: libro Tadeo, Unidad 2 "Expresiones algebraicas" (secciones
> 2.1-2.6, pp. 71-104).

## 1. Expresiones algebraicas

Una **expresión algebraica** combina números, letras (**variables**) y
operaciones. Una variable representa un número cualquiera de un conjunto.

**Ejemplo:** el costo de $h$ horas de parqueo a 3000 pesos la hora más
2000 pesos fijos se escribe $3000h + 2000$.

**Traducir lenguaje natural a álgebra:**
- "El doble de un número más 5" $\to 2x+5$
- "La diferencia entre un número y su mitad" $\to x-\frac{x}{2}$

**Evaluar** una expresión es sustituir la(s) variable(s) por un valor y
calcular. **Ejemplo:** si $x=4$, entonces $3x+2 = 3(4)+2=14$.

## 2. Polinomios: clasificación y términos

Un **polinomio** es una expresión algebraica donde las variables solo
tienen exponentes enteros no negativos, combinadas con sumas o restas.
Cada parte separada por + o − es un **término**.

**Por número de términos:**

| Nombre | Términos | Ejemplo |
|---|---|---|
| Monomio | 1 | $5x^2$ |
| Binomio | 2 | $3x+7$ |
| Trinomio | 3 | $x^2+2x-1$ |

**Grado** de un polinomio en una variable: el mayor exponente de esa
variable. **Ejemplo:** $4x^3-2x+7$ tiene grado 3.

**Términos semejantes** tienen exactamente la misma parte literal (misma
variable, mismo exponente). **Ejemplo:** $5x^2y$ y $-3x^2y$ son
semejantes; $5x^2y$ y $5xy^2$ no lo son (el exponente de cada variable es
distinto).

## 3. Suma y resta de polinomios

Se suman o restan solo los términos semejantes, operando sus
coeficientes.

**Ejemplo (suma):** $(7a-5b)+(6a+2b) = 7a+6a-5b+2b = 13a-3b$.

**Ejemplo (resta):** para restar, cambia el signo de cada término del
segundo polinomio y suma:
$$(9y+8z)-(6y-10z) = 9y+8z-6y+10z = 3y+18z$$

## 4. Multiplicación de polinomios

**Monomio × monomio:** multiplica los coeficientes y suma los exponentes
de la misma variable (ley de exponentes).
$$(2a^3b^4)(6a^2b^3) = 12a^5b^7$$

**Monomio × polinomio:** aplica la propiedad distributiva.
$$3x(2x^2-5x+1) = 6x^3-15x^2+3x$$

**Polinomio × polinomio:** multiplica cada término del primero por cada
término del segundo, y suma los términos semejantes.
$$(x+3)(x+5) = x^2+5x+3x+15 = x^2+8x+15$$

## 5. Productos especiales

Atajos para productos que aparecen muy seguido — dan el resultado sin
multiplicar término por término.

**Cuadrado de un binomio:**
$$(a+b)^2 = a^2+2ab+b^2 \qquad (a-b)^2=a^2-2ab+b^2$$

**Cubo de un binomio:**
$$(a+b)^3 = a^3+3a^2b+3ab^2+b^3$$

**Diferencia de cuadrados** (suma por diferencia de los mismos términos):
$$(a+b)(a-b) = a^2-b^2$$

**Ejemplo:** $(x+4)^2 = x^2+8x+16$.

## 6. División de polinomios

**Polinomio entre monomio:** divide cada término por separado.
$$\frac{6x^3-9x^2+3x}{3x} = 2x^2-3x+1$$

**Polinomio entre polinomio (división larga):** en cada paso, divide el
término de mayor grado de lo que queda entre el término de mayor grado
del divisor, multiplica ese resultado por todo el divisor, y réstalo —
repite con lo que sobra hasta que el residuo tenga menor grado que el
divisor (misma mecánica que la división larga de números).

**Ejemplo paso a paso:** dividir $x^3-2x^2-5x+6$ entre $x-1$.

**Paso 1:**
$$
\begin{aligned}
\text{Divide: } & x^3 \div x = x^2 \\
\text{Multiplica: } & x^2(x-1) = x^3-x^2 \\
\text{Resta: } & (x^3-2x^2-5x+6)-(x^3-x^2) = -x^2-5x+6
\end{aligned}
$$

**Paso 2** (se repite con lo que quedó, $-x^2-5x+6$):
$$
\begin{aligned}
\text{Divide: } & -x^2 \div x = -x \\
\text{Multiplica: } & -x(x-1) = -x^2+x \\
\text{Resta: } & (-x^2-5x+6)-(-x^2+x) = -6x+6
\end{aligned}
$$

**Paso 3** (se repite con lo que quedó, $-6x+6$):
$$
\begin{aligned}
\text{Divide: } & -6x \div x = -6 \\
\text{Multiplica: } & -6(x-1) = -6x+6 \\
\text{Resta: } & (-6x+6)-(-6x+6) = 0
\end{aligned}
$$

El residuo ya llegó a $0$, así que terminamos. **Cociente:** $x^2-x-6$
(los tres resultados de "Divide" en orden). **Residuo:** $0$ (división
exacta).

**Ejemplo (con residuo):** dividiendo $y^2+24$ entre $y-7$ con el mismo
método se obtiene cociente $y+7$ y residuo $73$ — se comprueba porque
$(y-7)(y+7)=y^2-49$ y $24-(-49)=73$.
