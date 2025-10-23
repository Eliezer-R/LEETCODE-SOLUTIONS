# 3461. Check If Digits Are Equal in String After Operations I

Se te da un string `s` que consiste de dígitos. Realiza la siguiente operación repetidamente hasta que el string tenga exactamente dos dígitos:

1. Para cada par de dígitos consecutivos en `s`, comenzando desde el primer dígito, calcula un nuevo dígito como la suma de los dos dígitos módulo 10.
2. Reemplaza `s` con la secuencia de dígitos recién calculados, manteniendo el orden en que se calculan.

Retorna `true` si los dos dígitos finales en `s` son iguales; de lo contrario, retorna `false`.

**Dificultad:** Easy

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `s = "3902"`
- Salida: `true`
- Explicación:
```
Inicialmente, s = "3902"
Primera operación:
  (s[0] + s[1]) % 10 = (3 + 9) % 10 = 2
  (s[1] + s[2]) % 10 = (9 + 0) % 10 = 9
  (s[2] + s[3]) % 10 = (0 + 2) % 10 = 2
  s se convierte en "292"

Segunda operación:
  (s[0] + s[1]) % 10 = (2 + 9) % 10 = 1
  (s[1] + s[2]) % 10 = (9 + 2) % 10 = 1
  s se convierte en "11"

Como los dígitos en "11" son iguales, la salida es true.
```

**Ejemplo 2:**

- Entrada: `s = "34789"`
- Salida: `false`
- Explicación:
```
Inicialmente, s = "34789"
Después de la primera operación, s = "7157"
Después de la segunda operación, s = "862"
Después de la tercera operación, s = "48"
Como '4' != '8', la salida es false.
```

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Simular el proceso de reducción del string hasta tener 2 dígitos.
- **Proceso**: En cada iteración, crear un nuevo string sumando pares adyacentes módulo 10.
- **Condición de parada**: Cuando la longitud del string sea exactamente 2.
- **Verificación final**: Comparar si ambos dígitos finales son iguales.

---

## 🔧 Implementación

```js
var hasSameDigits = function (s) {
    let n 

    while (s.length !== 2) {
        n = ''
        for (let i = 0; i < s.length - 1; i++) {
            n += (Number(s[i]) + Number(s[i + 1])) % 10
        }
        s = n
    }

    return s[0] === s[1]
}

console.log(hasSameDigits("3902")) // true
console.log(hasSameDigits("34789")) // false

/**
 * Ejemplo paso a paso con s = "3902":
 * 
 * Iteración 1: s = "3902", length = 4
 *   i=0: (3+9)%10 = 2
 *   i=1: (9+0)%10 = 9
 *   i=2: (0+2)%10 = 2
 *   n = "292", s = "292"
 * 
 * Iteración 2: s = "292", length = 3
 *   i=0: (2+9)%10 = 1
 *   i=1: (9+2)%10 = 1
 *   n = "11", s = "11"
 * 
 * s.length === 2, salir del loop
 * 
 * Comparación: s[0] === s[1] → '1' === '1' → true
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n²), donde n es la longitud inicial del string.
  - En cada iteración procesamos k-1 pares (donde k es la longitud actual)
  - Total de iteraciones: n-2
  - Suma: (n-1) + (n-2) + ... + 1 = O(n²)
- **Complejidad espacial**: O(n), para almacenar el nuevo string en cada iteración.
![rendimiento](./public/rendimiento.png)

---

## 🎯 Visualización del Proceso

```
Input: "3902"

Nivel 0:  3   9   0   2      (4 dígitos)
           ╲ ╱ ╲ ╱ ╲ ╱
Nivel 1:    2   9   2        (3 dígitos)
             ╲ ╱ ╲ ╱
Nivel 2:      1   1          (2 dígitos) ✓

Resultado: "11" → true (ambos dígitos iguales)
```

---

## 🔄 Enfoque Alternativo Optimizado

```js
// Usando array en lugar de concatenación de strings
var hasSameDigitsOptimized = function(s) {
    let digits = s.split('').map(Number)
    
    while (digits.length > 2) {
        const newDigits = []
        for (let i = 0; i < digits.length - 1; i++) {
            newDigits.push((digits[i] + digits[i + 1]) % 10)
        }
        digits = newDigits
    }
    
    return digits[0] === digits[1]
}
// Más eficiente con arrays que con concatenación de strings
```

---

## 🔍 Casos Edge

- **String de 2 dígitos**: `"12"` → Comparar directamente sin operaciones
- **String de 3 dígitos**: `"123"` → Una sola iteración
- **Todos ceros**: `"000"` → Resultado `"00"` → true
- **Dígitos grandes**: `"999"` → `(9+9)%10 = 8` → `"88"` → true

---

## 🎯 Aprendizajes Clave

- **Simulation**: Implementar el proceso exactamente como se describe.
- **String manipulation**: Construir strings dinámicamente en JavaScript.
- **Modular arithmetic**: Uso de módulo 10 para mantener dígitos válidos.
- **Iterative reduction**: Reducir el problema paso a paso hasta el caso base.
- **Pattern similar**: Recuerda al triángulo de Pascal pero con módulo 10.

---

## 🧮 Relación Matemática

Este problema tiene una relación con el **Triángulo de Pascal** y los **coeficientes binomiales**:

```
Para el resultado final, cada dígito original contribuye con:
coeficiente = C(n-2, i) % 10

Donde:
- n es la longitud inicial
- i es la posición del dígito
- C(n,k) es el coeficiente binomial
```

Aunque la simulación directa es más simple que calcular coeficientes binomiales módulo 10.

---

## 🏷️ Tags

`String` `Math` `Simulation` `Easy`

---

**Complejidad Final:**
- ⏱️ Tiempo: O(n²)
- 💾 Espacio: O(n)
