const maxDistinctElements = function (nums, k) {
  nums.sort((a, b) => a - b)
  const used = new Set()
  let lastUsed = -Infinity

  for (const num of nums) {
    // Intentar usar el valor más pequeño posible en el rango [num-k, num+k]
    // pero que sea mayor que lastUsed
    const candidate = Math.max(num - k, lastUsed + 1)

    // Si el candidato está dentro del rango permitido
    if (candidate <= num + k) {
      used.add(candidate)
      lastUsed = candidate
    }
  }

  return used.size
}

console.log(maxDistinctElements([1, 2, 2, 3, 3, 4], 2)) // 6
console.log(maxDistinctElements([4, 4, 4, 4], 1)) // 3

/**
 * Ejemplo paso a paso con nums = [4,4,4,4], k = 1:
 *
 * Después de ordenar: [4,4,4,4]
 *
 * i=0: num=4, rango [3,5]
 *      candidate = max(3, -∞+1) = 3
 *      3 <= 5 ✓ → usar 3, lastUsed=3
 *
 * i=1: num=4, rango [3,5]
 *      candidate = max(3, 3+1) = 4
 *      4 <= 5 ✓ → usar 4, lastUsed=4
 *
 * i=2: num=4, rango [3,5]
 *      candidate = max(3, 4+1) = 5
 *      5 <= 5 ✓ → usar 5, lastUsed=5
 *
 * i=3: num=4, rango [3,5]
 *      candidate = max(3, 5+1) = 6
 *      6 <= 5 ✗ → no podemos usar ningún valor
 *
 * Resultado: {3, 4, 5} → 3 elementos distintos
 */
