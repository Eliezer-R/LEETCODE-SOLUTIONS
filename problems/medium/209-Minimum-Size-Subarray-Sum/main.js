const minSubArrayLen = function (target, nums) {
  const subArr = [] // Array para almacenar longitudes válidas
  let left = 0 // Puntero izquierdo de la ventana
  let right = 0 // Puntero derecho de la ventana
  let prefix = 0 // Suma acumulada de la ventana actual

  // Expandir la ventana con el puntero derecho
  while (right < nums.length) {
    prefix += nums[right] // Agregar elemento actual a la suma

    // Contraer la ventana mientras la suma sea >= target
    while (prefix >= target) {
      subArr.push(right - left + 1) // Guardar longitud actual
      prefix -= nums[left] // Quitar elemento izquierdo
      left++ // Mover puntero izquierdo
    }

    right++ // Mover puntero derecho para siguiente iteración
  }

  // Retornar la longitud mínima o 0 si no hay subarrays válidos
  return subArr.length === 0 ? 0 : Math.min(...subArr)
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])) // 2

/**
 * Ejemplo paso a paso con target = 7, nums = [2,3,1,2,4,3]:
 *
 * right=0: prefix=2, suma < 7
 * right=1: prefix=5, suma < 7
 * right=2: prefix=6, suma < 7
 * right=3: prefix=8, suma >= 7
 *   → subArr=[4], prefix=6, left=1
 *   → subArr=[4,3], prefix=4, left=2
 * right=4: prefix=8, suma >= 7
 *   → subArr=[4,3,2], prefix=6, left=3
 * right=5: prefix=9, suma >= 7
 *   → subArr=[4,3,2,2], prefix=7, left=4
 *   → subArr=[4,3,2,2,2], prefix=3, left=5
 *
 * Math.min(4,3,2,2,2) = 2
 */
