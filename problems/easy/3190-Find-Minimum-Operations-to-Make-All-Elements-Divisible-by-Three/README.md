# 3190. Find Minimum Operations to Make All Elements Divisible by Three

Se te da un arreglo de enteros **nums**.

En una operación, puedes sumar o restar **1** de cualquier elemento de `nums`.

Retorna el **número mínimo de operaciones** para hacer que todos los elementos de `nums` sean divisibles por **3**.

**Dificultad:** Easy

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums = [1,2,3,4]`
- Salida: `3`
- Explicación: Todos los elementos del arreglo pueden hacerse divisibles por 3 usando 3 operaciones:
  - Restar 1 de 1. (1 → 0, divisible por 3)
  - Sumar 1 a 2. (2 → 3, divisible por 3)
  - Restar 1 de 4. (4 → 3, divisible por 3)

**Ejemplo 2:**

- Entrada: `nums = [3,6,9]`
- Salida: `0`
- Explicación: Todos los elementos ya son divisibles por 3.

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Contar cuántos elementos necesitan ser ajustados para ser divisibles por 3.
- **Insight clave**: Cualquier número que NO sea divisible por 3 necesita **exactamente 1 operación** para serlo.
  - Si `num % 3 == 1`: Restar 1 → divisible
  - Si `num % 3 == 2`: Sumar 1 → divisible
  - Si `num % 3 == 0`: Ya divisible, 0 operaciones
- **Técnica**: Recorrido simple contando elementos no divisibles.
- **Retos**: Ninguno, el problema es directo una vez que entiendes la propiedad matemática.

La solución es elegantemente simple: solo necesitamos contar cuántos números no son divisibles por 3, ya que cada uno requiere exactamente 1 operación.

---

## 🔧 Implementación

```javascript
var minimumOperations = function(nums) {
    let resul = 0;
    
    // Contar cuántos elementos no son divisibles por 3
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 3 !== 0) {
            resul++;
        }
    }
    
    return resul;
};

console.log(minimumOperations([1,2,3,4])); // 3

/**
 * Ejemplo paso a paso con nums = [1,2,3,4]:
 * 
 * Estado inicial: resul = 0
 * 
 * Iteración i=0, nums[0]=1:
 *   1 % 3 = 1 (no es 0)
 *   resul++ → resul = 1
 *   (Necesita 1 operación: 1-1=0, divisible por 3)
 * 
 * Iteración i=1, nums[1]=2:
 *   2 % 3 = 2 (no es 0)
 *   resul++ → resul = 2
 *   (Necesita 1 operación: 2+1=3, divisible por 3)
 * 
 * Iteración i=2, nums[2]=3:
 *   3 % 3 = 0 ✓
 *   No incrementar
 *   (Ya es divisible por 3, 0 operaciones)
 * 
 * Iteración i=3, nums[3]=4:
 *   4 % 3 = 1 (no es 0)
 *   resul++ → resul = 3
 *   (Necesita 1 operación: 4-1=3, divisible por 3)
 * 
 * Resultado final: resul = 3
 * 
 * 
 * Ejemplo paso a paso con nums = [3,6,9]:
 * 
 * Estado inicial: resul = 0
 * 
 * Iteración i=0, nums[0]=3:
 *   3 % 3 = 0 ✓ → No incrementar
 * 
 * Iteración i=1, nums[1]=6:
 *   6 % 3 = 0 ✓ → No incrementar
 * 
 * Iteración i=2, nums[2]=9:
 *   9 % 3 = 0 ✓ → No incrementar
 * 
 * Resultado final: resul = 0
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n), un solo recorrido del arreglo.
- **Complejidad espacial**: O(1), solo usamos una variable contador.
![rendimiento](./public/rendimiento.png)

*Esta solución es óptima ya que necesitamos examinar cada elemento al menos una vez.*

---

## 🔧 Detalles Técnicos Importantes

**Propiedad Matemática Clave:**

Para cualquier número entero `x`:
```
x % 3 puede ser: 0, 1, o 2

Caso 1: x % 3 == 0
  → x ya es divisible por 3
  → Operaciones necesarias: 0

Caso 2: x % 3 == 1
  → x está 1 más que un múltiplo de 3
  → Restar 1: x - 1 es divisible por 3
  → Operaciones necesarias: 1

Caso 3: x % 3 == 2
  → x está 2 más que un múltiplo de 3
  → Sumar 1: x + 1 es divisible por 3
  → Operaciones necesarias: 1
```

**Ejemplos de cada caso:**

```javascript
// Caso 1: Resto 0
3 % 3 = 0  → 0 operaciones
6 % 3 = 0  → 0 operaciones
9 % 3 = 0  → 0 operaciones

// Caso 2: Resto 1
1 % 3 = 1  → 1 operación (1-1=0)
4 % 3 = 1  → 1 operación (4-1=3)
7 % 3 = 1  → 1 operación (7-1=6)

// Caso 3: Resto 2
2 % 3 = 2  → 1 operación (2+1=3)
5 % 3 = 2  → 1 operación (5+1=6)
8 % 3 = 2  → 1 operación (8+1=9)
```

**¿Por qué siempre es 1 operación?**

Porque el resto de dividir por 3 solo puede ser 0, 1, o 2:
- Si el resto es 1, estamos a **1 paso** de un múltiplo de 3
- Si el resto es 2, estamos a **1 paso** de un múltiplo de 3 (sumando 1)
- La distancia mínima a un múltiplo de 3 nunca es mayor que 1

---

## 🎯 Aprendizajes Clave

- **Propiedad módulo**: El resto al dividir por 3 determina directamente las operaciones necesarias.
- **Optimización greedy**: Cada elemento se puede optimizar independientemente.
- **Simplicidad**: A veces la solución más simple es la correcta.
- **Matemáticas > Algoritmos complejos**: Entender las propiedades del problema es más importante que conocer algoritmos avanzados.

---

## 🔍 Casos Edge

- **Todos divisibles**: `[3,6,9]` → `0`
- **Ninguno divisible**: `[1,2,4,5]` → `4`
- **Un elemento**: `[5]` → `1`
- **Elemento cero**: `[0]` → `0` (0 es divisible por 3)
- **Números grandes**: `[100,101,102]` → `2` (101%3=2, 102%3=0)
- **Array vacío**: `[]` → `0`

---

## 🧮 Ejemplos Adicionales

```javascript
[1,2,3,4]      → 3   (1, 2, 4 no son divisibles)
[3,6,9]        → 0   (todos divisibles)
[1,1,1]        → 3   (todos tienen resto 1)
[2,2,2]        → 3   (todos tienen resto 2)
[0,3,6,9]      → 0   (0 y múltiplos de 3)
[1,4,7,10]     → 3   (10%3=1, todos tienen resto 1)
```

---

## 🚀 Solución Alternativa: Funcional

Versión más concisa usando programación funcional:

```javascript
var minimumOperationsFunctional = function(nums) {
    return nums.filter(num => num % 3 !== 0).length;
};
```

**Ventajas:**
- Más conciso (una línea)
- Estilo funcional más declarativo
- Misma complejidad O(n)

**Desventajas:**
- Crea un arreglo temporal (más uso de memoria)
- Potencialmente más lento que el bucle for

---

## 🔬 Comparación de Enfoques

| Enfoque | Tiempo | Espacio | Legibilidad | Cuándo usar |
|---------|--------|---------|-------------|-------------|
| **For loop** (presentado) | O(n) | O(1) | ⭐⭐⭐⭐⭐ | Siempre (más eficiente) |
| **Filter** | O(n) | O(n) | ⭐⭐⭐⭐ | Código conciso, arrays pequeños |
| **Reduce** | O(n) | O(1) | ⭐⭐⭐ | Preferencia funcional |

---

## 💡 Solución con Reduce

Otra alternativa funcional:

```javascript
var minimumOperationsReduce = function(nums) {
    return nums.reduce((count, num) => count + (num % 3 !== 0 ? 1 : 0), 0);
};
```

Esta versión es O(1) en espacio pero menos legible.

---

## 🧠 Intuición del Problema

**¿Por qué funciona contar simplemente?**

La clave está en que:
1. Cada número puede ajustarse **independientemente**
2. Cada número no divisible necesita **exactamente 1 operación**
3. No hay interacción entre elementos

**Visualización:**

```
Número:  1   2   3   4   5   6   7   8   9
Resto:   1   2   0   1   2   0   1   2   0
         ↓   ↓       ↓   ↓       ↓   ↓
Ops:     1   1   0   1   1   0   1   1   0
```

Cada número con resto 1 o 2 necesita exactamente 1 operación.

---

## 📚 Problemas Relacionados

Este problema es similar a:
- **Minimum Moves to Equal Array Elements**: Operaciones para igualar elementos
- **Count Primes**: Contar elementos que cumplen una propiedad
- **Number of Good Pairs**: Contar pares que cumplen condición

Todos comparten el patrón de contar elementos con una propiedad específica.

---

## 🔢 Análisis Matemático Extendido

**Distribución de restos:**

Para números aleatorios, los restos se distribuyen aproximadamente igual:
- ~33% tienen resto 0 (no necesitan operaciones)
- ~33% tienen resto 1 (necesitan 1 operación)
- ~33% tienen resto 2 (necesitan 1 operación)

Por lo tanto, en promedio, ~66% de los números necesitan operaciones.

**Ejemplo con 100 números aleatorios:**
```
Esperado: ~66 operaciones
```

---

## 🏷️ Tags

`Array` `Math` `Easy`

---