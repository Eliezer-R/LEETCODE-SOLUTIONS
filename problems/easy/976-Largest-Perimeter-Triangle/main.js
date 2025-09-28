const largestPerimeter = function (nums) {
  nums.sort((a, b) => a - b) // Ordenar array ascendentemente

  // Iterar desde el final hacia el inicio (elementos más grandes primero)
  for (let i = nums.length - 1; i >= 2; i--) {
    const first = nums[i] // Lado más largo (candidato)
    const point1 = i - 1 // Segundo lado más largo
    const point2 = point1 - 1 // Tercer lado más largo
    const sum = (nums[point1] + nums[point2] + first) // Perímetro total

    // Verificar desigualdad triangular: suma de dos lados < tercer lado
    if ((nums[point1] + nums[point2]) > first) {
      return sum // Primer triángulo válido = mayor perímetro
    }
  }

  return 0 // No se encontró ningún triángulo válido
}

console.log(largestPerimeter([2, 1, 2])) // 5

/**
 * Ejemplo paso a paso con nums = [2,1,2]:
 *
 * 1. Después de ordenar: [1,2,2]
 *
 * 2. Verificación desde el final:
 *    i=2: first=2, point1=1, point2=0
 *    Lados: nums[0]=1, nums[1]=2, nums[2]=2
 *    Verificar: (1 + 2) > 2? → 3 > 2 ✓
 *    sum = 1 + 2 + 2 = 5
 *    return 5
 *
 * Resultado: 5
 *
 * ---
 *
 * Ejemplo con nums = [1,2,1,10]:
 *
 * 1. Después de ordenar: [1,1,2,10]
 *
 * 2. Verificaciones:
 *    i=3: first=10, lados=[1,2,10]
 *    Verificar: (1 + 2) > 10? → 3 > 10? No ✗
 *
 *    i=2: first=2, lados=[1,1,2]
 *    Verificar: (1 + 1) > 2? → 2 > 2? No ✗
 *
 *    i=1: i >= 2? No, salir del loop
 *
 * Resultado: 0 (ningún triángulo válido)
 */
