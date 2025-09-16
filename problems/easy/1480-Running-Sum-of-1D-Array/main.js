const runningSum = function (nums) {
  let prefix = 0 // Acumulador de la suma corriente
  const subArr = [] // Array resultado

  // Recorrer el array original una sola vez
  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i] // Agregar elemento actual a la suma acumulada
    subArr[i] = prefix // Guardar suma acumulada en la posición i
  }

  return subArr
}

console.log(runningSum([1, 2, 3, 4])) // [1,3,6,10]

/**
 * Ejemplo paso a paso con nums = [1,2,3,4]:
 *
 * i=0: prefix = 0 + 1 = 1  → subArr[0] = 1  → subArr = [1]
 * i=1: prefix = 1 + 2 = 3  → subArr[1] = 3  → subArr = [1,3]
 * i=2: prefix = 3 + 3 = 6  → subArr[2] = 6  → subArr = [1,3,6]
 * i=3: prefix = 6 + 4 = 10 → subArr[3] = 10 → subArr = [1,3,6,10]
 *
 * Resultado: [1,3,6,10]
 */
