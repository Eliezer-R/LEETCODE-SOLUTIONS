# 1015. Smallest Integer Divisible by K

Dado un entero positivo **k**, necesitas encontrar la longitud del entero positivo más pequeño **n** tal que **n** sea divisible por **k**, y **n** solo contenga el dígito **1**.

Retorna la **longitud** de **n**. Si no existe tal **n**, retorna **-1**.

**Nota:** n puede no caber en un entero con signo de 64 bits.

**Dificultad:** Medium

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `k = 1`
- Salida: `1`
- Explicación: La respuesta más pequeña es n = 1, que tiene longitud 1.

**Ejemplo 2:**

- Entrada: `k = 2`
- Salida: `-1`
- Explicación: No existe tal entero positivo n divisible por 2.

**Ejemplo 3:**

- Entrada: `k = 3`
- Salida: `3`
- Explicación: La respuesta más pequeña es n = 111, que tiene longitud 3.

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Encontrar la longitud del número más pequeño formado solo por 1's que sea divisible por k.
- **Insight clave**: 
  1. Si k es divisible por 2 o 5, es **imposible** encontrar tal número (números formados solo por 1's son siempre impares y nunca terminan en 0 o 5).
  2. Por el **Principio del Palomar**, si existe solución, la encontraremos en máximo k iteraciones.
  3. Usar aritmética modular para evitar overflow: construir `1, 11, 111, 1111, ...` incrementalmente.
- **Técnica**: Simular la construcción del número usando restos, sin construir el número completo.
- **Retos**: Manejar números que no caben en 64 bits usando módulo.

La estrategia usa el hecho de que solo hay k posibles restos (0 a k-1), garantizando que encontraremos un ciclo o una solución en máximo k pasos.

---

## 🔧 Implementación

```javascript
var smallestRepunitDivByK = function (k) {
    // Caso imposible: k tiene factor 2 o 5
    // Números formados por solo 1's nunca son pares ni terminan en 0 o 5
    if (k % 2 === 0 || k % 5 === 0) return -1;

    let rem = 0; // Resto actual al dividir por k

    // Iterar hasta k veces (por el Principio del Palomar)
    for (let length = 1; length <= k; length++) {
        // Construir el siguiente número: rem * 10 + 1
        // Ejemplo: 1 → 11 → 111 → 1111
        // En términos de restos: (resto_anterior * 10 + 1) % k
        rem = (rem * 10 + 1) % k;
        
        // Si el resto es 0, encontramos la respuesta
        if (rem === 0) return length;
    }

    // Si no encontramos solución en k iteraciones, no existe
    return -1;
};

console.log(smallestRepunitDivByK(3)); // 3

/**
 * Ejemplo paso a paso con k = 3:
 * 
 * Verificación inicial:
 *   3 % 2 = 1 (no es 0) ✓
 *   3 % 5 = 3 (no es 0) ✓
 *   → Continuar búsqueda
 * 
 * Estado inicial: rem = 0
 * 
 * Iteración length=1:
 *   Número: "1" (decimal: 1)
 *   rem = (0 * 10 + 1) % 3 = 1 % 3 = 1
 *   1 === 0? → false
 * 
 * Iteración length=2:
 *   Número: "11" (decimal: 11)
 *   rem = (1 * 10 + 1) % 3 = 11 % 3 = 2
 *   2 === 0? → false
 * 
 * Iteración length=3:
 *   Número: "111" (decimal: 111)
 *   rem = (2 * 10 + 1) % 3 = 21 % 3 = 0
 *   0 === 0? → true ✓
 *   return 3
 * 
 * Resultado: 3
 * Verificación: 111 / 3 = 37 ✓
 * 
 * 
 * Ejemplo paso a paso con k = 2:
 * 
 * Verificación inicial:
 *   2 % 2 = 0 ✓
 *   return -1 (imposible)
 * 
 * Explicación: Números formados solo por 1's son siempre impares,
 * nunca divisibles por 2.
 * 
 * 
 * Ejemplo paso a paso con k = 7:
 * 
 * Verificación inicial:
 *   7 % 2 = 1 ✓
 *   7 % 5 = 2 ✓
 *   → Continuar
 * 
 * rem = 0
 * 
 * length=1: rem = (0*10+1)%7 = 1%7 = 1
 * length=2: rem = (1*10+1)%7 = 11%7 = 4
 * length=3: rem = (4*10+1)%7 = 41%7 = 6
 * length=4: rem = (6*10+1)%7 = 61%7 = 5
 * length=5: rem = (5*10+1)%7 = 51%7 = 2
 * length=6: rem = (2*10+1)%7 = 21%7 = 0 ✓
 * 
 * Resultado: 6
 * Número: "111111" = 111,111 / 7 = 15,873 ✓
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(k), máximo k iteraciones.
- **Complejidad espacial**: O(1), solo usamos variables auxiliares.
![rendimiento](./public/rendimiento.png)

*Esta solución es óptima gracias al Principio del Palomar que garantiza encontrar la respuesta en máximo k pasos.*

---

## 🔧 Detalles Técnicos Importantes

**¿Por qué k % 2 == 0 o k % 5 == 0 implica -1?**

Los números formados solo por 1's tienen estas propiedades:
- Son siempre **impares** (terminan en 1)
- Nunca terminan en **0** o **5**

Por lo tanto:
- Si k es par (divisible por 2), el número debe ser par → **imposible**
- Si k es múltiplo de 5, el número debe terminar en 0 o 5 → **imposible**

**Principio del Palomar (Pigeonhole Principle):**

```
Restos posibles al dividir por k: {0, 1, 2, ..., k-1} (total: k restos)

Al construir números 1, 11, 111, ..., calculamos sus restos:
- Si encontramos resto 0 → solución encontrada
- Si no encontramos resto 0 en k iteraciones:
  → Debe haber dos números con el mismo resto (palomar)
  → Se repite un ciclo → nunca llegaremos a 0
  → No hay solución
```

**Construcción del número usando restos:**

```javascript
rem = (rem * 10 + 1) % k
```

Esta fórmula simula agregar un '1' al final del número:
```
Si rem representa el resto de "111"
rem * 10 + 1 representa el resto de "1111"

Ejemplo con k=7:
  "111" % 7 = 6
  "1111" = "111" * 10 + 1
  "1111" % 7 = (6 * 10 + 1) % 7 = 61 % 7 = 5
```

**¿Por qué funciona sin construir el número?**

Propiedad modular:
```
(a * b + c) % k = ((a % k) * b + c) % k
```

Solo nos interesa si el número es divisible (resto = 0), no el número completo.

---

## 🎯 Aprendizajes Clave

- **Principio del Palomar**: Fundamental para probar que k iteraciones son suficientes.
- **Aritmética modular**: Evita overflow y simplifica cálculos.
- **Detección de casos imposibles**: Análisis matemático previo ahorra tiempo.
- **Números Repunit**: Números formados solo por 1's (1, 11, 111, 1111, ...).

---

## 🔍 Casos Edge

- **k = 1**: `1` (el número 1 es divisible por 1)
- **k par**: `-1` (imposible, números con solo 1's son impares)
- **k múltiplo de 5**: `-1` (imposible, no terminan en 0 o 5)
- **k = 3**: `3` (111 es divisible por 3)
- **k = 7**: `6` (111111 es divisible por 7)
- **k = 9**: `9` (111111111 es divisible por 9)
- **k primo (no 2 ni 5)**: Siempre tiene solución

---

## 🧮 Ejemplos Adicionales

```javascript
k = 1  → 1    (1 / 1 = 1)
k = 2  → -1   (imposible)
k = 3  → 3    (111 / 3 = 37)
k = 4  → -1   (imposible, múltiplo de 2)
k = 5  → -1   (imposible)
k = 6  → -1   (imposible, múltiplo de 2)
k = 7  → 6    (111111 / 7 = 15873)
k = 9  → 9    (111111111 / 9 = 12345679)
k = 11 → 2    (11 / 11 = 1)
```

---

## 🚀 Solución con Detección de Ciclos Explícita

Versión alternativa que detecta ciclos explícitamente:

```javascript
var smallestRepunitDivByKCycle = function(k) {
    if (k % 2 === 0 || k % 5 === 0) return -1;
    
    let seen = new Set();
    let rem = 0;
    
    for (let length = 1; length <= k; length++) {
        rem = (rem * 10 + 1) % k;
        
        if (rem === 0) return length;
        
        // Si ya vimos este resto, hay un ciclo
        if (seen.has(rem)) return -1;
        
        seen.add(rem);
    }
    
    return -1;
};
```

**Nota:** Esta versión usa O(k) espacio adicional pero hace el ciclo más explícito.

---

## 🔬 Comparación de Enfoques

| Enfoque | Tiempo | Espacio | Legibilidad | Cuándo usar |
|---------|--------|---------|-------------|-------------|
| **Módulo simple** (presentado) | O(k) | O(1) | ⭐⭐⭐⭐⭐ | Siempre (óptimo) |
| **Con Set de ciclos** | O(k) | O(k) | ⭐⭐⭐⭐ | Para entender ciclos |
| **Construcción directa** | O(k²) | O(k) | ⭐⭐ | Solo educativo (TLE) |

---

## 💡 Visualización del Algoritmo

Para `k = 7`:

```
Número    Decimal    Resto (% 7)
──────────────────────────────────
1         1          1
11        11         4
111       111        6
1111      1111       5
11111     11111      2
111111    111111     0 ✓ → Respuesta: 6

Secuencia de restos: 1 → 4 → 6 → 5 → 2 → 0
```

Para `k = 6` (imposible):

```
6 % 2 = 0 → return -1 inmediatamente
(No necesitamos intentar construir números)
```

---

## 🧠 Intuición del Problema

**¿Por qué el Principio del Palomar garantiza la solución?**

Imagina que tienes k-1 "palomares" (restos posibles: 1, 2, ..., k-1) y estás generando hasta k "palomas" (números):
- Si encuentras resto 0 → solución
- Si no, después de k números, al menos dos deben tener el mismo resto
- Dos números con el mismo resto indican un ciclo
- Si hay ciclo sin pasar por 0, nunca llegaremos a 0

**Ejemplo visual con k=6:**

```
Restos posibles: {0, 1, 2, 3, 4, 5}

Si k tiene factor 2 o 5, el resto 0 es inalcanzable
porque los números con solo 1's tienen propiedades
incompatibles (impar, no terminan en 0/5).

Para k=6:
  6 = 2 × 3, tiene factor 2 → imposible
```


## 🔢 Teorema de los Números Repunit

**Definición:** Un número repunit es un número que consiste solo de 1's.
```
R₁ = 1
R₂ = 11
R₃ = 111
Rₙ = (10ⁿ - 1) / 9
```

**Propiedad importante:**
Para k coprimo con 10 (no divisible por 2 ni 5), existe un n tal que k divide a Rₙ.

Este problema esencialmente pregunta: **¿Cuál es el n más pequeño?**

---

## 🏷️ Tags

`Math` `Number Theory` `Modular Arithmetic` `Medium`

---