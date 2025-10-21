const finalValueAfterOperations = function (operations) {
  let x = 0

  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === '--X' || operations[i] === 'X--') {
      x--
    } else {
      x++
    }
  }

  return x
}

console.log(finalValueAfterOperations(['--X', 'X++', 'X++'])) // 1
console.log(finalValueAfterOperations(['++X', '++X', 'X++'])) // 3
console.log(finalValueAfterOperations(['X++', '++X', '--X', 'X--'])) // 0

/**
 * Explicación del proceso:
 * - Cada operación incrementa o decrementa X en 1
 * - "--X" y "X--" decrementan → x--
 * - "++X" y "X++" incrementan → x++
 * - Simplemente contamos la diferencia neta
 */
