const findMaxAverage = function (nums, k) {
  // Calculamos la suma de los primeros k elementos
  let sum = nums.slice(0, k).reduce((acc, v) => acc + v, 0)
  let maxSum = sum // Guardamos la suma máxima encontrada hasta ahora
  let left = 0 // Puntero izquierdo de la ventana deslizante

  // Recorremos el array desde el elemento k hasta el final
  for (let i = k; i < nums.length; i++) {
    // Actualizamos la suma: restamos el elemento que sale y sumamos el que entra
    sum = sum - nums[left] + nums[i]
    left++ // Movemos el puntero izquierdo

    // Si la nueva suma es mayor que la máxima, la actualizamos
    if (sum > maxSum) maxSum = sum
  }

  // Devolvemos el promedio máximo encontrado
  return maxSum / k
}

console.log(findMaxAverage([1, 12, -5, -6, 50, 3], 4)) // 12.75

/**
 * Ejemplo paso a paso con nums = [1, 12, -5, -6, 50, 3], k = 4:
 * sum = 1 + 12 + (-5) + (-6) = 2
 * maxSum = 2
 * i=4: sum = 2 - 1 + 50 = 51, left=1, maxSum=51
 * i=5: sum = 51 - 12 + 3 = 42, left=2, maxSum=51
 * Resultado final: maxSum/k = 51/4 = 12.75
 */
