const maxSumDivThree = function (nums) {
  let remainOne = Infinity // El número más pequeño con resto 1
  let remainTwo = Infinity // El número más pequeño con resto 2
  let sum = 0 // Suma total de todos los números

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]

    // Si el número tiene resto 1 al dividir por 3
    if (nums[i] % 3 === 1) {
      const revOne = remainOne
      const revTwo = remainTwo

      // Actualizar el número más pequeño con resto 1
      remainOne = Math.min(revOne, nums[i])

      // El más pequeño con resto 2 podría ser este número + el anterior más pequeño con resto 1
      // (1 + 1) % 3 = 2
      remainTwo = Math.min(revTwo, nums[i] + revOne)
    }
    // Si el número tiene resto 2 al dividir por 3
    else if (nums[i] % 3 === 2) {
      const revOne = remainOne
      const revTwo = remainTwo

      // El más pequeño con resto 1 podría ser este número + el anterior más pequeño con resto 2
      // (2 + 2) % 3 = 1
      remainOne = Math.min(revOne, nums[i] + revTwo)

      // Actualizar el número más pequeño con resto 2
      remainTwo = Math.min(revTwo, nums[i])
    }
  }

  // Calcular el resto de la suma total
  const resul = sum % 3

  // Si la suma ya es divisible por 3, retornarla
  if (resul % 3 === 0) return sum

  // Si el resto es 1, eliminar el número más pequeño con resto 1
  if (resul % 3 === 1) return sum - remainOne

  // Si el resto es 2, eliminar el número más pequeño con resto 2
  return sum - remainTwo
}

console.log(maxSumDivThree([3, 6, 5, 1, 8])) // 18

/**
 * Ejemplo paso a paso con nums = [3,6,5,1,8]:
 *
 * Estado inicial:
 *   remainOne = ∞, remainTwo = ∞, sum = 0
 *
 * Iteración i=0, nums[0]=3:
 *   sum = 0 + 3 = 3
 *   3 % 3 = 0 → No actualizar remainOne ni remainTwo
 *   Estado: sum=3, remainOne=∞, remainTwo=∞
 *
 * Iteración i=1, nums[1]=6:
 *   sum = 3 + 6 = 9
 *   6 % 3 = 0 → No actualizar
 *   Estado: sum=9, remainOne=∞, remainTwo=∞
 *
 * Iteración i=2, nums[2]=5:
 *   sum = 9 + 5 = 14
 *   5 % 3 = 2 → Entrar al bloque "resto 2"
 *   revOne = ∞, revTwo = ∞
 *   remainOne = min(∞, 5 + ∞) = ∞
 *   remainTwo = min(∞, 5) = 5
 *   Estado: sum=14, remainOne=∞, remainTwo=5
 *
 * Iteración i=3, nums[3]=1:
 *   sum = 14 + 1 = 15
 *   1 % 3 = 1 → Entrar al bloque "resto 1"
 *   revOne = ∞, revTwo = 5
 *   remainOne = min(∞, 1) = 1
 *   remainTwo = min(5, 1 + ∞) = 5
 *   Estado: sum=15, remainOne=1, remainTwo=5
 *
 * Iteración i=4, nums[4]=8:
 *   sum = 15 + 8 = 23
 *   8 % 3 = 2 → Entrar al bloque "resto 2"
 *   revOne = 1, revTwo = 5
 *   remainOne = min(1, 8 + 5) = min(1, 13) = 1
 *   remainTwo = min(5, 8) = 5
 *   Estado: sum=23, remainOne=1, remainTwo=5
 *
 * Decisión final:
 *   resul = 23 % 3 = 2
 *   resul === 2 → return sum - remainTwo = 23 - 5 = 18 ✓
 *
 * Explicación: La suma total es 23, que tiene resto 2.
 * Para hacerla divisible por 3, eliminamos el número más pequeño
 * con resto 2, que es 5. Resultado: 23 - 5 = 18.
 *
 *
 * Ejemplo paso a paso con nums = [1,2,3,4,4]:
 *
 * sum acumulada: 1+2+3+4+4 = 14
 * 14 % 3 = 2
 *
 * Durante el proceso:
 * - Encontramos nums con resto 1: 1, 4, 4 → remainOne rastreará el más pequeño
 * - Encontramos nums con resto 2: 2 → remainTwo = 2
 * - Nums con resto 0: 3
 *
 * remainOne será 1 (el más pequeño con resto 1)
 * remainTwo será 2 (el más pequeño con resto 2)
 *
 * Como sum % 3 = 2, eliminamos remainTwo = 2
 * Resultado: 14 - 2 = 12 ✓
 */
