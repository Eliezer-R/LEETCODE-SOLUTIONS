const findFinalValue = function (nums, original) {
  let value = original

  // Mientras el valor actual se encuentre en el arreglo
  while (nums.includes(value)) {
    // Duplicar el valor
    value = value * 2
  }

  return value
}

console.log(findFinalValue([5, 3, 6, 1, 12], 3)) // 24

/**
 * Ejemplo paso a paso con nums = [5,3,6,1,12], original = 3:
 *
 * Estado inicial: value = 3
 *
 * Iteración 1:
 *   nums.includes(3)? → true ✓
 *   value = 3 * 2 = 6
 *
 * Iteración 2:
 *   nums.includes(6)? → true ✓ (6 está en el arreglo)
 *   value = 6 * 2 = 12
 *
 * Iteración 3:
 *   nums.includes(12)? → true ✓ (12 está en el arreglo)
 *   value = 12 * 2 = 24
 *
 * Iteración 4:
 *   nums.includes(24)? → false ✗ (24 NO está en el arreglo)
 *   Salir del bucle
 *
 * Retornar: value = 24
 *
 *
 * Ejemplo paso a paso con nums = [2,7,9], original = 4:
 *
 * Estado inicial: value = 4
 *
 * Iteración 1:
 *   nums.includes(4)? → false ✗
 *   Salir del bucle inmediatamente
 *
 * Retornar: value = 4
 */
