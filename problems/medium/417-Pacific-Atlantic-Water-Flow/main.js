const pacificAtlantic = function (heights) {
  // Validar entrada vacía
  if (!heights || heights.length === 0) return []

  const filas = heights.length
  const columnas = heights[0].length

  // Sets para rastrear qué celdas pueden alcanzar cada océano
  const pacifico = new Set()
  const atlantico = new Set()

  // Función DFS que marca las celdas alcanzables desde un océano
  // @param fila: fila actual
  // @param col: columna actual
  // @param visitados: Set de celdas ya visitadas para este océano
  // @param alturaAnterior: altura de la celda desde donde venimos
  function dfs (fila, col, visitados, alturaAnterior) {
    // Validar límites de la matriz
    if (fila < 0 || fila >= filas || col < 0 || col >= columnas) {
      return
    }

    // Crear clave única para esta celda
    const clave = `${fila},${col}`

    // Si ya visitamos esta celda para este océano, no continuar
    if (visitados.has(clave)) {
      return
    }

    const alturaActual = heights[fila][col]

    // CLAVE: El agua solo puede "subir" o mantenerse igual
    // Si la altura actual es menor, el agua no puede llegar aquí desde el océano
    if (alturaActual < alturaAnterior) {
      return
    }

    // Marcar esta celda como alcanzable desde este océano
    visitados.add(clave)

    // Explorar las 4 direcciones (abajo, arriba, derecha, izquierda)
    dfs(fila + 1, col, visitados, alturaActual) // Abajo
    dfs(fila - 1, col, visitados, alturaActual) // Arriba
    dfs(fila, col + 1, visitados, alturaActual) // Derecha
    dfs(fila, col - 1, visitados, alturaActual) // Izquierda
  }

  // DFS desde el PACÍFICO (borde superior e izquierdo)

  // Recorrer fila superior (todas las columnas)
  for (let col = 0; col < columnas; col++) {
    dfs(0, col, pacifico, heights[0][col])
  }

  // Recorrer columna izquierda (todas las filas)
  for (let fila = 0; fila < filas; fila++) {
    dfs(fila, 0, pacifico, heights[fila][0])
  }

  // DFS desde el ATLÁNTICO (borde inferior y derecho)

  // Recorrer fila inferior (todas las columnas)
  for (let col = 0; col < columnas; col++) {
    dfs(filas - 1, col, atlantico, heights[filas - 1][col])
  }

  // Recorrer columna derecha (todas las filas)
  for (let fila = 0; fila < filas; fila++) {
    dfs(fila, columnas - 1, atlantico, heights[fila][columnas - 1])
  }

  // Encontrar la intersección: celdas alcanzables desde AMBOS océanos
  const resultado = []

  // Recorrer toda la matriz
  for (let fila = 0; fila < filas; fila++) {
    for (let col = 0; col < columnas; col++) {
      const clave = `${fila},${col}`

      // Si esta celda puede ser alcanzada desde ambos océanos
      if (pacifico.has(clave) && atlantico.has(clave)) {
        resultado.push([fila, col])
      }
    }
  }

  return resultado
}

console.log(pacificAtlantic([[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]]))
// [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
