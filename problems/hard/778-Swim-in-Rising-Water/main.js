const swimInWater = function (grid) {
  const n = grid.length

  // Función que verifica si podemos llegar al destino con tiempo t
  function canReach (t) {
    // Si el punto de inicio tiene elevación mayor a t, no podemos empezar
    if (grid[0][0] > t) return false

    // Direcciones: abajo, arriba, derecha, izquierda
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]]

    // Matriz para rastrear celdas visitadas
    const visited = Array.from({ length: n }, () => Array(n).fill(false))

    // Cola para BFS: empezamos en (0, 0)
    const queue = [[0, 0]]
    visited[0][0] = true

    // BFS para encontrar si podemos llegar a (n-1, n-1)
    while (queue.length > 0) {
      const [x, y] = queue.shift()

      // Si llegamos al destino, retornamos true
      if (x === n - 1 && y === n - 1) return true

      // Explorar las 4 direcciones
      for (const [dx, dy] of directions) {
        const nx = x + dx
        const ny = y + dy

        // Verificar si la nueva posición es válida:
        // 1. Dentro de los límites
        // 2. No visitada
        // 3. Elevación <= t (podemos nadar ahí)
        if (
          nx >= 0 && ny >= 0 && nx < n && ny < n &&
                    !visited[nx][ny] && grid[nx][ny] <= t
        ) {
          visited[nx][ny] = true
          queue.push([nx, ny])
        }
      }
    }

    // No pudimos llegar al destino
    return false
  }

  // Búsqueda binaria sobre el tiempo
  let left = 0
  let right = n * n - 1
  let answer = right

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    // Si podemos llegar con tiempo mid
    if (canReach(mid)) {
      answer = mid // Guardamos este tiempo como posible respuesta
      right = mid - 1 // Intentamos con menos tiempo
    } else {
      left = mid + 1 // Necesitamos más tiempo
    }
  }

  return answer
}

console.log(swimInWater([[0, 2], [1, 3]])) // 3
console.log(swimInWater([[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]])) // 16
