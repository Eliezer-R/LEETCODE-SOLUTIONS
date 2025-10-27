const trapRainWater = function (heightMap) {
  const m = heightMap.length
  const n = heightMap[0].length

  // Si la matriz es muy pequeña, no puede atrapar agua
  if (m < 3 || n < 3) return 0

  // Min Heap (Priority Queue) ordenado por altura
  // Usamos la implementación de LeetCode: MinPriorityQueue
  const pq = new MinPriorityQueue((cell) => cell.height)

  // Matriz para rastrear celdas visitadas
  const visited = Array.from({ length: m }, () => Array(n).fill(false))

  // Paso 1: Añadir todas las celdas del BORDE al heap

  // Añadir columnas izquierda y derecha (todas las filas)
  for (let i = 0; i < m; i++) {
    // Columna izquierda
    pq.enqueue({ height: heightMap[i][0], x: i, y: 0 })
    // Columna derecha
    pq.enqueue({ height: heightMap[i][n - 1], x: i, y: n - 1 })
    // Marcar como visitadas
    visited[i][0] = visited[i][n - 1] = true
  }

  // Añadir filas superior e inferior (todas las columnas)
  for (let j = 0; j < n; j++) {
    // Fila superior
    pq.enqueue({ height: heightMap[0][j], x: 0, y: j })
    // Fila inferior
    pq.enqueue({ height: heightMap[m - 1][j], x: m - 1, y: j })
    // Marcar como visitadas
    visited[0][j] = visited[m - 1][j] = true
  }

  let result = 0 // Agua total atrapada

  // Direcciones: derecha, abajo, izquierda, arriba
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ]

  // Paso 2: Procesar celdas desde la más baja (Min Heap)
  while (!pq.isEmpty()) {
    // Sacar la celda con menor altura
    const { height, x, y } = pq.dequeue()

    // Paso 3: Explorar los 4 vecinos de esta celda
    for (const [dx, dy] of directions) {
      const nx = x + dx // Nueva fila
      const ny = y + dy // Nueva columna

      // Verificar si el vecino es válido y no ha sido visitado
      if (nx >= 0 && ny >= 0 && nx < m && ny < n && !visited[nx][ny]) {
        // CLAVE: Si el vecino es más bajo que la altura actual (barrera),
        // se atrapa agua = diferencia de alturas
        result += Math.max(0, height - heightMap[nx][ny])

        // Añadir el vecino al heap con la altura MÁXIMA
        // Esto es porque el agua llenará hasta el nivel de la barrera
        pq.enqueue({
          height: Math.max(height, heightMap[nx][ny]),
          x: nx,
          y: ny
        })

        // Marcar como visitado
        visited[nx][ny] = true
      }
    }
  }

  return result
}

console.log(trapRainWater([[1, 4, 3, 1, 3, 2], [3, 2, 1, 3, 2, 4], [2, 3, 3, 2, 3, 1]])) // 4
console.log(trapRainWater([[3, 3, 3, 3, 3], [3, 2, 3, 2, 3], [3, 2, 3, 2, 3], [3, 2, 3, 2, 3], [3, 3, 3, 3, 3]])) // 10
