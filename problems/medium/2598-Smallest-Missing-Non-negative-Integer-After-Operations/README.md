# 2598. Smallest Missing Non-negative Integer After Operations

Dado un array de enteros `nums` y un entero `value`, en una operación puedes sumar o restar `value` a cualquier elemento de `nums`.

El **MEX** (minimum excluded) de un array es el entero positivo más pequeño que no está presente en el array.

Devuelve el **máximo MEX** de `nums` después de aplicar cualquier número de operaciones.

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums = [1,-10,7,13,6,8]`, `value = 5`
- Salida: `4`
- Explicación: 
  - Sumar value a nums[1] dos veces: `[1,0,7,13,6,8]`
  - Restar value de nums[2] una vez: `[1,0,2,13,6,8]`
  - Restar value de nums[3] dos veces: `[1,0,2,3,6,8]`
  - El MEX es 4

**Ejemplo 2:**

- Entrada: `nums = [1,-10,7,13,6,8]`, `value = 7`
- Salida: `2`
- Explicación:
  - Restar value de nums[2] una vez: `[1,-10,0,13,6,8]`
  - El MEX es 2

---

## 💭 Enfoque y Estrategia

**Observación clave:** Cuando sumas o restas `value` a un número, su **residuo módulo `value`** permanece igual.

Por ejemplo, si `value = 5`:
- `7 % 5 = 2`
- `(7 + 5) % 5 = 2`
- `(7 - 5) % 5 = 2`

**Esto significa que:**
- Cada número puede convertirse en cualquier número que tenga el mismo residuo módulo `value`
- Para formar una secuencia `[0, 1, 2, 3, ...]`, necesitamos números con residuos `[0, 1, 2, ..., value-1]`

**Estrategia:**
1. Contar la frecuencia de cada residuo módulo `value`
2. Intentar formar la secuencia `0, 1, 2, 3, ...` usando los residuos disponibles
3. El primer número que no podamos formar es el MEX

---

## 🔧 Implementación

```js
const findSmallestInteger = function(nums, value) {
  // Array para contar frecuencia de cada residuo (0 a value-1)
  const freq = new Int32Array(value); 
  
  // Contar residuos de todos los números
  for (let i = 0; i < nums.length; i++) {
    // Manejar números negativos: ((n % v) + v) % v siempre da positivo
    const rem = ((nums[i] % value) + value) % value;
    freq[rem]++;
  }
  
  // Intentar formar 0, 1, 2, 3, ... usando los residuos
  let j = 0;
  while (true) {
    const rem = j % value;  // Residuo necesario para formar j
    
    if (freq[rem]) {
      freq[rem]--;  // Usar un número con este residuo
      j++;          // Intentar siguiente número
    } else {
      return j;     // No podemos formar j, es el MEX
    }
  }
};

console.log(findSmallestInteger([1,-10,7,13,6,8], 5))  // 4

/**
 * Ejemplo paso a paso con nums = [1,-10,7,13,6,8], value = 5:
 * 
 * Residuos:
 * 1 % 5 = 1
 * -10 % 5 = 0 (después de ajustar)
 * 7 % 5 = 2
 * 13 % 5 = 3
 * 6 % 5 = 1
 * 8 % 5 = 3
 * 
 * freq = [1, 2, 1, 2, 0]
 *         0  1  2  3  4
 * 
 * Formando secuencia:
 * j=0: rem=0, freq[0]=1 → usar, freq[0]=0, j=1
 * j=1: rem=1, freq[1]=2 → usar, freq[1]=1, j=2
 * j=2: rem=2, freq[2]=1 → usar, freq[2]=0, j=3
 * j=3: rem=3, freq[3]=2 → usar, freq[3]=1, j=4
 * j=4: rem=4, freq[4]=0 → no podemos formar 4
 * 
 * Resultado: 4
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n), donde n es la longitud del array
- **Complejidad espacial**: O(value), para el array de frecuencias
![rendimiento](./public/rendimiento.png)

---

## 🎯 Aprendizajes Clave

- La operación de sumar/restar un valor preserva el residuo módulo ese valor
- El problema se reduce a contar residuos y formar una secuencia
- El truco `((n % v) + v) % v` maneja correctamente números negativos
- El MEX se encuentra de forma greedy intentando formar 0, 1, 2, 3, ...

---

## 🏷️ Tags

`Array` `Hash Table` `Math` `Greedy` `Medium`

---

**Tiempo invertido**: 40 minutos  
**Intentos**: 3  
**Dificultad percibida**: Media