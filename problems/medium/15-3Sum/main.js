const threeSum = function (nums) {
  const arr = [] // Inicializamos un array donde guardaremos las combinaciones
  nums.sort((a, b) => a - b) // Ordenamos el array de menor a mayor para poder obtener mejores resultados y evitar repetidos

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue // Aquí lo que decimos es que si el número actual es igual al anterior, es repetido y no lo necesitamos

    let k = nums.length - 1 // Inicializamos el primer puntero
    let j = i + 1 // Inicializamos el segundo puntero

    while (j < k) {
      // Mientras j sea menor que k, seguimos buscando combinaciones
      const sum = nums[j] + nums[k] // Aquí está el truco: ahora el ejercicio se convierte en un 2Sum, no un 3Sum

      if (sum === -nums[i]) {
        // Si la suma es igual al negativo del número actual, entonces en total suman 0
        // Ejemplo: -1 + 0 + 1 = 0 → aquí nums[i] es -1 y sum sería 1 (0+1)
        arr.push([nums[i], nums[j], nums[k]]) // Guardamos los tres números
        j++
        k--

        // Esto es clave: sirve para lo mismo que el primer if de arriba y evita combinaciones repetidas
        while (nums[j] === nums[j - 1]) j++
        while (nums[k] === nums[k + 1]) k--
      } else if (sum < -nums[i]) {
        // Si la suma es menor al objetivo (-nums[i]), significa que debemos mover j a la derecha
        j++
      } else {
        // Si la suma es mayor al objetivo, movemos k a la izquierda
        k--
      }
    }
  }

  return arr // Retornamos el array con los resultados
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
