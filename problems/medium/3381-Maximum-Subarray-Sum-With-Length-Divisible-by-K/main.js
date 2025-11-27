const numberOfPaths = function (grid, k) {
  const MOD = 1e9 + 7
  const m = grid.length; const n = grid[0].length

  // prev[j][r] = número de caminos a columna j con resto r
  let prev = Array.from({ length: n }, () => Array(k).fill(0))
  // curr[j][r] = número de caminos a columna j con resto r (fila actual)
  let curr = Array.from({ length: n }, () => Array(k).fill(0))

  // Inicializar la primera fila
  let sum = 0
  for (let j = 0; j < n; j++) {
    sum = (sum + grid[0][j]) % k
    prev[j][sum] = 1 // Solo hay un camino a cada celda de la primera fila
  }

  // Resetear sum para la primera columna
  sum = grid[0][0] % k

  // Procesar cada fila desde la segunda
  for (let i = 1; i < m; i++) {
    // Actualizar suma para la primera celda de esta fila
    sum = (sum + grid[i][0]) % k
    curr[0].fill(0)
    curr[0][sum] = 1 // Solo hay un camino a la primera columna

    // Procesar cada columna
    for (let j = 1; j < n; j++) {
      curr[j].fill(0)
      const val = grid[i][j]

      // Para cada posible resto anterior
      for (let r = 0; r < k; r++) {
        // Calcular el nuevo resto después de agregar val
        const nr = (r + val) % k

        // Agregar caminos desde arriba (prev[j][r])
        // y desde la izquierda (curr[j-1][r])
        curr[j][nr] = (prev[j][r] + curr[j - 1][r]) % MOD
      }
    }

    // Intercambiar prev y curr para la siguiente iteración
    const temp = prev
    prev = curr
    curr = temp
  }

  // Retornar caminos que llegan a (m-1, n-1) con resto 0
  return prev[n - 1][0]
}

console.log(numberOfPaths([[5, 2, 4], [3, 0, 5], [0, 7, 2]], 3)) // 2

/**
 * Ejemplo paso a paso con grid = [[5,2,4],[3,0,5],[0,7,2]], k = 3:
 *
 * Grid visualizado:
 *   5  2  4
 *   3  0  5
 *   0  7  2
 *
 * PASO 1: Inicializar primera fila
 *
 * j=0: sum = 5 % 3 = 2, prev[0][2] = 1
 * j=1: sum = (2 + 2) % 3 = 1, prev[1][1] = 1
 * j=2: sum = (1 + 4) % 3 = 2, prev[2][2] = 1
 *
 * prev después de fila 0:
 * prev[0] = [0, 0, 1]  // llegamos con resto 2
 * prev[1] = [0, 1, 0]  // llegamos con resto 1
 * prev[2] = [0, 0, 1]  // llegamos con resto 2
 *
 * PASO 2: Procesar fila 1 (i=1)
 *
 * Columna 0 (j=0):
 *   sum = (5 + 3) % 3 = 2
 *   curr[0][2] = 1
 *
 * Columna 1 (j=1):
 *   val = 0
 *   Para r=0: nr = (0+0)%3 = 0
 *     curr[1][0] = (prev[1][0] + curr[0][0]) % MOD = (0 + 0) = 0
 *   Para r=1: nr = (1+0)%3 = 1
 *     curr[1][1] = (prev[1][1] + curr[0][1]) % MOD = (1 + 0) = 1
 *   Para r=2: nr = (2+0)%3 = 2
 *     curr[1][2] = (prev[1][2] + curr[0][2]) % MOD = (0 + 1) = 1
 *
 * Columna 2 (j=2):
 *   val = 5
 *   Para r=0: nr = (0+5)%3 = 2
 *     curr[2][2] = (prev[2][0] + curr[1][0]) % MOD = (0 + 0) = 0
 *   Para r=1: nr = (1+5)%3 = 0
 *     curr[2][0] = (prev[2][1] + curr[1][1]) % MOD = (0 + 1) = 1
 *   Para r=2: nr = (2+5)%3 = 1
 *     curr[2][1] = (prev[2][2] + curr[1][2]) % MOD = (1 + 1) = 2
 *
 * curr después de fila 1:
 * curr[0] = [0, 0, 1]
 * curr[1] = [0, 1, 1]
 * curr[2] = [1, 2, 0]
 *
 * prev = curr (intercambiar)
 *
 * PASO 3: Procesar fila 2 (i=2)
 * [Similar proceso...]
 *
 * Resultado final: prev[2][0] = 2
 *
 * Explicación: Hay 2 caminos que llegan a (2,2) con suma divisible por 3
 */
