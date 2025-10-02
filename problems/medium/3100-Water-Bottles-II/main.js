const maxBottlesDrunk = function (numBottles, numExchange) {
  let emptyBottles = numBottles // Botellas vacías disponibles
  let fullBottles = numBottles // Total de botellas bebidas (acumulador)

  // Mientras podamos hacer un intercambio
  while (emptyBottles >= numExchange) {
    emptyBottles -= numExchange - 1 // Costo neto del intercambio
    numExchange++ // Incrementar costo para próximo intercambio
    fullBottles++ // Contar la nueva botella bebida
  }

  return fullBottles
}

console.log(maxBottlesDrunk(13, 6)) // 15

/**
 * Ejemplo paso a paso con numBottles = 13, numExchange = 6:
 *
 * Estado inicial:
 * emptyBottles = 13 (bebimos las 13 iniciales)
 * fullBottles = 13 (total bebido hasta ahora)
 * numExchange = 6 (costo actual)
 *
 * Iteración 1:
 * 13 >= 6? Sí, podemos intercambiar
 * emptyBottles = 13 - (6-1) = 13 - 5 = 8
 *   (usamos 6, obtenemos 1 llena que se vuelve vacía = neto -5)
 * numExchange = 6 + 1 = 7
 * fullBottles = 13 + 1 = 14
 *
 * Iteración 2:
 * 8 >= 7? Sí, podemos intercambiar
 * emptyBottles = 8 - (7-1) = 8 - 6 = 2
 * numExchange = 7 + 1 = 8
 * fullBottles = 14 + 1 = 15
 *
 * Iteración 3:
 * 2 >= 8? No, terminar
 *
 * Resultado: 15
 */
