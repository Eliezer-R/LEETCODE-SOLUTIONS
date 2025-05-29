const twoSum = function (nums, target) {
  const map = new Map() // Inicializamos un Map para guardar los elementos y sus índices

  for (let i = 0; i < nums.length; i++) { // Recorremos los elementos del array
    if (map.has(target - nums[i])) { // Comprobamos si existe el complemento en el Map
      return [i, map.get(target - nums[i])] // Retornamos los índices de la solución
    }

    map.set(nums[i], i) // Guardamos el valor actual y su índice en el Map
  }
}

console.log(twoSum([3, 2, 3], 6)) // Salida esperada: [1, 0]
