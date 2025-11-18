const isOneBitCharacter = function (bits) {
  let i = 0

  // Procesar todos los bits excepto el último
  while (i < bits.length - 1) {
    if (bits[i] === 0) {
      // Carácter de 1 bit: '0'
      i += 1
    } else {
      // Carácter de 2 bits: '10' o '11'
      i += 2
    }
  }

  // Si terminamos exactamente en el último índice,
  // el último '0' forma su propio carácter de 1 bit
  return i === bits.length - 1
}

console.log(isOneBitCharacter([1, 0, 0])) // true

/**
 * Ejemplo paso a paso con bits = [1, 0, 0]:
 * Índices:  0  1  2
 * Array:   [1, 0, 0]
 *
 * Estado inicial: i = 0
 *
 * Iteración 1:
 *   i = 0 < 2 ✓
 *   bits[0] = 1 → carácter de 2 bits
 *   Decodificación: "10" (índices 0-1)
 *   i = 0 + 2 = 2
 *
 * Condición del bucle:
 *   i = 2 < 2 ✗ → salir del bucle
 *
 * Verificación final:
 *   i === bits.length - 1
 *   2 === 2 ✓
 *   return true
 *
 * Explicación:
 * - Decodificamos "10" (índices 0-1)
 * - Quedó "0" (índice 2) sin procesar
 * - Como i apunta exactamente al último elemento,
 *   ese "0" es un carácter independiente de 1 bit
 *
 *
 * Ejemplo paso a paso con bits = [1, 1, 1, 0]:
 * Índices:  0  1  2  3
 * Array:   [1, 1, 1, 0]
 *
 * Estado inicial: i = 0
 *
 * Iteración 1:
 *   i = 0 < 3 ✓
 *   bits[0] = 1 → carácter de 2 bits
 *   Decodificación: "11" (índices 0-1)
 *   i = 0 + 2 = 2
 *
 * Iteración 2:
 *   i = 2 < 3 ✓
 *   bits[2] = 1 → carácter de 2 bits
 *   Decodificación: "10" (índices 2-3)
 *   i = 2 + 2 = 4
 *
 * Condición del bucle:
 *   i = 4 < 3 ✗ → salir del bucle
 *
 * Verificación final:
 *   i === bits.length - 1
 *   4 === 3 ✗
 *   return false
 *
 * Explicación:
 * - Decodificamos "11" (índices 0-1)
 * - Decodificamos "10" (índices 2-3)
 * - El "0" final formó parte del carácter de 2 bits "10"
 * - Por lo tanto, NO es un carácter independiente de 1 bit
 */
