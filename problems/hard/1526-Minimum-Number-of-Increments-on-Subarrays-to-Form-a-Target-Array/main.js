const minNumberOperations = function (target) {
  // El primer elemento siempre necesita ese número de operaciones
  // (partimos de 0, así que necesitamos target[0] operaciones)
  let operations = target[0]

  // Recorrer el resto del array comparando elementos consecutivos
  for (let i = 1; i < target.length; i++) {
    // Solo sumamos si el valor actual es MAYOR que el anterior
    // Si es menor o igual, podemos reutilizar operaciones previas
    // Math.max(..., 0) asegura que nunca restemos (solo sumamos diferencias positivas)
    operations += Math.max((target[i] - target[i - 1]), 0)
  }

  return operations
}

console.log(minNumberOperations([1, 2, 3, 2, 1])) // 3
console.log(minNumberOperations([3, 1, 1, 2])) // 4
console.log(minNumberOperations([3, 1, 5, 4, 2])) // 7
console.log(minNumberOperations([1, 1, 1, 1])) // 1
