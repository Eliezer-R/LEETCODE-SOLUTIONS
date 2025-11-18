const maxOperations = function (s) {
  let ones = 0; let res = 0

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '1') {
      // Contar el número de '1's que hemos visto
      ones++
    } else if (i > 0 && s[i - 1] === '1') {
      // Encontramos un '0' justo después de un '1'
      // Esto significa que terminó un grupo de '1's
      // Todas las '1's vistas necesitan moverse sobre este grupo de '0's
      res += ones
    }
  }

  return res
}

console.log(maxOperations('1001101')) // 4

/**
 * Ejemplo paso a paso con s = "1001101":
 *
 * Iteración por cada carácter:
 *
 * i=0, s[0]='1': ones=1, res=0
 *
 * i=1, s[1]='0': i>0 && s[0]='1' ✓
 *   → res += ones → res = 0 + 1 = 1
 *   (El primer '1' necesita moverse sobre este '0')
 *
 * i=2, s[2]='0': i>0 pero s[1]='0' ✗
 *   → No hacemos nada (ya contamos este grupo de '0's)
 *
 * i=3, s[3]='1': ones=2, res=1
 *
 * i=4, s[4]='1': ones=3, res=1
 *
 * i=5, s[5]='0': i>0 && s[4]='1' ✓
 *   → res += ones → res = 1 + 3 = 4
 *   (Los tres '1's acumulados necesitan moverse sobre este '0')
 *
 * i=6, s[6]='1': ones=4, res=4
 *
 * Resultado: 4
 *
 * Explicación de la lógica:
 * - El primer '1' (posición 0) necesita moverse una vez
 * - Los tres '1's siguientes (posiciones 3,4,6) cada uno necesita
 *   moverse sobre el '0' de la posición 5
 * - Total: 1 + 3 = 4 operaciones
 */
