# 3397. Maximum Number of Distinct Elements After Operations

Se te da un array de enteros `nums` y un entero `k`. Puedes realizar la siguiente operación en cada elemento del array **como máximo una vez**:

- Sumar un entero en el rango `[-k, k]` al elemento.

Retorna el **número máximo** posible de elementos distintos en `nums` después de realizar las operaciones.

**Dificultad:** Medium

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums = [1,2,2,3,3,4], k = 2`
- Salida: `6`
- Explicación: nums cambia a `[-1, 0, 1, 2, 3, 4]` después de realizar operaciones en los primeros cuatro elementos.

**Ejemplo 2:**

- Entrada: `nums = [4,4,4,4], k = 1`
- Salida: `3`
- Explicación: Al sumar -1 a `nums[0]` y 1 a `nums[1]`, nums cambia a `[3, 5, 4, 4]`.

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Maximizar elementos distintos transformando cada número dentro de su rango permitido.
- **Observación clave**: Ordenar el array ayuda a asignar valores de manera greedy.
- **Greedy approach**: Para cada número, elegir el valor más pequeño disponible en su rango que no haya sido usado.
- **Técnica**: Ordenar + Greedy assignment + Tracking con variable lastUsed.

---

## 🔧 Implementación

```js
var maxDistinctElements = function(nums, k) {
    nums.sort((a, b) => a - b)
    const used = new Set()
    let lastUsed = -Infinity 

    for (let num of nums) {
        // Intentar usar el valor más pequeño posible en el rango [num-k, num+k]
        // pero que sea mayor que lastUsed
        let candidate = Math.max(num - k, lastUsed + 1)
    
        // Si el candidato está dentro del rango permitido
        if (candidate <= num + k) {
            used.add(candidate)
            lastUsed = candidate
        }
    }

    return used.size
}

console.log(maxDistinctElements([1,2,2,3,3,4], 2)) // 6
console.log(maxDistinctElements([4,4,4,4], 1)) // 3

/**
 * Ejemplo paso a paso con nums = [4,4,4,4], k = 1:
 * 
 * Después de ordenar: [4,4,4,4]
 * 
 * i=0: num=4, rango [3,5]
 *      candidate = max(3, -∞+1) = 3
 *      3 <= 5 ✓ → usar 3, lastUsed=3
 * 
 * i=1: num=4, rango [3,5]
 *      candidate = max(3, 3+1) = 4
 *      4 <= 5 ✓ → usar 4, lastUsed=4
 * 
 * i=2: num=4, rango [3,5]
 *      candidate = max(3, 4+1) = 5
 *      5 <= 5 ✓ → usar 5, lastUsed=5
 * 
 * i=3: num=4, rango [3,5]
 *      candidate = max(3, 5+1) = 6
 *      6 <= 5 ✗ → no podemos usar ningún valor
 * 
 * Resultado: {3, 4, 5} → 3 elementos distintos
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n log n), dominada por el ordenamiento.
- **Complejidad espacial**: O(n), para el Set de elementos usados.
![rendimiento](./public/rendimiento.png)

---

## 🎯 Visualización del Greedy

```
nums = [1,2,2,3,3,4], k = 2

Después de ordenar: [1,2,2,3,3,4]

Rangos disponibles:
1: [-1, 3]  → elegir -1 (mínimo posible)
2: [0, 4]   → elegir 0 (siguiente disponible)
2: [0, 4]   → elegir 1 (siguiente disponible)
3: [1, 5]   → elegir 2 (siguiente disponible)
3: [1, 5]   → elegir 3 (siguiente disponible)
4: [2, 6]   → elegir 4 (siguiente disponible)

Resultado: [-1, 0, 1, 2, 3, 4] → 6 elementos distintos
```

---

## 🔍 Casos Edge

- **Todos iguales**: `[5,5,5,5]` con k=1 → Máximo 3 elementos distintos
- **Ya todos distintos**: `[1,2,3,4]` → Se mantienen todos distintos
- **k = 0**: No se puede cambiar nada, contar elementos distintos originales

---

## 🎯 Aprendizajes Clave

- **Greedy + Sorting**: Ordenar facilita la asignación greedy de valores.
- **Range optimization**: Elegir el valor mínimo posible pero válido.
- **Tracking**: lastUsed evita usar valores duplicados.
- **Interval assignment**: Similar a problemas de scheduling.

---

## 🏷️ Tags

`Array` `Greedy` `Sorting` `Medium`

---

**Tiempo invertido**: 25 minutos  
**Intentos**: 4  
**Dificultad percibida**: Medium