const maximumTotalDamage = function (power) {
  // Paso 1: Contar frecuencias de cada poder
  const freq = new Map()
  for (const p of power) {
    freq.set(p, (freq.get(p) || 0) + 1)
  }

  // Paso 2: Obtener valores únicos ordenados
  const values = Array.from(freq.keys()).sort((a, b) => a - b)
  const n = values.length

  // Casos base
  if (n === 0) return 0
  if (n === 1) return values[0] * freq.get(values[0])

  // Paso 3: Programación dinámica
  const dp = new Array(n)
  dp[0] = values[0] * freq.get(values[0])

  for (let i = 1; i < n; i++) {
    const val = values[i]
    const damage = val * freq.get(val)

    // Opción 1: No tomar el poder actual
    const notTake = dp[i - 1]

    // Opción 2: Tomar el poder actual
    let take = damage

    // Encontrar el último índice válido (diferencia >= 3)
    let j = i - 1
    while (j >= 0 && val - values[j] < 3) {
      j--
    }

    // Si hay un índice válido previo, sumar su daño
    if (j >= 0) {
      take += dp[j]
    }

    dp[i] = Math.max(notTake, take)
  }

  return dp[n - 1]
}

console.log(maximumTotalDamage([1, 1, 3, 4])) // 6
console.log(maximumTotalDamage([7, 1, 6, 6])) // 13

/**
 * Ejemplo paso a paso con power = [1,1,3,4]:
 *
 * Frecuencias: {1: 2, 3: 1, 4: 1}
 * Values ordenados: [1, 3, 4]
 *
 * dp[0] = 1 × 2 = 2
 *   (usar ambos hechizos de poder 1)
 *
 * dp[1] (val=3):
 *   damage = 3 × 1 = 3
 *   notTake = dp[0] = 2
 *
 *   Buscar j donde 3 - values[j] >= 3:
 *   j=0: 3 - 1 = 2 < 3 → j = -1
 *
 *   take = 3 + 0 = 3
 *   dp[1] = max(2, 3) = 3
 *
 * dp[2] (val=4):
 *   damage = 4 × 1 = 4
 *   notTake = dp[1] = 3
 *
 *   Buscar j donde 4 - values[j] >= 3:
 *   j=1: 4 - 3 = 1 < 3 → continuar
 *   j=0: 4 - 1 = 3 >= 3 ✓ → j = 0
 *
 *   take = 4 + dp[0] = 4 + 2 = 6
 *   dp[2] = max(3, 6) = 6
 *
 * Resultado: 6
 * Hechizos usados: poder 3 (una vez) + poder 3 (otra vez) = 6
 * O podría ser: poder 4 (4) + poder 1 (dos veces, 2) = 6
 */
