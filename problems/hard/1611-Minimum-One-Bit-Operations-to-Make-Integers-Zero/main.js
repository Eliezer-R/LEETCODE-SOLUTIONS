const minimumOneBitOperations = function (n) {
  // result acumulará el XOR de todos los shifts de n
  let result = 0

  // Mientras n tenga bits activos
  while (n > 0) {
    // XOR con el valor actual de n
    // result ^= n es equivalente a result = result XOR n
    result ^= n

    // Shift a la derecha: dividir n entre 2 (eliminar el bit menos significativo)
    // n >>= 1 es equivalente a n = n >> 1
    n >>= 1
  }

  // El resultado es la inversa del Gray Code
  return result
}

console.log(minimumOneBitOperations(3)) // 2
console.log(minimumOneBitOperations(6)) // 4
console.log(minimumOneBitOperations(0)) // 0
