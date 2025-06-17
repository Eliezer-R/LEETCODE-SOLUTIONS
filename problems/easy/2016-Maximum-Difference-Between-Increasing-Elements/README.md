# 2016. Maximum Difference Between Increasing Elements

Dado un array de enteros `nums` de tamaño `n` indexado desde 0, encuentra la máxima diferencia entre `nums[j] - nums[i]` tal que `0 <= i < j < n` y `nums[i] < nums[j]`.

Devuelve la máxima diferencia. Si no existe tal par de índices, devuelve `-1`.

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums = [7,1,5,4]`
- Salida: `4`
- Explicación: La máxima diferencia ocurre con `i = 1` y `j = 2`, `nums[j] - nums[i] = 5 - 1 = 4`.

**Ejemplo 2:**

- Entrada: `nums = [9,4,3,2]`
- Salida: `-1`
- Explicación: No existe ningún par `i < j` tal que `nums[i] < nums[j]`.

**Ejemplo 3:**

- Entrada: `nums = [1,5,2,10]`
- Salida: `9`
- Explicación: La máxima diferencia ocurre con `i = 0` y `j = 3`, `nums[j] - nums[i] = 10 - 1 = 9`.

---

## 💭 Enfoque y Estrategia

### Análisis del problema

- **Objetivo**: Encontrar la máxima diferencia entre dos elementos del array cumpliendo la condición de índices y valores.
- **Restricción**: Solo considerar pares donde `i < j` y `nums[i] < nums[j]`.
- **Salida**: Un número entero representando la diferencia máxima o `-1` si no existe.

---

## 🔧 Implementación

```js
const maximumDifference = function (nums) {
  let ans = -1 // Valor maximo a guardar
  let min = nums[0] // Valor minimo encontrado, esto se hace para que cuando encontremos un valor mas bajo que el siguiente, la resta nos de con el valor mas alto
  for (let i = 1; i < nums.length; ++i) { // Iteramos
    if (nums[i] > min) { // Verifacamos que el siguiente valor que en este caso es 2 sea mayor a 8, lo cual no lo es
      ans = Math.max(ans, nums[i] - min) // Aqui se verifica que guardemos el valor mayor
    } else {
      min = nums[i] // Aqui si el nums[i] es menor entonces elegimos ese valor para que la resta nos de un valor mayor
    }
  }
  return ans // Retornamos
}

console.log(maximumDifference([8, 2, 7, 9])) // valor -> 7
// Breve explicacion del array
// Cuando iteramos min es la posicion 0 sea 8 y nums[i] es 2 asi que :
// nums[i](2) > min(8) es false asi que ahora pasa al else y min es 2
// nums[i](7) > min(2) es true asi que ahora restamos nums[i](7) - min(2), y ans: es 5
// nums[i](9) > min(2) es true asi que ahora restamos comprobamos que ans que es 5 sea mayor en el Math.max(ans(5), nums[i](9) - min(2) = 7)
// Por lo tanto en el max el valor mayor es 7 y ans retorna ese valor
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n), donde n es la longitud del array.
- **Complejidad espacial**: O(1), solo se usan variables auxiliares.
![Rendimiento](./public/rendimiento.png)

---

## 🎯 Aprendizajes Clave

- Mantener el valor mínimo encontrado hasta el momento permite calcular la diferencia máxima en una sola pasada.
- Si no existe ningún par válido, se retorna `-1`.
- Este patrón es útil para problemas de diferencias máximas en arrays.

---

## 🏷️ Tags

`Array` `Easy`

---

**Tiempo invertido**: 5 minutos  
**Intentos**: 1  
**Dificultad percibida**: