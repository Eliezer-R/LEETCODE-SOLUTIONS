const countUnguarded = function (m, n, guards, walls) {
  // Paso 1: Crear cuadrícula m x n inicializada en 0
  // Array.from crea un array de m filas
  // Cada fila es un Array(n).fill(0) con n columnas en 0
  const grid = Array.from({ length: m }, () => Array(n).fill(0))

  // Paso 2a: Marcar posiciones de guardias con 1
  // Destructuramos [r, c] de cada guardia
  for (const [r, c] of guards) grid[r][c] = 1

  // Paso 2b: Marcar posiciones de muros con 2
  for (const [r, c] of walls) grid[r][c] = 2

  // Definir las 4 direcciones cardinales:
  // [-1, 0]: arriba (norte) - decrementar fila
  // [1, 0]: abajo (sur) - incrementar fila
  // [0, -1]: izquierda (oeste) - decrementar columna
  // [0, 1]: derecha (este) - incrementar columna
  const directions = [
    [-1, 0], // Norte (↑)
    [1, 0], // Sur (↓)
    [0, -1], // Oeste (←)
    [0, 1] // Este (→)
  ]

  // Paso 3: Para cada guardia, proyectar su visión
  for (const [r, c] of guards) {
    // Probar cada una de las 4 direcciones
    for (const [dr, dc] of directions) {
      // Empezar desde la posición adyacente al guardia
      // dr es el delta de fila, dc es el delta de columna
      let row = r + dr
      let col = c + dc

      // Continuar en esta dirección mientras:
      // 1. Estemos dentro de los límites de la cuadrícula
      // 2. No hayamos encontrado obstáculos
      while (row >= 0 && row < m && col >= 0 && col < n) {
        // Si encontramos un guardia (1) o un muro (2), detener
        // Los guardias y muros bloquean la visión
        if (grid[row][col] === 1 || grid[row][col] === 2) break

        // Si la celda está vacía (0), marcarla como protegida (3)
        // Si ya es 3, no importa, la dejamos en 3
        if (grid[row][col] === 0) grid[row][col] = 3

        // Avanzar un paso más en la misma dirección
        row += dr
        col += dc
      }
    }
  }

  // Paso 4: Contar celdas desprotegidas (valor 0)
  let unguarded = 0

  // Recorrer toda la cuadrícula
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // Si la celda tiene valor 0, está desprotegida
      if (grid[i][j] === 0) unguarded++
    }
  }

  return unguarded
}

console.log(countUnguarded(4, 6, [[0, 0], [1, 1], [2, 3]], [[0, 1], [2, 2], [1, 4]])) // 7
