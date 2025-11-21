const intersectionSizeTwo = function (intervals) {
  // Ordenar intervalos por punto final (ascendente)
  // Si los puntos finales son iguales, ordenar por punto inicial (descendente)
  intervals.sort((a, b) => a[1] - b[1] || b[0] - a[0])

  let a = -Infinity // Penúltimo número agregado al conjunto
  let b = -Infinity // Último número agregado al conjunto
  let ans = 0 // Tamaño del conjunto

  for (const [l, r] of intervals) {
    // Caso 1: Ninguno de los dos últimos números está en el intervalo actual
    if (b < l) {
      // Necesitamos agregar 2 números nuevos
      // Elegimos los dos números más grandes: r-1 y r
      a = r - 1
      b = r
      ans += 2
    }
    // Caso 2: Solo b está en el intervalo (a < l && b >= l)
    else if (a < l && b >= l) {
      // Solo necesitamos agregar 1 número nuevo
      // Actualizamos: a toma el valor de b, b toma r
      a = b
      b = r
      ans += 1
    }
    // Caso 3: Ambos a y b están en el intervalo (a >= l y b >= l)
    // No necesitamos hacer nada, el intervalo ya está cubierto
  }

  return ans
}

console.log(intersectionSizeTwo([[1, 3], [3, 7], [8, 9]])) // 5

/**
 * Ejemplo paso a paso con intervals = [[1,3],[3,7],[8,9]]:
 *
 * PASO 1: Ordenar intervalos
 * Original: [[1,3],[3,7],[8,9]]
 * Después de ordenar por final: [[1,3],[3,7],[8,9]]
 * (Ya están ordenados por punto final)
 *
 * PASO 2: Procesar cada intervalo
 *
 * Estado inicial: a = -∞, b = -∞, ans = 0
 *
 * Intervalo 1: [1, 3]
 *   l = 1, r = 3
 *   ¿b < l? → -∞ < 1 ✓ (Caso 1)
 *   Agregar 2 números: r-1=2 y r=3
 *   a = 2, b = 3, ans = 2
 *   Conjunto actual: {2, 3}
 *
 * Intervalo 2: [3, 7]
 *   l = 3, r = 7
 *   ¿b < l? → 3 < 3 ✗
 *   ¿a < l && b >= l? → 2 < 3 ✓ y 3 >= 3 ✓ (Caso 2)
 *   Agregar 1 número: r=7
 *   a = 3, b = 7, ans = 3
 *   Conjunto actual: {2, 3, 7}
 *
 * Intervalo 3: [8, 9]
 *   l = 8, r = 9
 *   ¿b < l? → 7 < 8 ✓ (Caso 1)
 *   Agregar 2 números: r-1=8 y r=9
 *   a = 8, b = 9, ans = 5
 *   Conjunto actual: {2, 3, 7, 8, 9}
 *
 * Resultado final: ans = 5
 *
 * Verificación:
 * - Intervalo [1,3]: contiene {2, 3} ✓ (2 números)
 * - Intervalo [3,7]: contiene {3, 7} ✓ (2 números)
 * - Intervalo [8,9]: contiene {8, 9} ✓ (2 números)
 *
 *
 * Ejemplo paso a paso con intervals = [[1,3],[1,4],[2,5],[3,5]]:
 *
 * PASO 1: Ordenar
 * Original: [[1,3],[1,4],[2,5],[3,5]]
 * Después de ordenar:
 *   - [1,3] (final=3)
 *   - [1,4] (final=4)
 *   - [3,5] (final=5)
 *   - [2,5] (final=5, pero inicio 2 > 3, así que va después)
 * Resultado: [[1,3],[1,4],[3,5],[2,5]]
 *
 * PASO 2: Procesar
 *
 * Intervalo 1: [1, 3]
 *   Caso 1: agregar {2, 3}
 *   a = 2, b = 3, ans = 2
 *
 * Intervalo 2: [1, 4]
 *   l = 1, r = 4
 *   a = 2 >= 1 ✓, b = 3 >= 1 ✓ (Caso 3)
 *   Ya está cubierto, no agregar nada
 *   ans = 2
 *
 * Intervalo 3: [3, 5]
 *   l = 3, r = 5
 *   a = 2 < 3 ✓, b = 3 >= 3 ✓ (Caso 2)
 *   Agregar 1 número: 5
 *   a = 3, b = 5, ans = 3
 *
 * Intervalo 4: [2, 5]
 *   l = 2, r = 5
 *   a = 3 >= 2 ✓, b = 5 >= 2 ✓ (Caso 3)
 *   Ya está cubierto
 *   ans = 3
 *
 * Resultado final: ans = 3
 * Conjunto: {2, 3, 5} (o equivalente)
 */
