# 1611. Minimum One Bit Operations to Make Integers Zero

## 🧠 Descripción

Dado un entero `n`, debes transformarlo en 0 usando las siguientes operaciones cualquier número de veces:

1. **Operación 1**: Cambiar el bit más a la derecha (bit 0) en la representación binaria de `n`.
2. **Operación 2**: Cambiar el bit `i` en la representación binaria de `n` si el bit `(i-1)` está en 1 y todos los bits desde `(i-2)` hasta 0 están en 0.

Retorna el **número mínimo de operaciones** para transformar `n` en 0.

**Dificultad:** Hard

---

## 📋 Ejemplos

### Ejemplo 1:

* **Entrada**: `n = 3`
* **Salida**: `2`
* **Explicación**:
```
Binario de 3: "11"
"11" -> "01" (Operación 2: bit 1 puede cambiar porque bit 0 = 1)
"01" -> "00" (Operación 1: cambiar bit 0)
Total: 2 operaciones
```

### Ejemplo 2:

* **Entrada**: `n = 6`
* **Salida**: `4`
* **Explicación**:
```
Binario de 6: "110"
"110" -> "010" (Operación 2)
"010" -> "011" (Operación 1)
"011" -> "001" (Operación 2)
"001" -> "000" (Operación 1)
Total: 4 operaciones
```

### Ejemplo 3:

* **Entrada**: `n = 0`
* **Salida**: `0`

---

## 💭 Estrategia y Enfoque

Este es uno de los problemas más **matemáticamente elegantes** de LeetCode. La solución tiene solo 3 líneas de código pero esconde un concepto profundo relacionado con **Gray Code**.

### 🔑 Observación clave:

El número mínimo de operaciones está relacionado con la **inversa del Gray Code**. La respuesta es simplemente el XOR acumulativo de todos los bits.

### 🧮 Concepto matemático:

**Gray Code** es una secuencia binaria donde dos valores consecutivos difieren en exactamente un bit. Este problema es esencialmente encontrar la posición de `n` en la secuencia inversa de Gray Code.

### 📐 Fórmula:

```
resultado = n XOR (n >> 1) XOR (n >> 2) XOR ... XOR 0
```

---

## 💻 Implementación en JavaScript

```js
var minimumOneBitOperations = function(n) {
    // result acumulará el XOR de todos los shifts de n
    let result = 0;
    
    // Mientras n tenga bits activos
    while (n > 0) {
        // XOR con el valor actual de n
        // result ^= n es equivalente a result = result XOR n
        result ^= n;
        
        // Shift a la derecha: dividir n entre 2 (eliminar el bit menos significativo)
        // n >>= 1 es equivalente a n = n >> 1
        n >>= 1;
    }
    
    // El resultado es la inversa del Gray Code
    return result;
};

console.log(minimumOneBitOperations(3))  // 2
console.log(minimumOneBitOperations(6))  // 4
console.log(minimumOneBitOperations(0))  // 0
```

### 📝 Ejemplo paso a paso con `n = 6` (binario: 110):

```
n = 6 (binario: 110)
result = 0

Iteración 1:
  n = 6 (110 en binario)
  result ^= 6  →  result = 0 XOR 6 = 6
  n >>= 1  →  n = 3 (11 en binario)
  
  Estado: result = 6, n = 3

Iteración 2:
  n = 3 (11 en binario)
  result ^= 3  →  result = 6 XOR 3 = 5
  
  Cálculo detallado del XOR:
    6 en binario: 110
    3 en binario: 011
    XOR:          101  (= 5 en decimal)
  
  n >>= 1  →  n = 1 (1 en binario)
  
  Estado: result = 5, n = 1

Iteración 3:
  n = 1 (1 en binario)
  result ^= 1  →  result = 5 XOR 1 = 4
  
  Cálculo detallado del XOR:
    5 en binario: 101
    1 en binario: 001
    XOR:          100  (= 4 en decimal)
  
  n >>= 1  →  n = 0
  
  Estado: result = 4, n = 0

n = 0, salir del loop

Resultado final: 4
```

### 🎨 Visualización del XOR acumulativo:

```
Para n = 6:

    110  (n = 6, original)
XOR 011  (n >> 1 = 3)
XOR 001  (n >> 2 = 1)
XOR 000  (n >> 3 = 0, termina)
  -----
    100  = 4 operaciones
```

---

## 📊 Análisis de Rendimiento

* **Complejidad temporal**: O(log n), proporcional al número de bits en n.
* **Complejidad espacial**: O(1), solo una variable auxiliar.

![rendimiento](./public/rendimiento.png)

---

## 🎯 Aprendizajes Clave

* **Gray Code**: Secuencia binaria con distancia de Hamming = 1.
* **Inverse Gray Code**: Convertir de Gray Code a binario mediante XOR acumulativo.
* **Bit manipulation mastery**: XOR y shift operations.
* **Mathematical insight**: Solución O(log n) para problema aparentemente complejo.
* **XOR properties**: a XOR a = 0, a XOR 0 = a, XOR es asociativo y conmutativo.

---

## 💡 ¿Por qué funciona el XOR?

### Intuición matemática:

Este problema está relacionado con el **Código de Gray inverso**. El Gray Code es una secuencia donde números consecutivos difieren en exactamente 1 bit.

Para convertir de Gray Code a binario (que es lo que necesitamos), usamos:
```
binary[i] = gray[i] XOR binary[i+1]
```

Que se expande a:
```
binary = gray[n] XOR gray[n-1] XOR ... XOR gray[0]
```

### Relación con el problema:

Las operaciones permitidas siguen un patrón similar al Gray Code. El número mínimo de operaciones para llegar a 0 desde `n` es equivalente a la posición de `n` en la secuencia inversa de Gray Code.

---

## 🧮 Ejemplo con número más grande `n = 9` (binario: 1001):

```
n = 9

    1001  (n = 9)
XOR 0100  (n >> 1 = 4)
XOR 0010  (n >> 2 = 2)
XOR 0001  (n >> 3 = 1)
XOR 0000  (n >> 4 = 0)
  ------
    1110  = 14 operaciones
```

---

## 🔄 Implementación alternativa (más explícita):

```js
var minimumOneBitOperationsAlt = function(n) {
    if (n === 0) return 0;
    
    // Encontrar el bit más significativo
    let msb = 0;
    let temp = n;
    while (temp > 0) {
        msb++;
        temp >>= 1;
    }
    
    // Calcular usando la fórmula de Gray Code
    return (1 << msb) - 1 - minimumOneBitOperationsAlt(n ^ (1 << (msb - 1)));
}
// Recursivo, misma complejidad pero más claro el concepto de Gray Code
```

---

## 🏷️ Etiquetas

`Math` `Bit Manipulation` `Dynamic Programming` `Recursion` `Hard`