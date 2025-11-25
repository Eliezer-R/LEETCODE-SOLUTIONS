const smallestRepunitDivByK = function (k) {
  // Caso imposible: k tiene factor 2 o 5
  // Números formados por solo 1's nunca son pares ni terminan en 0 o 5
  if (k % 2 === 0 || k % 5 === 0) return -1

  let rem = 0 // Resto actual al dividir por k

  // Iterar hasta k veces (por el Principio del Palomar)
  for (let length = 1; length <= k; length++) {
    // Construir el siguiente número: rem * 10 + 1
    // Ejemplo: 1 → 11 → 111 → 1111
    // En términos de restos: (resto_anterior * 10 + 1) % k
    rem = (rem * 10 + 1) % k

    // Si el resto es 0, encontramos la respuesta
    if (rem === 0) return length
  }

  // Si no encontramos solución en k iteraciones, no existe
  return -1
}

console.log(smallestRepunitDivByK(3)) // 3

/**
 * Ejemplo paso a paso con k = 3:
 *
 * Verificación inicial:
 *   3 % 2 = 1 (no es 0) ✓
 *   3 % 5 = 3 (no es 0) ✓
 *   → Continuar búsqueda
 *
 * Estado inicial: rem = 0
 *
 * Iteración length=1:
 *   Número: "1" (decimal: 1)
 *   rem = (0 * 10 + 1) % 3 = 1 % 3 = 1
 *   1 === 0? → false
 *
 * Iteración length=2:
 *   Número: "11" (decimal: 11)
 *   rem = (1 * 10 + 1) % 3 = 11 % 3 = 2
 *   2 === 0? → false
 *
 * Iteración length=3:
 *   Número: "111" (decimal: 111)
 *   rem = (2 * 10 + 1) % 3 = 21 % 3 = 0
 *   0 === 0? → true ✓
 *   return 3
 *
 * Resultado: 3
 * Verificación: 111 / 3 = 37 ✓
 *
 *
 * Ejemplo paso a paso con k = 2:
 *
 * Verificación inicial:
 *   2 % 2 = 0 ✓
 *   return -1 (imposible)
 *
 * Explicación: Números formados solo por 1's son siempre impares,
 * nunca divisibles por 2.
 *
 *
 * Ejemplo paso a paso con k = 7:
 *
 * Verificación inicial:
 *   7 % 2 = 1 ✓
 *   7 % 5 = 2 ✓
 *   → Continuar
 *
 * rem = 0
 *
 * length=1: rem = (0*10+1)%7 = 1%7 = 1
 * length=2: rem = (1*10+1)%7 = 11%7 = 4
 * length=3: rem = (4*10+1)%7 = 41%7 = 6
 * length=4: rem = (6*10+1)%7 = 61%7 = 5
 * length=5: rem = (5*10+1)%7 = 51%7 = 2
 * length=6: rem = (2*10+1)%7 = 21%7 = 0 ✓
 *
 * Resultado: 6
 * Número: "111111" = 111,111 / 7 = 15,873 ✓
 */
