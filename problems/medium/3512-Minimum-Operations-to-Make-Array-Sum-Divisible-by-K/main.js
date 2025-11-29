const minOperations = function (nums, k) {
  // Calcular la suma total del arreglo
  const sum = nums.reduce((acc, n) => acc + n, 0)

  // El número de operaciones es simplemente el resto
  return sum % k
}

console.log(minOperations([3, 9, 7], 5)) // 4

/**
 * Ejemplo paso a paso con nums = [3,9,7], k = 5:
 *
 * Paso 1: Calcular suma
 *   sum = 3 + 9 + 7 = 19
 *
 * Paso 2: Calcular resto
 *   resto = 19 % 5 = 4
 *
 * Resultado: 4 operaciones
 *
 * Explicación:
 * La suma actual es 19.
 * Para hacerla divisible por 5, necesitamos llegar a 15 (o 10, o 20, etc.)
 * El múltiplo de 5 más cercano por debajo es 15.
 * 19 - 15 = 4 operaciones necesarias.
 *
 * Una forma de hacerlo: decrementar nums[1] cuatro veces: 9→8→7→6→5
 * Nueva suma: 3 + 5 + 7 = 15 ✓
 *
 *
 * Ejemplo con nums = [4,1,3], k = 4:
 *
 * sum = 4 + 1 + 3 = 8
 * resto = 8 % 4 = 0
 *
 * Resultado: 0 operaciones
 *
 * Explicación: La suma ya es divisible por 4.
 *
 *
 * Ejemplo con nums = [3,2], k = 6:
 *
 * sum = 3 + 2 = 5
 * resto = 5 % 6 = 5
 *
 * Resultado: 5 operaciones
 *
 * Explicación:
 * Necesitamos llegar a 0 (múltiplo de 6 más cercano).
 * 5 - 0 = 5 operaciones.
 * Podemos hacer: 3→2→1→0, 2→1→0 (total 5 operaciones)
 */
