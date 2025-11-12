const minOperations = function (nums) {
  const n = nums.length

  // Paso 1: Contar cuántos 1s ya existen
  let ones = 0
  for (const x of nums) if (x === 1) ones++

  // Si ya hay 1s, solo necesitamos convertir los no-1
  // Cada no-1 necesita 1 operación con un 1 adyacente
  if (ones > 0) return n - ones

  // Función auxiliar: calcular GCD de dos números
  const gcd = (a, b) => {
    // Algoritmo de Euclides
    while (b !== 0) {
      const t = a % b
      a = b
      b = t
    }
    return Math.abs(a)
  }

  // Paso 2: Calcular GCD de todo el array
  let g = 0
  for (const x of nums) g = gcd(g, x)

  // Si el GCD total es > 1, es imposible llegar a 1
  // (todos los números comparten un factor común > 1)
  if (g > 1) return -1

  // Paso 3: Encontrar el subarray más pequeño con GCD = 1
  // Esto nos dice cuántas operaciones necesitamos para crear un 1
  let best = Infinity

  // Probar cada posición de inicio i
  for (let i = 0; i < n; i++) {
    let cur = 0 // GCD acumulativo del subarray

    // Extender el subarray desde i hasta j
    for (let j = i; j < n; j++) {
      // Actualizar GCD con el nuevo elemento
      cur = gcd(cur, nums[j])

      // Si llegamos a GCD = 1, encontramos un subarray válido
      if (cur === 1) {
        // Guardar la longitud más pequeña encontrada
        best = Math.min(best, j - i + 1)
        break // No necesitamos extender más desde i
      }
    }
  }

  // Paso 4: Calcular el resultado
  // (best - 1) operaciones para crear un 1 en el subarray
  // + (n - 1) operaciones para propagar ese 1 al resto
  return (best - 1) + (n - 1)
}

console.log(minOperations([2, 6, 3, 4])) // 4
console.log(minOperations([2, 4, 6, 8])) // -1
console.log(minOperations([1, 2, 3])) // 2
