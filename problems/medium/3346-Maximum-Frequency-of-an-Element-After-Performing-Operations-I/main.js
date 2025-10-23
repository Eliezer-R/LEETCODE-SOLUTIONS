const maxFrequency = (nums, k, numOps) => {
  const maxVal = Math.max(...nums) + k + 2
  const count = new Array(maxVal).fill(0)

  // Llenar array de conteo con prefix sum
  for (const v of nums) { count[v]++ }

  for (let i = 1; i < maxVal; i++) { count[i] += count[i - 1] }

  let res = 0

  // Para cada posible valor objetivo
  for (let i = 0; i < maxVal; i++) {
    const left = Math.max(0, i - k)
    const right = Math.min(maxVal - 1, i + k)

    // Total de elementos que pueden alcanzar i
    const total = count[right] - (left ? count[left - 1] : 0)

    // Elementos que ya son i
    const freq = count[i] - (i ? count[i - 1] : 0)

    // Máximo: ya existentes + convertibles (hasta numOps)
    res = Math.max(res, freq + Math.min(numOps, total - freq))
  }

  return res
}

console.log(maxFrequency([1, 4, 5], 1, 2)) // 2
console.log(maxFrequency([5, 11, 20, 20], 5, 1)) // 2

/**
 * Ejemplo paso a paso con nums = [1,4,5], k = 1, numOps = 2:
 *
 * maxVal = 5 + 1 + 2 = 8
 * count inicial: [0, 1, 0, 0, 1, 1, 0, 0]
 *                 0  1  2  3  4  5  6  7
 *
 * Después de prefix sum:
 * count: [0, 1, 1, 1, 2, 3, 3, 3]
 *         0  1  2  3  4  5  6  7
 *
 * Para i = 1:
 *   Rango: [0, 2]
 *   total = count[2] - count[-1] = 1 - 0 = 1
 *   freq = count[1] - count[0] = 1 - 0 = 1
 *   res = max(0, 1 + min(2, 1-1)) = 1
 *
 * Para i = 4:
 *   Rango: [3, 5]
 *   total = count[5] - count[2] = 3 - 1 = 2
 *   freq = count[4] - count[3] = 2 - 1 = 1
 *   res = max(1, 1 + min(2, 2-1)) = max(1, 2) = 2 ✓
 *
 * Para i = 5:
 *   Rango: [4, 6]
 *   total = count[6] - count[3] = 3 - 1 = 2
 *   freq = count[5] - count[4] = 3 - 2 = 1
 *   res = max(2, 1 + min(2, 2-1)) = 2
 *
 * Resultado: 2
 */
