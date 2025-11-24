# 1018. Binary Prefix Divisible By 5

Se te da un arreglo binario **nums** (indexado desde 0).

Definimos **xᵢ** como el número cuya representación binaria es el subarreglo `nums[0..i]` (del bit más significativo al menos significativo).

Por ejemplo, si `nums = [1,0,1]`, entonces `x₀ = 1`, `x₁ = 2`, y `x₂ = 5`.

Retorna un arreglo de booleanos **answer**, donde `answer[i]` es `true` si y solo si **xᵢ** es divisible por 5.

**Dificultad:** Easy

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums = [0,1,1]`
- Salida: `[true,false,false]`
- Explicación: Los números de entrada en binario son 0, 01, 011; que son 0, 1, y 3 en base 10. Solo el primer número es divisible por 5, así que `answer[0]` es `true`.

**Ejemplo 2:**

- Entrada: `nums = [1,1,1]`
- Salida: `[false,false,false]`

**Ejemplo 3:**

- Entrada: `nums = [0,1,1,1,1,1]`
- Salida: `[true,false,false,false,true,false]`

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Determinar si cada prefijo binario es divisible por 5.
- **Insight clave**: En lugar de calcular el número binario completo (que puede causar overflow), solo necesitamos mantener el **resto** al dividir por 5.
- **Técnica**: Usar aritmética modular. Para construir el próximo número binario, multiplicamos el actual por 2 (desplazamiento a la izquierda) y sumamos el nuevo bit.
- **Retos**: Evitar overflow con números grandes usando la propiedad `(a * b + c) % n = ((a % n) * b + c) % n`.

La solución elegante aprovecha que solo nos interesa si el número es divisible por 5, no el número en sí, permitiéndonos trabajar solo con restos.

---

## 🔧 Implementación

```javascript
var prefixesDivBy5 = function (nums) {
    let answers = Array(nums.length).fill(0); // Nota: debería ser nums.length, no nums.length - 1
    let current = 0; // Resto actual al dividir por 5
    
    for (let i = 0; i < nums.length; i++) {
        // Construir el siguiente número binario:
        // Multiplicar por 2 (shift izquierdo) y agregar el nuevo bit
        // Tomar módulo 5 para mantener solo el resto
        current = (current * 2 + nums[i]) % 5;
        
        // Si el resto es 0, el número es divisible por 5
        answers[i] = current === 0;
    }

    return answers;
};

console.log(prefixesDivBy5([0,1,1])); // [true,false,false]

/**
 * Ejemplo paso a paso con nums = [0,1,1]:
 * 
 * Estado inicial: current = 0, answers = [0, 0, 0]
 * 
 * Iteración i=0, nums[0]=0:
 *   Número binario: "0" (valor decimal: 0)
 *   current = (0 * 2 + 0) % 5 = 0 % 5 = 0
 *   0 === 0? → true
 *   answers[0] = true
 *   Estado: current=0, answers=[true, 0, 0]
 * 
 * Iteración i=1, nums[1]=1:
 *   Número binario: "01" (valor decimal: 1)
 *   current = (0 * 2 + 1) % 5 = 1 % 5 = 1
 *   1 === 0? → false
 *   answers[1] = false
 *   Estado: current=1, answers=[true, false, 0]
 * 
 * Iteración i=2, nums[2]=1:
 *   Número binario: "011" (valor decimal: 3)
 *   current = (1 * 2 + 1) % 5 = 3 % 5 = 3
 *   3 === 0? → false
 *   answers[2] = false
 *   Estado: current=3, answers=[true, false, false]
 * 
 * Resultado final: [true, false, false]
 * 
 * Verificación:
 * - Prefijo [0]: binario "0" = decimal 0, 0 % 5 = 0 ✓
 * - Prefijo [0,1]: binario "01" = decimal 1, 1 % 5 = 1 ✗
 * - Prefijo [0,1,1]: binario "011" = decimal 3, 3 % 5 = 3 ✗
 * 
 * 
 * Ejemplo paso a paso con nums = [1,1,1]:
 * 
 * Estado inicial: current = 0
 * 
 * Iteración i=0, nums[0]=1:
 *   Binario: "1" = decimal 1
 *   current = (0 * 2 + 1) % 5 = 1
 *   answers[0] = false
 * 
 * Iteración i=1, nums[1]=1:
 *   Binario: "11" = decimal 3
 *   current = (1 * 2 + 1) % 5 = 3
 *   answers[1] = false
 * 
 * Iteración i=2, nums[2]=1:
 *   Binario: "111" = decimal 7
 *   current = (3 * 2 + 1) % 5 = 7 % 5 = 2
 *   answers[2] = false
 * 
 * Resultado: [false, false, false]
 * 
 * 
 * Ejemplo con nums = [0,1,1,1,1,1]:
 * 
 * i=0: "0"=0, 0%5=0 → true
 * i=1: "01"=1, 1%5=1 → false
 * i=2: "011"=3, 3%5=3 → false
 * i=3: "0111"=7, 7%5=2 → false
 * i=4: "01111"=15, 15%5=0 → true
 * i=5: "011111"=31, 31%5=1 → false
 * 
 * Resultado: [true,false,false,false,true,false]
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n), un solo recorrido del arreglo.
- **Complejidad espacial**: O(n) para el arreglo de respuesta (O(1) si no contamos el output).
![rendimiento](./public/rendimiento.png)

*Esta solución es óptima ya que necesitamos procesar cada bit exactamente una vez.*

---

## 🔧 Detalles Técnicos Importantes

**Construcción de Número Binario:**

Para construir un número binario bit por bit:
```
Si tenemos: current = valor actual
Nuevo bit: nums[i]

Siguiente valor = current * 2 + nums[i]
```

**Ejemplo:**
```
current = 5 (binario: 101)
Agregar bit 1:
  5 * 2 = 10 (binario: 1010)
  10 + 1 = 11 (binario: 1011)
```

**Propiedad Modular Clave:**

```javascript
(a * b + c) % n = ((a % n) * b + c) % n
```

Por lo tanto:
```javascript
nuevo_valor % 5 = ((current % 5) * 2 + nums[i]) % 5
```

Como mantenemos `current` siempre en `current % 5`, podemos simplificar a:
```javascript
current = (current * 2 + nums[i]) % 5
```

**¿Por qué funciona el módulo?**

Solo nos interesa si el número es divisible por 5, no el número completo:
- Si `x % 5 = 0` → x es divisible por 5
- Si `x % 5 ≠ 0` → x NO es divisible por 5

Mantener solo el resto previene overflow y es suficiente para nuestra verificación.

**Equivalencia con Bit Shifting:**

```javascript
// Estas dos expresiones son equivalentes:
current = (current * 2 + nums[i]) % 5;
current = ((current << 1) | nums[i]) % 5;
```

El bit shifting es más eficiente pero menos legible.

---

## 🎯 Aprendizajes Clave

- **Aritmética modular**: Trabajar con restos evita overflow y simplifica cálculos.
- **Construcción incremental**: Construir números binarios bit por bit es eficiente.
- **Optimización de espacio**: No necesitamos almacenar números completos, solo restos.
- **Propiedad distributiva del módulo**: Permite mantener números pequeños.

---

## 🔍 Casos Edge

- **Solo ceros**: `[0,0,0]` → `[true,true,true]` (0 siempre es divisible por 5)
- **Solo unos**: `[1,1,1]` → `[false,false,false]`
- **Un elemento**: `[0]` → `[true]`, `[1]` → `[false]`
- **Número grande**: `[1,0,1,0,1]` → binario "10101" = 21, verifica cada prefijo
- **Array largo**: Funciona para hasta 10⁵ elementos sin overflow gracias al módulo

---

## 🧮 Ejemplos Adicionales

```javascript
[0]              → [true]     (0 % 5 = 0)
[1]              → [false]    (1 % 5 = 1)
[1,0]            → [false,true]    ("1"=1, "10"=2)
[1,0,1]          → [false,true,true]  ("1"=1, "10"=2, "101"=5)
[0,0,0]          → [true,true,true]   (0,0,0 todos divisibles)
[1,0,1,0,1]      → [false,true,true,false,true]
```

**Verificación de [1,0,1,0,1]:**
```
"1"     = 1,  1 % 5 = 1  → false
"10"    = 2,  2 % 5 = 2  → false (error en mi ejemplo, corregido)
"101"   = 5,  5 % 5 = 0  → true
"1010"  = 10, 10 % 5 = 0 → true
"10101" = 21, 21 % 5 = 1 → false
```

Corrección: `[false,false,true,true,false]`

---

## 🚀 Solución con Bit Shifting

Versión usando operaciones de bits (más eficiente):

```javascript
var prefixesDivBy5BitShift = function(nums) {
    let answers = [];
    let current = 0;
    
    for (let num of nums) {
        // Desplazamiento a la izquierda + OR bit a bit
        current = ((current << 1) | num) % 5;
        answers.push(current === 0);
    }
    
    return answers;
};
```

**Ventajas:**
- Operaciones bit a bit son más rápidas que multiplicación
- Misma complejidad asintótica pero constante menor

---

## 🔬 Comparación de Enfoques

| Enfoque | Tiempo | Espacio | Legibilidad | Cuándo usar |
|---------|--------|---------|-------------|-------------|
| **Módulo** (presentado) | O(n) | O(n) | ⭐⭐⭐⭐⭐ | Siempre (más claro) |
| **Bit Shifting** | O(n) | O(n) | ⭐⭐⭐⭐ | Optimización micro |
| **BigInt** (sin módulo) | O(n²) | O(n) | ⭐⭐ | Solo para entender (TLE) |

---

## 💡 Solución Naive (con BigInt)

Para entender por qué necesitamos módulo:

```javascript
var prefixesDivBy5Naive = function(nums) {
    let answers = [];
    let binaryStr = '';
    
    for (let num of nums) {
        binaryStr += num;
        let decimal = parseInt(binaryStr, 2);
        answers.push(decimal % 5 === 0);
    }
    
    return answers;
};
```

**Problema:** Para arrays grandes, `binaryStr` y `decimal` se vuelven enormes, causando TLE o overflow.

---

## 🧠 Intuición del Problema

**¿Por qué solo necesitamos el resto?**

Piensa en la división por 5 como una "propiedad" del número:
- Si un número es divisible por 5, su resto es 0
- Al construir el número bit por bit, el resto se puede calcular incrementalmente
- No necesitamos el número completo, solo su "relación" con 5

**Visualización:**

```
Número:    0   1   3   7   15  31
Binario:   0   1   11  111 1111 11111
Resto %5:  0   1   3   2   0   1
           ↓   ↓   ↓   ↓   ↓   ↓
Div por 5: ✓   ✗   ✗   ✗   ✓   ✗
```

**Patrón de restos:**
Los restos siguen un patrón predecible basado en la aritmética modular, permitiéndonos calcularlos sin el número completo.


---

## 🏷️ Tags

`Array` `Bit Manipulation` `Math` `Easy`

---