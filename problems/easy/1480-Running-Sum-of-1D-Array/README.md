# 1480. Running Sum of 1D Array

Dada una matriz `nums`. Definimos una suma continua de una matriz como `runningSum[i] = sum(nums[0]…nums[i])`.

Devuelve la suma corriente de `nums`.

**Dificultad:** Easy

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums = [1,2,3,4]`
- Salida: `[1,3,6,10]`
- Explicación: La suma corriente se obtiene de la siguiente manera: `[1, 1+2, 1+2+3, 1+2+3+4]`.

**Ejemplo 2:**

- Entrada: `nums = [1,1,1,1,1]`
- Salida: `[1,2,3,4,5]`
- Explicación: La suma corriente se obtiene de la siguiente manera: `[1, 1+1, 1+1+1, 1+1+1+1, 1+1+1+1+1]`.

**Ejemplo 3:**

- Entrada: `nums = [3,1,2,10,1]`
- Salida: `[3,4,6,16,17]`
- Explicación: Cada posición contiene la suma de todos los elementos desde el inicio hasta esa posición.

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Calcular la suma acumulativa (prefix sum) de cada posición.
- **Concepto clave**: Cada elemento del resultado es la suma de todos los elementos anteriores más el actual.
- **Técnica**: Prefix Sum - mantener un acumulador que se va sumando elemento por elemento.
- **Optimización**: Un solo recorrido O(n) construyendo el resultado paso a paso.

La estrategia es simple pero fundamental: mantener una variable que acumule la suma y construir el array resultado posición por posición. Es una implementación directa del concepto de prefix sum.

---

## 🔧 Implementación

```js
const runningSum = function(nums) {
    let prefix = 0      // Acumulador de la suma corriente
    let subArr = []     // Array resultado
    
    // Recorrer el array original una sola vez
    for (let i = 0; i < nums.length; i++) {
        prefix += nums[i]    // Agregar elemento actual a la suma acumulada
        subArr[i] = prefix   // Guardar suma acumulada en la posición i
    }
    
    return subArr
}

console.log(runningSum([1,2,3,4])) // [1,3,6,10]

/**
 * Ejemplo paso a paso con nums = [1,2,3,4]:
 * 
 * i=0: prefix = 0 + 1 = 1  → subArr[0] = 1  → subArr = [1]
 * i=1: prefix = 1 + 2 = 3  → subArr[1] = 3  → subArr = [1,3]
 * i=2: prefix = 3 + 3 = 6  → subArr[2] = 6  → subArr = [1,3,6]
 * i=3: prefix = 6 + 4 = 10 → subArr[3] = 10 → subArr = [1,3,6,10]
 * 
 * Resultado: [1,3,6,10]
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n), donde n es la longitud del array nums.
- **Complejidad espacial**: O(n), para el array resultado (O(1) sin contar el espacio de salida).

![rendimiento](./public/rendimiento.png)

*Esta es la implementación más eficiente posible para este problema.*

---

## 🔄 Enfoques Alternativos

**Modificación in-place (si se permite):**
```js
// O(1) espacio adicional - modificando el array original
const runningSumInPlace = function(nums) {
    for (let i = 1; i < nums.length; i++) {
        nums[i] += nums[i - 1]
    }
    return nums
}

```

---

## 🎯 Aprendizajes Clave

- **Prefix Sum**: Concepto fundamental en algoritmos, especialmente útil para consultas de rango.
- **Acumulador simple**: Una variable que mantiene el estado acumulado es suficiente.
- **Construcción paso a paso**: Cada elemento del resultado se basa en el cálculo anterior.
- **Eficiencia**: O(n) tiempo y espacio es óptimo para este tipo de problemas.
- **Variaciones**: El concepto se puede aplicar in-place si se permite modificar el input.

---

## 🔍 Casos Edge

- Array de un elemento: `[5]` → `[5]`
- Array con negativos: `[-1,2,-3]` → `[-1,1,-2]`
- Array con ceros: `[1,0,3]` → `[1,1,4]`
- Todos elementos iguales: `[2,2,2]` → `[2,4,6]`

---

## 🚀 Aplicaciones del Concepto

- **Range Sum Queries**: Consultar suma de rangos en O(1) tras preprocessing
- **Diferencia entre sumas**: Calcular sum(i,j) = prefix[j] - prefix[i-1]
- **Subarray Sum Problems**: Base para problemas más complejos
- **2D Prefix Sums**: Extensión a matrices bidimensionales

---

## 🏷️ Tags

`Array` `Prefix Sum` `Easy`

---

**Tiempo invertido**: 2 minutos  
**Intentos**: 1  
**Dificultad percibida**: Easy