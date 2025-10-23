const maxFrequency = function (nums, k, numOperations) {
  const n = nums.length
  if (n === 0) return 0
  nums.sort((a, b) => a - b)

  const freq = new Map()
  for (const x of nums) freq.set(x, (freq.get(x) || 0) + 1)

  let ans = 1

  // Funciones de búsqueda binaria
  const lowerBound = (arr, target) => {
    let l = 0; let r = arr.length
    while (l < r) {
      const mid = (l + r) >> 1
      if (arr[mid] < target) l = mid + 1
      else r = mid
    }
    return l
  }

  const upperBound = (arr, target) => {
    let l = 0; let r = arr.length
    while (l < r) {
      const mid = (l + r) >> 1
      if (arr[mid] <= target) l = mid + 1
      else r = mid
    }
    return l
  }

  // Enfoque 1: Verificar cada valor único existente
  for (const [v, already] of freq.entries()) {
    const lowVal = v - k
    const highVal = v + k
    const L = lowerBound(nums, lowVal)
    const R = upperBound(nums, highVal)
    const totalInRange = R - L
    const need = totalInRange - already
    const canFix = Math.min(need, numOperations)
    ans = Math.max(ans, already + canFix)
  }

  // Enfoque 2: Sliding window para encontrar la ventana más grande
  let l = 0
  for (let r = 0; r < n; ++r) {
    while (l <= r && nums[r] - nums[l] > 2 * k) l++
    const w = r - l + 1
    ans = Math.max(ans, Math.min(w, numOperations))
  }

  return ans
}

console.log(maxFrequency([1, 4, 5], 1, 2)) // 2
console.log(maxFrequency([5, 11, 20, 20], 5, 1)) // 2

/**
 * Ejemplo paso a paso con nums = [1,4,5], k = 1, numOperations = 2:
 *
 * Después de ordenar: [1, 4, 5]
 * Frecuencias: {1: 1, 4: 1, 5: 1}
 *
 * Verificar v = 1:
 *   Rango: [0, 2]
 *   L = lowerBound([1,4,5], 0) = 0
 *   R = upperBound([1,4,5], 2) = 1
 *   totalInRange = 1 - 0 = 1
 *   need = 1 - 1 = 0
 *   canFix = min(0, 2) = 0
 *   frecuencia = 1 + 0 = 1
 *
 * Verificar v = 4:
 *   Rango: [3, 5]
 *   L = lowerBound([1,4,5], 3) = 1
 *   R = upperBound([1,4,5], 5) = 3
 *   totalInRange = 3 - 1 = 2
 *   need = 2 - 1 = 1
 *   canFix = min(1, 2) = 1
 *   frecuencia = 1 + 1 = 2 ✓
 *
 * Verificar v = 5:
 *   Rango: [4, 6]
 *   L = lowerBound([1,4,5], 4) = 1
 *   R = upperBound([1,4,5], 6) = 3
 *   totalInRange = 3 - 1 = 2
 *   need = 2 - 1 = 1
 *   canFix = min(1, 2) = 1
 *   frecuencia = 1 + 1 = 2
 *
 * Sliding Window:
 *   l=0, r=0: [1], w=1, ans=max(2, min(1,2))=2
 *   l=0, r=1: [1,4], 4-1=3 > 2*1=2, mover l
 *   l=1, r=1: [4], w=1, ans=2
 *   l=1, r=2: [4,5], 5-4=1 ≤ 2, w=2, ans=max(2, min(2,2))=2
 *
 * Resultado: 2
 */
