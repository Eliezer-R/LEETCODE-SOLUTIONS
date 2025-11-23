const minimumOperations = function (nums) {
  let resul = 0

  // Contar cuántos elementos no son divisibles por 3
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 3 !== 0) {
      resul++
    }
  }

  return resul
}

console.log(minimumOperations([1, 2, 3, 4])) // 3

/**
 * Ejemplo paso a paso con nums = [1,2,3,4]:
 *
 * Estado inicial: resul = 0
 *
 * Iteración i=0, nums[0]=1:
 *   1 % 3 = 1 (no es 0)
 *   resul++ → resul = 1
 *   (Necesita 1 operación: 1-1=0, divisible por 3)
 *
 * Iteración i=1, nums[1]=2:
 *   2 % 3 = 2 (no es 0)
 *   resul++ → resul = 2
 *   (Necesita 1 operación: 2+1=3, divisible por 3)
 *
 * Iteración i=2, nums[2]=3:
 *   3 % 3 = 0 ✓
 *   No incrementar
 *   (Ya es divisible por 3, 0 operaciones)
 *
 * Iteración i=3, nums[3]=4:
 *   4 % 3 = 1 (no es 0)
 *   resul++ → resul = 3
 *   (Necesita 1 operación: 4-1=3, divisible por 3)
 *
 * Resultado final: resul = 3
 *
 *
 * Ejemplo paso a paso con nums = [3,6,9]:
 *
 * Estado inicial: resul = 0
 *
 * Iteración i=0, nums[0]=3:
 *   3 % 3 = 0 ✓ → No incrementar
 *
 * Iteración i=1, nums[1]=6:
 *   6 % 3 = 0 ✓ → No incrementar
 *
 * Iteración i=2, nums[2]=9:
 *   9 % 3 = 0 ✓ → No incrementar
 *
 * Resultado final: resul = 0
 */
