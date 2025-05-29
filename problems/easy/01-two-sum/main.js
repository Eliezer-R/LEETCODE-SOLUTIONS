const twoSum = function (nums, target) {
  const result = [] // Array para almacenar los índices de la solución
  for (let i = 0; i < nums.length; i++) { // Recorremos el array con el primer índice
    for (let j = i + 1; j < nums.length; j++) { // Recorremos el resto del array con el segundo índice
      if ((nums[i] + nums[j]) === target) { // Comprobamos si la suma es igual al target
        result.push(i, j) // Guardamos los índices encontrados
        break // Salimos del segundo bucle al encontrar la solución
      }
    }
    if (result.length !== 0) { // Si ya encontramos la solución, salimos del primer bucle
      break
    }
  }
  return result // Retornamos los índices encontrados
}

console.log(twoSum([3, 2, 3], 6)) // Salida esperada: [0, 2]
