const numWaterBottles = function (numBottles, numExchange) {
  // Fórmula matemática directa
  return numBottles + Math.floor((numBottles - 1) / (numExchange - 1))
}

console.log(numWaterBottles(9, 3)) // 13

/**
 * Explicación de la fórmula:
 *
 * totalDrunk = iniciales + extras por intercambio
 *
 * extras = floor((numBottles - 1) / (numExchange - 1))
 *
 * ¿Por qué (numExchange - 1)?
 * - Para obtener 1 botella extra, necesitas numExchange vacías
 * - Pero esa botella extra también se volverá vacía
 * - Entonces el "costo neto" es numExchange - 1
 *
 * Ejemplo con numBottles = 9, numExchange = 3:
 *
 * Método tradicional (simulación):
 * Inicial: 9 llenas → bebes 9 → 9 vacías
 * Round 1: 9/3 = 3 intercambios → 3 llenas, 0 vacías sobrantes
 *          bebes 3 → 3 vacías
 * Round 2: 3/3 = 1 intercambio → 1 llena, 0 vacías
 *          bebes 1 → 1 vacía
 * Round 3: 1 < 3, no más intercambios
 * Total: 9 + 3 + 1 = 13
 *
 * Con fórmula:
 * 9 + floor((9-1) / (3-1))
 * = 9 + floor(8 / 2)
 * = 9 + floor(4)
 * = 9 + 4
 * = 13 ✓
 */
