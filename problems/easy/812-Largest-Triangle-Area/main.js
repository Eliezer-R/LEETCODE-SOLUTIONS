const largestTriangleArea = function (points) {
  // Función auxiliar para calcular área usando fórmula del determinante
  const calculateArea = function (point1, point2, point3) {
    const [x1, y1] = point1
    const [x2, y2] = point2
    const [x3, y3] = point3

    // Fórmula: |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)| / 2
    return Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2
  }

  let max = 0 // Área máxima encontrada

  // Generar todas las combinaciones de 3 puntos
  for (let i = 0; i < points.length - 2; i++) {
    for (let j = i + 1; j < points.length - 1; j++) {
      for (let k = j + 1; k < points.length; k++) {
        const area = calculateArea(points[i], points[j], points[k])
        max = Math.max(area, max) // Actualizar máximo
      }
    }
  }

  return max
}

console.log(largestTriangleArea([[0, 0], [0, 1], [1, 0], [0, 2], [2, 0]])) // 2.0

/**
 * Ejemplo paso a paso con points = [[0,0],[0,1],[1,0],[0,2],[2,0]]:
 *
 * Combinaciones de 3 puntos:
 * 1. [0,0], [0,1], [1,0]:
 *    área = |0*(1-0) + 0*(0-0) + 1*(0-1)| / 2 = |0+0-1| / 2 = 0.5
 *
 * 2. [0,0], [0,1], [0,2]:
 *    área = |0*(1-2) + 0*(2-0) + 0*(0-1)| / 2 = |0+0+0| / 2 = 0
 *    (puntos colineales = área 0)
 *
 * 3. [0,0], [0,1], [2,0]:
 *    área = |0*(1-0) + 0*(0-0) + 2*(0-1)| / 2 = |0+0-2| / 2 = 1
 *
 * 4. [0,0], [1,0], [0,2]:
 *    área = |0*(0-2) + 1*(2-0) + 0*(0-0)| / 2 = |0+2+0| / 2 = 1
 *
 * 5. [0,0], [1,0], [2,0]:
 *    área = |0*(0-0) + 1*(0-0) + 2*(0-0)| / 2 = |0+0+0| / 2 = 0
 *    (puntos colineales)
 *
 * 6. [0,0], [0,2], [2,0]:
 *    área = |0*(2-0) + 0*(0-0) + 2*(0-2)| / 2 = |0+0-4| / 2 = 2 ← máximo
 *
 * 7-10. Otras combinaciones...
 *
 * Resultado: max = 2.0
 */
