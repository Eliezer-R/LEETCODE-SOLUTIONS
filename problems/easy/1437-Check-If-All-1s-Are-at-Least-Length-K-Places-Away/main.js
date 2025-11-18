const kLengthApart = function (nums, k) {
  let last = -1 // Posición del último '1' encontrado (-1 significa que no hemos encontrado ninguno)

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      // Verificar si este no es el primer '1' y si la distancia es suficiente
      if (last !== -1 && i - last - 1 < k) {
        return false
      }
      // Actualizar la posición del último '1'
      last = i
    }
  }

  return true
}

console.log(kLengthApart([1, 0, 0, 0, 1, 0, 0, 1], 2)) // true

/**
 * Ejemplo paso a paso con nums = [1,0,0,0,1,0,0,1], k = 2:
 * Índices:  0 1 2 3 4 5 6 7
 * Array:   [1,0,0,0,1,0,0,1]
 *
 * Iteración por cada elemento:
 *
 * i=0, nums[0]=1:
 *   last=-1 (primer '1')
 *   → No verificar distancia, solo actualizar
 *   last=0
 *
 * i=1, nums[1]=0:
 *   → No hacer nada
 *
 * i=2, nums[2]=0:
 *   → No hacer nada
 *
 * i=3, nums[3]=0:
 *   → No hacer nada
 *
 * i=4, nums[4]=1:
 *   last=0 (no es -1)
 *   Distancia: i - last - 1 = 4 - 0 - 1 = 3
 *   3 < 2? No ✓ → continuar
 *   last=4
 *
 * i=5, nums[5]=0:
 *   → No hacer nada
 *
 * i=6, nums[6]=0:
 *   → No hacer nada
 *
 * i=7, nums[7]=1:
 *   last=4 (no es -1)
 *   Distancia: i - last - 1 = 7 - 4 - 1 = 2
 *   2 < 2? No ✓ → continuar
 *   last=7
 *
 * Terminó el bucle → return true
 *
 * Explicación de la fórmula de distancia:
 * - i: índice del '1' actual
 * - last: índice del '1' anterior
 * - i - last: número total de posiciones entre ellos (incluyendo ambos '1's)
 * - i - last - 1: número de posiciones ENTRE los '1's (excluyendo ambos '1's)
 *
 * Visualización:
 *   Índices:    0  1  2  3  4
 *   Array:     [1, 0, 0, 0, 1]
 *                ^           ^
 *              last=0       i=4
 *
 *   Distancia = 4 - 0 - 1 = 3
 *   Hay 3 posiciones entre ellos: índices 1, 2, 3
 */
