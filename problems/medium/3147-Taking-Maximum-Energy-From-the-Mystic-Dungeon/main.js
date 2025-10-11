const maximumEnergy = function (energy, k) {
  const n = energy.length
  const dp = new Array(n).fill(0)

  // Construir dp desde el final hacia el inicio
  for (let i = n - 1; i >= 0; i--) {
    const next = i + k
    if (next < n) {
      // Si hay un siguiente salto, sumar su valor óptimo
      dp[i] = energy[i] + dp[next]
    } else {
      // Si es el último salto, solo tomar la energía actual
      dp[i] = energy[i]
    }
  }

  // Retornar el máximo de todos los posibles puntos de inicio
  return Math.max(...dp)
}

console.log(maximumEnergy([5, -2, -3, 1], 2)) // 3

/**
 * Ejemplo paso a paso con energy = [5,-2,-3,1], k = 2:
 *
 * Índices: [0, 1, 2, 3]
 * energy:  [5,-2,-3, 1]
 *
 * i=3: next=5 (fuera de bounds)
 *      dp[3] = 1
 *      dp = [0, 0, 0, 1]
 *
 * i=2: next=4 (fuera de bounds)
 *      dp[2] = -3
 *      dp = [0, 0, -3, 1]
 *
 * i=1: next=3 (dentro)
 *      dp[1] = -2 + dp[3] = -2 + 1 = -1
 *      dp = [0, -1, -3, 1]
 *
 * i=0: next=2 (dentro)
 *      dp[0] = 5 + dp[2] = 5 + (-3) = 2
 *      dp = [2, -1, -3, 1]
 *
 * Math.max(2, -1, -3, 1) = 2
 *
 * Caminos posibles:
 * - Empezar en 0: 5 → -3 = 2
 * - Empezar en 1: -2 → 1 = -1
 * - Empezar en 2: -3 = -3
 * - Empezar en 3: 1 = 1
 *
 * Máximo: 2
 */
