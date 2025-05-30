const searchInsert = function (nums, target) {
  // Verificamos si el número está dentro del array
  if (nums.includes(target)) {
    // Si está, devolvemos su índice
    return nums.indexOf(target)
  }

  // Usamos dos punteros para la búsqueda binaria
  let init = 0 // Índice inicial
  let final = nums.length - 1 // Índice final

  // Búsqueda binaria
  while (init <= final) {
    // Calculamos el índice del medio
    const mid = Math.floor(init + (final - init) / 2)

    if (nums[mid] === target) {
      // Si encontramos el elemento, retornamos su índice
      return mid
    }

    if (nums[mid] > target) {
      // Si el elemento medio es mayor que target, buscamos en la mitad izquierda
      final = mid - 1
    } else {
      // Si el elemento medio es menor que target, buscamos en la mitad derecha
      init = mid + 1
    }
  }

  // Si no encontramos el elemento, retornamos el índice donde debería insertarse
  return init
}

console.log(searchInsert([1, 3, 5, 6], 2)) // -> 1
