const triangularSum = function (nums) {
  // Mientras haya más de un elemento
  while (nums.length > 1) {
    // Calcular nuevos valores sumando pares adyacentes
    for (let i = 0; i < nums.length - 1; i++) {
      nums[i] = (nums[i] + nums[i + 1]) % 10
    }
    // Eliminar el último elemento (ya procesado)
    nums.pop()
  }

  return nums[0]
}

console.log(triangularSum([1, 2, 3, 4, 5])) // 8

/**
 * Ejemplo paso a paso con nums = [1,2,3,4,5]:
 *
 * Iteración 1: nums.length = 5
 * i=0: nums[0] = (1+2)%10 = 3
 * i=1: nums[1] = (2+3)%10 = 5
 * i=2: nums[2] = (3+4)%10 = 7
 * i=3: nums[3] = (4+5)%10 = 9
 * nums.pop() → nums = [3,5,7,9]
 *
 * Iteración 2: nums.length = 4
 * i=0: nums[0] = (3+5)%10 = 8
 * i=1: nums[1] = (5+7)%10 = 2
 * i=2: nums[2] = (7+9)%10 = 6
 * nums.pop() → nums = [8,2,6]
 *
 * Iteración 3: nums.length = 3
 * i=0: nums[0] = (8+2)%10 = 0
 * i=1: nums[1] = (2+6)%10 = 8
 * nums.pop() → nums = [0,8]
 *
 * Iteración 4: nums.length = 2
 * i=0: nums[0] = (0+8)%10 = 8
 * nums.pop() → nums = [8]
 *
 * nums.length = 1, terminar
 * Resultado: 8
 */
