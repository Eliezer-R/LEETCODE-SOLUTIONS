const singleNumber = function (nums) {
  let oneElem = nums[0] // Inicializamos oneElem con el primer elemento del array

  // Recorremos el array desde el segundo elemento hasta el final
  for (let i = 0; i < nums.length - 1; i++) {
    // Usamos el operador XOR (^) entre el siguiente elemento y el acumulador oneElem
    // El XOR elimina los números que aparecen dos veces, dejando solo el que aparece una vez
    oneElem = nums[i + 1] ^ oneElem
  }

  return oneElem // Al final, oneElem contiene el número único
}

console.log(singleNumber([2, 2, 1])) // 1

/**
 * Ejemplo paso a paso con nums = [2, 2, 1]:
 * Inicializamos: oneElem = 2
 * Iteración 1: i = 0 -> nums[i+1] = 2; oneElem = 2 ^ 2 = 0
 * Iteración 2: i = 1 -> nums[i+1] = 1; oneElem = 1 ^ 0 = 1
 * Resultado final: oneElem = 1
 *
 * Así, el número único es 1.
 */
