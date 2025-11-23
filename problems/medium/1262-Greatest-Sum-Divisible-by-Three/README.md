# 1262. Greatest Sum Divisible by Three

Dado un arreglo de enteros **nums**, retorna la **suma máxima posible** de elementos del arreglo tal que sea **divisible por tres**.

**Dificultad:** Medium

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums = [3,6,5,1,8]`
- Salida: `18`
- Explicación: Elegimos los números 3, 6, 1 y 8, su suma es 18 (suma máxima divisible por 3).

**Ejemplo 2:**

- Entrada: `nums = [4]`
- Salida: `0`
- Explicación: Como 4 no es divisible por 3, no elegimos ningún número.

**Ejemplo 3:**

- Entrada: `nums = [1,2,3,4,4]`
- Salida: `12`
- Explicación: Elegimos los números 1, 3, 4 y 4, su suma es 12 (suma máxima divisible por 3).

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Encontrar la suma máxima que sea divisible por 3.
- **Insight clave**: Si la suma total no es divisible por 3, necesitamos **eliminar** el/los número(s) más pequeño(s) con el resto apropiado para hacer la suma divisible.
- **Técnica**: Rastrear los números más pequeños con resto 1 y resto 2, luego decidir qué eliminar según el resto de la suma total.
- **Retos**: Manejar los casos donde necesitamos eliminar uno o dos números para hacer la suma divisible.

La estrategia es calcular la suma total y, si no es divisible por 3, determinar qué números eliminar basándose en el resto de la suma.

---

## 🔧 Implementación

```javascript
var maxSumDivThree = function (nums) {
    let remainOne = Infinity;  // El número más pequeño con resto 1
    let remainTwo = Infinity;  // El número más pequeño con resto 2
    let sum = 0;               // Suma total de todos los números

    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];

        // Si el número tiene resto 1 al dividir por 3
        if (nums[i] % 3 === 1) {
            let revOne = remainOne;
            let revTwo = remainTwo;
            
            // Actualizar el número más pequeño con resto 1
            remainOne = Math.min(revOne, nums[i]);
            
            // El más pequeño con resto 2 podría ser este número + el anterior más pequeño con resto 1
            // (1 + 1) % 3 = 2
            remainTwo = Math.min(revTwo, nums[i] + revOne);
        }
        // Si el número tiene resto 2 al dividir por 3
        else if (nums[i] % 3 === 2) {
            let revOne = remainOne;
            let revTwo = remainTwo;
            
            // El más pequeño con resto 1 podría ser este número + el anterior más pequeño con resto 2
            // (2 + 2) % 3 = 1
            remainOne = Math.min(revOne, nums[i] + revTwo);
            
            // Actualizar el número más pequeño con resto 2
            remainTwo = Math.min(revTwo, nums[i]);
        }
    }

    // Calcular el resto de la suma total
    let resul = sum % 3;

    // Si la suma ya es divisible por 3, retornarla
    if (resul % 3 === 0) return sum;
    
    // Si el resto es 1, eliminar el número más pequeño con resto 1
    if (resul % 3 === 1) return sum - remainOne;
    
    // Si el resto es 2, eliminar el número más pequeño con resto 2
    return sum - remainTwo;
};

console.log(maxSumDivThree([3,6,5,1,8])); // 18

/**
 * Ejemplo paso a paso con nums = [3,6,5,1,8]:
 * 
 * Estado inicial:
 *   remainOne = ∞, remainTwo = ∞, sum = 0
 * 
 * Iteración i=0, nums[0]=3:
 *   sum = 0 + 3 = 3
 *   3 % 3 = 0 → No actualizar remainOne ni remainTwo
 *   Estado: sum=3, remainOne=∞, remainTwo=∞
 * 
 * Iteración i=1, nums[1]=6:
 *   sum = 3 + 6 = 9
 *   6 % 3 = 0 → No actualizar
 *   Estado: sum=9, remainOne=∞, remainTwo=∞
 * 
 * Iteración i=2, nums[2]=5:
 *   sum = 9 + 5 = 14
 *   5 % 3 = 2 → Entrar al bloque "resto 2"
 *   revOne = ∞, revTwo = ∞
 *   remainOne = min(∞, 5 + ∞) = ∞
 *   remainTwo = min(∞, 5) = 5
 *   Estado: sum=14, remainOne=∞, remainTwo=5
 * 
 * Iteración i=3, nums[3]=1:
 *   sum = 14 + 1 = 15
 *   1 % 3 = 1 → Entrar al bloque "resto 1"
 *   revOne = ∞, revTwo = 5
 *   remainOne = min(∞, 1) = 1
 *   remainTwo = min(5, 1 + ∞) = 5
 *   Estado: sum=15, remainOne=1, remainTwo=5
 * 
 * Iteración i=4, nums[4]=8:
 *   sum = 15 + 8 = 23
 *   8 % 3 = 2 → Entrar al bloque "resto 2"
 *   revOne = 1, revTwo = 5
 *   remainOne = min(1, 8 + 5) = min(1, 13) = 1
 *   remainTwo = min(5, 8) = 5
 *   Estado: sum=23, remainOne=1, remainTwo=5
 * 
 * Decisión final:
 *   resul = 23 % 3 = 2
 *   resul === 2 → return sum - remainTwo = 23 - 5 = 18 ✓
 * 
 * Explicación: La suma total es 23, que tiene resto 2.
 * Para hacerla divisible por 3, eliminamos el número más pequeño
 * con resto 2, que es 5. Resultado: 23 - 5 = 18.
 * 
 * 
 * Ejemplo paso a paso con nums = [1,2,3,4,4]:
 * 
 * sum acumulada: 1+2+3+4+4 = 14
 * 14 % 3 = 2
 * 
 * Durante el proceso:
 * - Encontramos nums con resto 1: 1, 4, 4 → remainOne rastreará el más pequeño
 * - Encontramos nums con resto 2: 2 → remainTwo = 2
 * - Nums con resto 0: 3
 * 
 * remainOne será 1 (el más pequeño con resto 1)
 * remainTwo será 2 (el más pequeño con resto 2)
 * 
 * Como sum % 3 = 2, eliminamos remainTwo = 2
 * Resultado: 14 - 2 = 12 ✓
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n), un solo recorrido del arreglo.
- **Complejidad espacial**: O(1), solo usamos tres variables auxiliares.
![rendimiento](./public/rendimiento.png)

*Esta solución es eficiente ya que procesa cada elemento exactamente una vez.*

---

## 🔧 Detalles Técnicos Importantes

**Lógica de actualización de `remainOne` y `remainTwo`:**

El algoritmo mantiene los **números más pequeños** (o suma de números más pequeña) con resto 1 y resto 2:

```javascript
// Para números con resto 1:
remainOne = Math.min(remainOne, nums[i]);
// También: (1 + 1) % 3 = 2
remainTwo = Math.min(remainTwo, nums[i] + remainOne);

// Para números con resto 2:
remainTwo = Math.min(remainTwo, nums[i]);
// También: (2 + 2) % 3 = 1
remainOne = Math.min(remainOne, nums[i] + remainTwo);
```

**¿Por qué esta lógica funciona?**

1. **Un número con resto 1**: Es candidato para ser eliminado si la suma tiene resto 1
2. **Dos números con resto 1**: Su suma tiene resto 2 → candidatos si la suma tiene resto 2
3. **Un número con resto 2**: Es candidato para ser eliminado si la suma tiene resto 2
4. **Dos números con resto 2**: Su suma tiene resto 1 → candidatos si la suma tiene resto 1

**Tabla de restos:**

```
Resto 1 + Resto 1 = (1+1) % 3 = 2
Resto 2 + Resto 2 = (2+2) % 3 = 1
Resto 1 + Resto 2 = (1+2) % 3 = 0
```

**Estrategia de eliminación:**

```javascript
if (sum % 3 === 0) → No eliminar nada
if (sum % 3 === 1) → Eliminar remainOne (1 número con resto 1, o 2 con resto 2)
if (sum % 3 === 2) → Eliminar remainTwo (1 número con resto 2, o 2 con resto 1)
```

---

## 🎯 Aprendizajes Clave

- **Enfoque de eliminación**: En lugar de seleccionar qué incluir, calculamos todo y eliminamos lo mínimo.
- **Rastreo de candidatos**: Mantener los números más pequeños para cada resto es crucial.
- **Aritmética modular**: Entender cómo los restos se combinan es fundamental.
- **Optimización greedy**: Eliminar los números más pequeños maximiza la suma resultante.

---

## 🔍 Casos Edge

- **Suma ya divisible**: `[3,6,9]` → `18` (no eliminar nada)
- **Eliminar un elemento**: `[3,6,5,1,8]` → `18` (eliminar 5)
- **Eliminar múltiples**: `[1,1,1]` → `0` (eliminar al menos dos 1s)
- **Un solo elemento**: `[4]` → `0` (no divisible por 3)
- **Un elemento divisible**: `[9]` → `9`
- **Array vacío**: `[]` → `0`
- **Todos con resto 1**: `[1,4,7]` → `0` o eliminar 2

---

## 🧮 Ejemplos Adicionales

```javascript
[3,6,5,1,8]    → 18  (eliminar 5)
[4]            → 0   (4 no es divisible)
[1,2,3,4,4]    → 12  (eliminar 2)
[3,6,9]        → 18  (suma ya divisible)
[2,2,2,2]      → 6   (2+2+2=6)
[1,1,1,1,1,1]  → 6   (seis 1s, suma=6)
```

---

## 🚀 Solución Alternativa: Dynamic Programming

Un enfoque alternativo usando DP explícito:

```javascript
var maxSumDivThreeDP = function(nums) {
    // dp[i] = máxima suma con resto i al dividir por 3
    let dp = [0, -Infinity, -Infinity];
    
    for (let num of nums) {
        let temp = [...dp];
        for (let i = 0; i < 3; i++) {
            let newRemainder = (i + num % 3) % 3;
            dp[newRemainder] = Math.max(dp[newRemainder], temp[i] + num);
        }
    }
    
    return dp[0];
};
```

**Complejidad:** O(n) tiempo, O(1) espacio

Esta versión es más intuitiva pero conceptualmente similar.

---

## 🔬 Comparación de Enfoques

| Enfoque | Tiempo | Espacio | Legibilidad | Cuándo usar |
|---------|--------|---------|-------------|-------------|
| **Eliminación** (presentado) | O(n) | O(1) | ⭐⭐⭐ | Entender aritmética modular |
| **DP explícito** | O(n) | O(1) | ⭐⭐⭐⭐ | Más intuitivo |
| **Backtracking** | O(2ⁿ) | O(n) | ⭐⭐ | Solo para aprender (TLE) |

---

## 💡 Visualización del Algoritmo

Para `nums = [3,6,5,1,8]`:

```
Paso 1: Calcular suma total
  3 + 6 + 5 + 1 + 8 = 23
  23 % 3 = 2

Paso 2: Identificar números por resto
  Resto 0: 3, 6
  Resto 1: 1
  Resto 2: 5, 8

Paso 3: Encontrar mínimos
  remainOne = 1 (más pequeño con resto 1)
  remainTwo = 5 (más pequeño con resto 2)

Paso 4: Eliminar según resto de suma
  sum % 3 = 2 → Eliminar remainTwo = 5
  Resultado: 23 - 5 = 18 ✓
```

---

## 🧠 Intuición del Problema

**¿Por qué eliminar en lugar de seleccionar?**

Porque es más fácil:
1. Sumar todo es O(n)
2. Decidir qué eliminar basándose en restos es O(1)
3. Si tratáramos de seleccionar desde cero, necesitaríamos explorar muchas combinaciones

**Analogía:**
Es como llenar una caja con todas las frutas disponibles, y luego quitar las más pequeñas si el peso total no es divisible por 3. Más simple que intentar elegir la combinación correcta desde el principio.

---

## 📚 Problemas Relacionados

Este problema es similar a:
- **Target Sum**: Seleccionar elementos para lograr una suma objetivo
- **Partition Equal Subset Sum**: Dividir array en subsets con suma igual
- **Coin Change**: Encontrar combinaciones óptimas

Todos comparten el patrón de optimizar sumas con restricciones.

---

## 🏷️ Tags

`Array` `Dynamic Programming` `Greedy` `Math` `Medium`

---