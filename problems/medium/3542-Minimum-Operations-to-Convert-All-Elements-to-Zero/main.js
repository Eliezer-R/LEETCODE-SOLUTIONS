const minOperations = function (nums) {
  // subArr actúa como un stack monotónico creciente
  const subArr = []

  // res cuenta el número de operaciones necesarias
  let res = 0

  // Iterar por cada número en el array
  for (const n of nums) {
    // Mientras el stack no esté vacío Y el top sea mayor que n
    // Necesitamos hacer pop porque n es menor (bajamos de nivel)
    while (subArr.length && subArr.at(-1) > n) { subArr.pop() }

    // Si n es 0, no necesitamos hacer nada
    // Los ceros no requieren operaciones
    if (n === 0) { continue }

    // Si el stack está vacío O el top es menor que n
    // Esto significa que estamos subiendo a un nuevo nivel
    if (!subArr.length || subArr.at(-1) < n) {
      // Incrementar operaciones (nuevo nivel)
      res++
      // Agregar n al stack
      subArr.push(n)
    }
    // Si subArr.at(-1) === n, no hacemos nada
    // Estamos en el mismo nivel
  }

  return res
}

console.log(minOperations([0, 2])) // 1
console.log(minOperations([3, 1, 2, 1])) // 3
console.log(minOperations([1, 2, 1, 2, 1, 2])) // 4
