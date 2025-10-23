const maxPartitionsAfterOperations = function (s, k) {
  const n = s.length
  const memo = new Map()

  function dp (i, canChange, mask) {
    // Caso base: llegamos al final
    if (i === n) return 0

    // Verificar si ya calculamos este estado
    const key = `${i},${canChange},${mask}`
    if (memo.has(key)) return memo.get(key)

    // Obtener el bit del carácter actual
    const currentBit = 1 << (s.charCodeAt(i) - 97)
    let res = getResult(i, canChange, mask, currentBit, canChange)

    // Si aún podemos cambiar, probar cambiar a cada letra
    if (canChange) {
      for (let j = 0; j < 26; j++) {
        const newBit = 1 << j
        res = Math.max(res, getResult(i, canChange, mask, newBit, false))
      }
    }

    memo.set(key, res)
    return res
  }

  function getResult (i, canChange, mask, newBit, nextCanChange) {
    const nextMask = mask | newBit
    const distinctCount = countBits(nextMask)

    if (distinctCount > k) {
      // Excedimos k caracteres distintos, crear nueva partición
      return 1 + dp(i + 1, nextCanChange, newBit)
    } else {
      // Continuar con la partición actual
      return dp(i + 1, nextCanChange, nextMask)
    }
  }

  function countBits (n) {
    let count = 0
    while (n) {
      count += n & 1
      n >>= 1
    }
    return count
  }

  // Iniciar DP + 1 para contar la última partición
  return dp(0, true, 0) + 1
}

console.log(maxPartitionsAfterOperations('accca', 2)) // 3
console.log(maxPartitionsAfterOperations('aabaab', 3)) // 1
console.log(maxPartitionsAfterOperations('xxyz', 1)) // 4

/**
 * Ejemplo paso a paso con s = "accca", k = 2:
 *
 * Mejor solución: cambiar s[2] = 'c' → 'b'
 * String resultante: "acbca"
 *
 * Estados del DP:
 *
 * dp(0, true, 0):
 *   - Probar 'a': mask = 0001, distinctCount = 1 ≤ 2
 *     → dp(1, true, 0001)
 *
 * dp(1, true, 0001):
 *   - Probar 'c': mask = 0101, distinctCount = 2 ≤ 2
 *     → dp(2, true, 0101)
 *
 * dp(2, true, 0101):
 *   - Opción 1: No cambiar 'c': mask = 0101, distinctCount = 2
 *   - Opción 2: Cambiar a 'b': mask = 0111, distinctCount = 3 > 2
 *     → Nueva partición! 1 + dp(3, false, 0010)
 *
 * dp(3, false, 0010):
 *   - 'c': mask = 0110, distinctCount = 2 ≤ 2
 *     → dp(4, false, 0110)
 *
 * dp(4, false, 0110):
 *   - 'a': mask = 0111, distinctCount = 3 > 2
 *     → Nueva partición! 1 + dp(5, false, 0001)
 *
 * dp(5, false, 0001):
 *   - i = n, retornar 0
 *
 * Conteo: 1 + 1 + 0 + 1 (partición final) = 3 particiones
 */
