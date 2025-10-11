const maxArea = function (height) {
  let num = 0 // Área máxima encontrada
  let j = height.length - 1 // Puntero derecho (final)
  let i = 0 // Puntero izquierdo (inicio)

  while (j > i) {
    // Calcular área actual: ancho × altura mínima
    const formul = (j - i) * Math.min(height[i], height[j])
    num = Math.max(formul, num) // Actualizar máximo

    // Mover el puntero de la línea más corta
    if (height[i] < height[j]) {
      i++ // Línea izquierda es más corta, mover hacia derecha
    } else {
      j-- // Línea derecha es más corta (o igual), mover hacia izquierda
    }
  }

  return num
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])) // 49

/**
 * Ejemplo paso a paso con height = [1,8,6,2,5,4,8,3,7]:
 * Índices:                          0 1 2 3 4 5 6 7 8
 *
 * Iteración 1: i=0, j=8
 * área = (8-0) * min(1,7) = 8 * 1 = 8
 * num = 8
 * height[0]=1 < height[8]=7 → i++
 *
 * Iteración 2: i=1, j=8
 * área = (8-1) * min(8,7) = 7 * 7 = 49
 * num = 49
 * height[1]=8 > height[8]=7 → j--
 *
 * Iteración 3: i=1, j=7
 * área = (7-1) * min(8,3) = 6 * 3 = 18
 * num = 49 (sin cambio)
 * height[1]=8 > height[7]=3 → j--
 *
 * Iteración 4: i=1, j=6
 * área = (6-1) * min(8,8) = 5 * 8 = 40
 * num = 49 (sin cambio)
 * height[1]=8 == height[6]=8 → j-- (empate)
 *
 * ... (continúa hasta i >= j)
 *
 * Resultado: 49
 */
