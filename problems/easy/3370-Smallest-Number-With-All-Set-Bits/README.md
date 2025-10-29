# 3370. Smallest Number With All Set Bits

## 🧠 Descripción

Se te da un número positivo `n`. Tu tarea es encontrar el número más pequeño `x` tal que:

* `x` es mayor o igual que `n`.
* La representación binaria de `x` consiste solo de bits activados (1s).

---

## 📋 Ejemplos

### Ejemplo 1:

* **Entrada**: `n = 5`
* **Salida**: `7`
* **Explicación**: La representación binaria de 7 es "111", que es el número más pequeño mayor o igual a 5 con todos los bits activados.

### Ejemplo 2:

* **Entrada**: `n = 10`
* **Salida**: `15`
* **Explicación**: La representación binaria de 15 es "1111".

### Ejemplo 3:

* **Entrada**: `n = 3`
* **Salida**: `3`
* **Explicación**: La representación binaria de 3 ya es "11", así que permanece igual.

---

## 💭 Estrategia y Enfoque

La estrategia es encontrar el siguiente número que tenga todos sus bits en 1. Los números con todos los bits en 1 siguen el patrón: 1, 3, 7, 15, 31, 63, ... (2^n - 1).

### 🧩 Pasos del Algoritmo:

1. Convertir `n` a binario para saber cuántos bits tiene.
2. Crear un número con la misma cantidad de bits, todos en 1.
3. Si ese número es menor que `n`, crear uno con un bit más.
4. Retornar el resultado.

---

## 💻 Implementación en JavaScript

```js
var smallestNumber = function (n) {
    // Convertir n a string binario para contar sus bits
    // Ejemplo: n=5 → "101" (3 bits)
    const bitNum = (n).toString(2)
    
    // Crear un string con la misma cantidad de bits, todos '1'
    // Ejemplo: 3 bits → "111"
    let newBit = new Array(bitNum.length).fill('1').join('')
    
    // Convertir el string binario a número decimal
    // Ejemplo: "111" → 7
    let resul = parseInt(newBit, 2)

    // Si el resultado es menor que n, necesitamos un bit más
    while (resul < n) {
        // Crear un nuevo número con un bit adicional
        // Ejemplo: "111" → "1111"
        const bit2 = new Array(newBit.length + 1).fill('1').join('')
        resul = parseInt(bit2, 2)
    }

    return resul
};

console.log(smallestNumber(5))   // 7
console.log(smallestNumber(10))  // 15
console.log(smallestNumber(3))   // 3
```

### 📝 Ejemplo paso a paso con `n = 5`:

```
n = 5

Paso 1: Convertir a binario
  5 en binario = "101" (3 bits)

Paso 2: Crear número con todos los bits en 1
  3 bits en 1 = "111"

Paso 3: Convertir a decimal
  "111" en decimal = 7

Paso 4: Verificar
  7 >= 5 ✓

Resultado: 7
```

### 📝 Ejemplo con `n = 10`:

```
n = 10

Paso 1: Convertir a binario
  10 en binario = "1010" (4 bits)

Paso 2: Crear número con todos los bits en 1
  4 bits en 1 = "1111"

Paso 3: Convertir a decimal
  "1111" en decimal = 15

Paso 4: Verificar
  15 >= 10 ✓

Resultado: 15
```

---

## 📊 Análisis de Rendimiento

* **Complejidad temporal**: O(log n), determinada por la conversión a binario.
* **Complejidad espacial**: O(log n), para almacenar el string binario.

![rendimiento](./public/rendimiento.png)

---

## 🎯 Aprendizajes Clave

* **Bit manipulation**: Trabajar con representaciones binarias.
* **Pattern recognition**: Números con todos los bits en 1 siguen 2^n - 1.
* **String to binary**: Uso de `toString(2)` y `parseInt(str, 2)`.
* **Array manipulation**: Crear arrays con `fill()` y concatenar con `join()`.

---

## 🔄 Enfoque Alternativo Optimizado

```js
// Usando bit shifting (más eficiente)
var smallestNumberOptimized = function(n) {
    let x = 1
    while (x - 1 < n) {
        x <<= 1  // Shift left (multiplicar por 2)
    }
    return x - 1
}

// Explicación:
// x = 1 (binario: 1)
// x = 2 (binario: 10) → x-1 = 1 (binario: 1)
// x = 4 (binario: 100) → x-1 = 3 (binario: 11)
// x = 8 (binario: 1000) → x-1 = 7 (binario: 111)
// ...
```

---

## 🏷️ Etiquetas

`Math` `Bit Manipulation` `Easy`