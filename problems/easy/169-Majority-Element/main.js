const majorityElement = function (nums) {
  let count = 0 // Contador para el algoritmo de Boyer-Moore
  let candidate = null // Candidato actual a elemento mayoritario

  // Recorremos el array
  for (let i = 0; i < nums.length; i++) {
    // Si el contador es 0, cambiamos el candidato al elemento actual
    if (count === 0) {
      candidate = nums[i]
    }
    // Si el elemento actual es igual al candidato, incrementamos el contador
    if (nums[i] === candidate) {
      count++
    } else {
      // Si no es igual, decrementamos el contador
      count--
    }
  }

  // Al final, candidate es el elemento mayoritario
  return candidate
}

console.log(majorityElement([3, 2, 3])) // 3

/**
 * Ejemplo paso a paso con nums = [3,2,3]:
 * i=0: nums[0]=3, count=0 → candidate=3, count=1
 * i=1: nums[1]=2, candidate=3 ≠ 2 → count=0
 * i=2: nums[2]=3, count=0 → candidate=3, count=1
 * Resultado final: candidate=3
 *
 * Así, el elemento mayoritario es 3.
 */
