const rangeAddQueries = function (n, queries) {
  // Crear matriz de diferencias (n+1) × (n+1) para evitar chequeos de límites
  const diff = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0))

  // Paso 1: Aplicar todas las consultas a la matriz de diferencias
  for (let i = 0; i < queries.length; i++) {
    const [row1, col1, row2, col2] = queries[i]

    // Técnica de diferencias 2D:
    // Marcar el inicio del rango (esquina superior izquierda)
    diff[row1][col1] += 1

    // Marcar el final del rango en columnas (justo después del borde derecho)
    diff[row1][col2 + 1] -= 1

    // Marcar el final del rango en filas (justo después del borde inferior)
    diff[row2 + 1][col1] -= 1

    // Compensar la doble resta (esquina inferior derecha + 1)
    diff[row2 + 1][col2 + 1] += 1
  }

  // Paso 2: Aplicar suma de prefijos horizontal (por filas)
  for (let r = 0; r < n; r++) {
    for (let c = 1; c < n; c++) {
      diff[r][c] += diff[r][c - 1]
    }
  }

  // Paso 3: Aplicar suma de prefijos vertical (por columnas)
  for (let r = 1; r < n; r++) {
    for (let c = 0; c < n; c++) {
      diff[r][c] += diff[r - 1][c]
    }
  }

  // Paso 4: Extraer solo la submatriz n × n (descartar la fila/columna extra)
  const res = Array.from({ length: n }, (_, i) => diff[i].slice(0, n))

  return res
}

console.log(rangeAddQueries(3, [[1, 1, 2, 2], [0, 0, 1, 1]]))
// [[1,1,0],[1,2,1],[0,1,1]]

/**
 * Ejemplo paso a paso con n = 3, queries = [[1,1,2,2],[0,0,1,1]]:
 *
 * PASO 1: Aplicar consultas a matriz de diferencias
 *
 * Matriz inicial diff (4×4, todo en 0):
 * [[0, 0, 0, 0],
 *  [0, 0, 0, 0],
 *  [0, 0, 0, 0],
 *  [0, 0, 0, 0]]
 *
 * Query 1: [1,1,2,2]
 *   diff[1][1] += 1  → diff[1][1] = 1
 *   diff[1][3] -= 1  → diff[1][3] = -1
 *   diff[3][1] -= 1  → diff[3][1] = -1
 *   diff[3][3] += 1  → diff[3][3] = 1
 *
 * Matriz diff después de Query 1:
 * [[0,  0,  0,  0],
 *  [0,  1,  0, -1],
 *  [0,  0,  0,  0],
 *  [0, -1,  0,  1]]
 *
 * Query 2: [0,0,1,1]
 *   diff[0][0] += 1  → diff[0][0] = 1
 *   diff[0][2] -= 1  → diff[0][2] = -1
 *   diff[2][0] -= 1  → diff[2][0] = -1
 *   diff[2][2] += 1  → diff[2][2] = 1
 *
 * Matriz diff después de Query 2:
 * [[ 1,  0, -1,  0],
 *  [ 0,  1,  0, -1],
 *  [-1,  0,  1,  0],
 *  [ 0, -1,  0,  1]]
 *
 * PASO 2: Suma de prefijos horizontal (por filas)
 *
 * Para cada fila, acumular valores de izquierda a derecha:
 *
 * Fila 0: [1, 1, 0, 0]    (1, 1+0=1, 1-1=0, 0+0=0)
 * Fila 1: [0, 1, 1, 0]    (0, 0+1=1, 1+0=1, 1-1=0)
 * Fila 2: [-1, -1, 0, 0]  (-1, -1+0=-1, -1+1=0, 0+0=0)
 *
 * Matriz después del paso 2:
 * [[ 1,  1,  0,  0],
 *  [ 0,  1,  1,  0],
 *  [-1, -1,  0,  0],
 *  [ 0, -1, -1,  0]]
 *
 * PASO 3: Suma de prefijos vertical (por columnas)
 *
 * Para cada columna, acumular valores de arriba a abajo:
 *
 * Col 0: [1, 1, 0, 0]     (1, 1+0=1, 1-1=0, 0+0=0)
 * Col 1: [1, 2, 1, 0]     (1, 1+1=2, 2-1=1, 1-1=0)
 * Col 2: [0, 1, 1, 0]     (0, 0+1=1, 1+0=1, 1-1=0)
 * Col 3: [0, 0, 0, 0]     (todo se mantiene en 0)
 *
 * Matriz final:
 * [[1, 1, 0, 0],
 *  [1, 2, 1, 0],
 *  [0, 1, 1, 0],
 *  [0, 0, 0, 0]]
 *
 * PASO 4: Extraer submatriz 3×3
 * Resultado: [[1, 1, 0],
 *             [1, 2, 1],
 *             [0, 1, 1]]
 */
