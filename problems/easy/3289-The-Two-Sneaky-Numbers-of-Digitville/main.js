const getSneakyNumbers = function (nums) {
  // Array para almacenar los dos números duplicados
  const subArr = []

  // Objeto para rastrear qué números ya hemos visto
  const obj = {}

  // Recorrer todo el array de números
  for (let i = 0; i < nums.length; i++) {
    // Verificar si este número ya existe en nuestro objeto
    // Object.hasOwn() es más moderno que hasOwnProperty()
    if (Object.hasOwn(obj, `${nums[i]}`)) {
      // Si ya existe, es un duplicado → agregarlo al resultado
      subArr.push(nums[i])
    } else {
      // Si no existe, registrarlo como visto
      // El valor 1 es solo un placeholder, lo importante es la clave
      obj[nums[i]] = 1
    }

    // Optimización: si ya encontramos los 2 duplicados, terminar early
    if (subArr.length === 2) break
  }

  return subArr
}

console.log(getSneakyNumbers([0, 1, 1, 0])) // [1,0] o [0,1]
console.log(getSneakyNumbers([0, 3, 2, 1, 3, 2])) // [3,2] o [2,3]
console.log(getSneakyNumbers([7, 1, 5, 4, 3, 4, 6, 0, 9, 5, 8, 2])) // [4,5] o [5,4]
