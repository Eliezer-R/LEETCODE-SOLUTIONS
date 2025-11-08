const findXSum = function (nums, k, x) {
  // i: índice de inicio de la ventana deslizante
  let i = 0

  // arr: almacena los resultados (x-sums de cada ventana)
  const arr = []

  // Iterar mientras la ventana de tamaño k quepa en el array
  // (i + k) <= nums.length asegura que no nos salgamos de límites
  while ((i + k) <= nums.length) {
    // j: puntero para iterar dentro de la ventana actual
    let j = i

    // map: estructura para contar frecuencias
    // clave = número, valor = frecuencia
    const map = new Map()

    // Contar frecuencias de todos los elementos en la ventana [i, i+k)
    while (j < (i + k)) {
      // map.get(nums[j]) obtiene la frecuencia actual (o 0 si no existe)
      // Le sumamos 1 y guardamos el nuevo valor
      map.set(nums[j], (map.get(nums[j]) || 0) + 1)
      j++
    }

    // CASO ESPECIAL: Si hay menos de x elementos distintos
    // En este caso, el x-sum es simplemente la suma de todos
    if (map.size < x) {
      // slice(i, i+k) extrae la ventana actual
      // reduce suma todos los elementos
      const subArr = nums.slice(i, (i + k)).reduce((value, sum) => value + sum, 0)
      arr.push(subArr)
    } else {
      // CASO NORMAL: Hay x o más elementos distintos

      // Convertir el Map a un array de objetos para poder ordenar
      const array = []
      for (const [key, value] of map.entries()) {
        // Crear objeto con el número y su frecuencia
        array.push({ num: key, freq: value })
      }

      // Ordenar por:
      // 1. Frecuencia descendente (b.freq - a.freq)
      // 2. Si empatan en frecuencia, por valor descendente (b.num - a.num)
      array.sort((a, b) => {
        if (b.freq === a.freq) return b.num - a.num
        return b.freq - a.freq
      })

      // Tomar solo los primeros x elementos (los más frecuentes)
      const topX = array.slice(0, x)

      // Calcular la suma: número × frecuencia para cada uno
      let sum = 0
      for (const { num, freq } of topX) {
        sum += num * freq
      }

      // Agregar el resultado al array de respuestas
      arr.push(sum)
    }

    // Mover la ventana una posición a la derecha
    i++
  }

  return arr
}

console.log(findXSum([1, 1, 2, 2, 3, 4, 2, 3], 6, 2)) // [6,10,12]
console.log(findXSum([3, 8, 7, 8, 7, 5], 2, 2)) // [11,15,15,15,12]
