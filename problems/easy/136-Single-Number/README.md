# 136. Single Number

Dado un array no vacío de enteros `nums`, cada elemento aparece dos veces excepto uno. Encuentra ese único elemento.

Debes implementar una solución con complejidad temporal lineal y solo espacio extra constante.

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums = [2,2,1]`
- Salida: `1`

**Ejemplo 2:**

- Entrada: `nums = [4,1,2,1,2]`
- Salida: `4`

**Ejemplo 3:**

- Entrada: `nums = [1]`
- Salida: `1`

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Encontrar el número que aparece solo una vez en el array.
- **Restricción**: Todos los demás elementos aparecen exactamente dos veces.
- **Salida**: El número único.

La estrategia óptima es usar el operador XOR (`^`). Al aplicar XOR entre todos los elementos, los números que aparecen dos veces se cancelan y solo queda el número único.

---

## 🔧 Implementación

```js
const singleNumber = function (nums) {
  let oneElem = nums[0]
  for (let i = 0; i < nums.length - 1; i++) {
    oneElem = nums[i + 1] ^ oneElem
  }
  return oneElem
}
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n), donde n es la longitud del array.
- **Complejidad espacial**: O(1), solo se usa una variable auxiliar.

![rendimiento](./public/rendimiento.png)
---

## 🎯 Aprendizajes Clave

- El operador XOR es útil para encontrar elementos únicos en arrays donde los demás aparecen en pares.
- No requiere espacio extra ni estructuras adicionales.
- Es una solución eficiente y elegante para este tipo de problemas.

---

## 🏷️ Tags

`Array` `Bit Manipulation` `Easy`

---

**Tiempo invertido**: 2 minutos  
**Intentos**: 1  
**Dificultad percibida**: Muy facil