const countOperations = function (num1, num2) {
  // operations cuenta el número total de operaciones realizadas
  let operations = 0

  // Mientras ambos números sean mayores que 0
  // Si uno de ellos es 0, hemos terminado
  while (num1 > 0 && num2 > 0) {
    // Comparar cuál número es mayor o si son iguales
    if (num1 >= num2) {
      // Si num1 es mayor o igual, restar num2 de num1
      num1 = num1 - num2
      // Incrementar el contador de operaciones
      operations++
    } else {
      // Si num2 es mayor, restar num1 de num2
      num2 = num2 - num1
      // Incrementar el contador de operaciones
      operations++
    }
  }

  // Retornar el número total de operaciones
  return operations
}

console.log(countOperations(2, 3)) // 3
console.log(countOperations(10, 10)) // 1
console.log(countOperations(100, 3)) // 36
