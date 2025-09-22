const maxFrequencyElements = function (nums) {
  const map = new Map() // Map para contar frecuencias
  let resul = 0 // Resultado: suma de frecuencias máximas

  // Paso 1: Contar frecuencias de cada elemento
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], (map.get(nums[i]) || 0) + 1)
  }

  // Paso 2: Encontrar la frecuencia máxima
  const maxNum = Math.max(...map.values())

  // Paso 3: Sumar todas las frecuencias que igualan el máximo
  map.forEach((values, _) => {
    if (values === maxNum) resul += values
  })

  return resul
}

console.log(maxFrequencyElements([1, 2, 2, 3, 1, 4])) // 4

/**
 * Ejemplo paso a paso con nums = [1,2,2,3,1,4]:
 *
 * 1. Conteo de frecuencias:
 *    map = {1: 2, 2: 2, 3: 1, 4: 1}
 *
 * 2. Frecuencia máxima:
 *    maxNum = Math.max(2, 2, 1, 1) = 2
 *
 * 3. Suma de frecuencias máximas:
 *    - Elemento 1: frecuencia 2 === maxNum → resul += 2 → resul = 2
 *    - Elemento 2: frecuencia 2 === maxNum → resul += 2 → resul = 4
 *    - Elemento 3: frecuencia 1 < maxNum → no suma
 *    - Elemento 4: frecuencia 1 < maxNum → no suma
 *
 * Resultado: 4 (2 + 2)
 */
