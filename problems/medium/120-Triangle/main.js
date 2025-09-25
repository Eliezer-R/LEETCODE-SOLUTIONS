const minimumTotal = function (triangle) {
  // Empezar desde la penúltima fila y subir hacia la cima
  for (let i = triangle.length - 1; i > 0; i--) {
    // Para cada elemento en la fila actual
    for (let j = 0; j < (triangle[i].length - 1); j++) {
      // Encontrar el mínimo entre los dos caminos posibles hacia abajo
      const min = Math.min(triangle[i][j], triangle[i][j + 1])

      // Actualizar la fila superior con la suma mínima
      triangle[i - 1][j] += min
    }
  }

  // El resultado final está en la cima del triángulo
  return triangle[0][0]
}

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])) // 11

/**
 * Ejemplo paso a paso con triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]:
 *
 * Estado inicial:
 *    2
 *   3 4
 *  6 5 7
 * 4 1 8 3
 *
 * i=3 (fila [4,1,8,3]):
 * j=0: min(4,1)=1 → triangle[2][0] = 6+1 = 7
 * j=1: min(1,8)=1 → triangle[2][1] = 5+1 = 6
 * j=2: min(8,3)=3 → triangle[2][2] = 7+3 = 10
 * Resultado después de i=3:
 *    2
 *   3 4
 *  7 6 10
 * 4 1 8 3
 *
 * i=2 (fila [7,6,10]):
 * j=0: min(7,6)=6 → triangle[1][0] = 3+6 = 9
 * j=1: min(6,10)=6 → triangle[1][1] = 4+6 = 10
 * Resultado después de i=2:
 *    2
 *   9 10
 *  7 6 10
 * 4 1 8 3
 *
 * i=1 (fila [9,10]):
 * j=0: min(9,10)=9 → triangle[0][0] = 2+9 = 11
 * Resultado final:
 *   11
 *   9 10
 *  7 6 10
 * 4 1 8 3
 *
 * Resultado: triangle[0][0] = 11
 */
