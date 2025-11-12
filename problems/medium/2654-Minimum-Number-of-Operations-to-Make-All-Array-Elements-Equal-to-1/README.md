# 2654. Minimum Number of Operations to Make All Array Elements Equal to 1

## 🧠 Descripción

Se te da un array indexado en 0 `nums` que consiste de enteros positivos. Puedes hacer la siguiente operación en el array **cualquier número de veces**:

* Selecciona un índice `i` tal que `0 <= i < n - 1` y reemplaza `nums[i]` o `nums[i+1]` con su valor GCD.

Retorna el **número mínimo de operaciones** para hacer que todos los elementos de `nums` sean iguales a 1. Si es imposible, retorna `-1`.

El **GCD** de dos enteros es el máximo común divisor de los dos enteros.

**Dificultad:** Medium

---

## 📋 Ejemplos

### Ejemplo 1:

* **Entrada**: `nums = [2,6,3,4]`
* **Salida**: `4`
* **Explicación**:
```
1. i=2: gcd(3,4)=1 → [2,6,1,4]
2. i=1: gcd(6,1)=1 → [2,1,1,4]
3. i=0: gcd(2,1)=1 → [1,1,1,4]
4. i=2: gcd(1,4)=1 → [1,1,1,1]
Total: 4 operaciones
```

### Ejemplo 2:

* **Entrada**: `nums = [2,4,6,8]`
* **Salida**: `-1`
* **Explicación**: Es imposible hacer que todos sean 1 porque el GCD de todo el array es 2.

---

## 💭 Estrategia y Enfoque

Este problema combina **teoría de números (GCD)** con **optimización greedy**:

### 🔑 Observaciones clave:

1. **Si ya hay 1s**: La respuesta es `n - count_of_ones` (convertir todos los no-1 usando los 1s existentes).

2. **Si el GCD de todo el array > 1**: Imposible llegar a 1 → retornar `-1`.

3. **Si no hay 1s pero GCD total = 1**: Necesitamos:
   - Primero crear un 1 (encontrar el subarray más pequeño con GCD=1)
   - Luego propagar ese 1 al resto del array

### 🧮 Fórmula:

```
resultado = (longitud_min_subarray - 1) + (n - 1)
```

Donde:
- `longitud_min_subarray - 1` = operaciones para crear el primer 1
- `n - 1` = operaciones para propagar ese 1 a todos los demás

---

## 💻 Implementación en JavaScript

```js
var minOperations = function(nums) {
    const n = nums.length;
    
    // Paso 1: Contar cuántos 1s ya existen
    let ones = 0;
    for (const x of nums) if (x === 1) ones++;
    
    // Si ya hay 1s, solo necesitamos convertir los no-1
    // Cada no-1 necesita 1 operación con un 1 adyacente
    if (ones > 0) return n - ones;

    // Función auxiliar: calcular GCD de dos números
    const gcd = (a, b) => {
        // Algoritmo de Euclides
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return Math.abs(a);
    };

    // Paso 2: Calcular GCD de todo el array
    let g = 0;
    for (const x of nums) g = gcd(g, x);
    
    // Si el GCD total es > 1, es imposible llegar a 1
    // (todos los números comparten un factor común > 1)
    if (g > 1) return -1;

    // Paso 3: Encontrar el subarray más pequeño con GCD = 1
    // Esto nos dice cuántas operaciones necesitamos para crear un 1
    let best = Infinity;
    
    // Probar cada posición de inicio i
    for (let i = 0; i < n; i++) {
        let cur = 0;  // GCD acumulativo del subarray
        
        // Extender el subarray desde i hasta j
        for (let j = i; j < n; j++) {
            // Actualizar GCD con el nuevo elemento
            cur = gcd(cur, nums[j]);
            
            // Si llegamos a GCD = 1, encontramos un subarray válido
            if (cur === 1) {
                // Guardar la longitud más pequeña encontrada
                best = Math.min(best, j - i + 1);
                break;  // No necesitamos extender más desde i
            }
        }
    }

    // Paso 4: Calcular el resultado
    // (best - 1) operaciones para crear un 1 en el subarray
    // + (n - 1) operaciones para propagar ese 1 al resto
    return (best - 1) + (n - 1);
};

console.log(minOperations([2,6,3,4]))  // 4
console.log(minOperations([2,4,6,8]))  // -1
console.log(minOperations([1,2,3]))    // 2
```

### 📝 Ejemplo paso a paso con `nums = [2,6,3,4]`:

```
n = 4

Paso 1: Contar 1s
  ones = 0 (no hay 1s)

Paso 2: Calcular GCD total
  gcd(0, 2) = 2
  gcd(2, 6) = 2
  gcd(2, 3) = 1
  gcd(1, 4) = 1
  g = 1 ✓ (es posible llegar a 1)

Paso 3: Encontrar subarray mínimo con GCD=1
  
  i=0 (empezar en 2):
    j=0: cur = gcd(0, 2) = 2
    j=1: cur = gcd(2, 6) = 2
    j=2: cur = gcd(2, 3) = 1 ✓
    Longitud: 2 - 0 + 1 = 3
    best = 3

  i=1 (empezar en 6):
    j=1: cur = gcd(0, 6) = 6
    j=2: cur = gcd(6, 3) = 3
    j=3: cur = gcd(3, 4) = 1 ✓
    Longitud: 3 - 1 + 1 = 3
    best = min(3, 3) = 3

  i=2 (empezar en 3):
    j=2: cur = gcd(0, 3) = 3
    j=3: cur = gcd(3, 4) = 1 ✓
    Longitud: 3 - 2 + 1 = 2
    best = min(3, 2) = 2

  i=3 (empezar en 4):
    j=3: cur = gcd(0, 4) = 4
    No llegamos a 1

Paso 4: Calcular resultado
  best = 2 (subarray más pequeño: [3,4])
  
  Operaciones para crear un 1: 2 - 1 = 1
  Operaciones para propagar: 4 - 1 = 3
  
  Total: 1 + 3 = 4
```

---

## 📊 Análisis de Rendimiento

* **Complejidad temporal**: O(n² × log(max(nums))), donde el log viene del GCD.
  - Nested loops: O(n²)
  - GCD por iteración: O(log(max))
* **Complejidad espacial**: O(1), solo variables auxiliares.

![rendimiento](./public/rendimiento.png)

---

## 🎯 Aprendizajes Clave

* **GCD properties**: Si GCD total > 1, imposible llegar a 1.
* **Greedy strategy**: Encontrar el subarray más pequeño para minimizar operaciones.
* **Two-phase approach**: Primero crear un 1, luego propagarlo.
* **Euclidean algorithm**: Algoritmo eficiente para calcular GCD.
* **Early termination**: Break cuando encontramos GCD=1 en un subarray.

---

## 💡 Intuición del Problema

**¿Por qué funciona esta estrategia?**

1. Una vez que tenemos un 1, podemos convertir cualquier número `x` a 1 con una operación: `gcd(1, x) = 1`.

2. El subarray más pequeño con GCD=1 minimiza las operaciones para crear el primer 1.

3. Después de tener un 1, necesitamos exactamente `n-1` operaciones para convertir los otros `n-1` elementos (uno por uno).

---

## 🏷️ Etiquetas

`Array` `Math` `Number Theory` `Greedy` `Medium`