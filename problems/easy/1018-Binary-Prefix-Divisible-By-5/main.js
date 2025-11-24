const prefixesDivBy5 = function (nums) {
  const answers = Array(nums.length).fill(0) // Nota: debería ser nums.length, no nums.length - 1
  let current = 0 // Resto actual al dividir por 5

  for (let i = 0; i < nums.length; i++) {
    // Construir el siguiente número binario:
    // Multiplicar por 2 (shift izquierdo) y agregar el nuevo bit
    // Tomar módulo 5 para mantener solo el resto
    current = (current * 2 + nums[i]) % 5

    // Si el resto es 0, el número es divisible por 5
    answers[i] = current === 0
  }

  return answers
}

console.log(prefixesDivBy5([0, 1, 1])) // [true,false,false]

/**
 * Ejemplo paso a paso con nums = [0,1,1]:
 *
 * Estado inicial: current = 0, answers = [0, 0, 0]
 *
 * Iteración i=0, nums[0]=0:
 *   Número binario: "0" (valor decimal: 0)
 *   current = (0 * 2 + 0) % 5 = 0 % 5 = 0
 *   0 === 0? → true
 *   answers[0] = true
 *   Estado: current=0, answers=[true, 0, 0]
 *
 * Iteración i=1, nums[1]=1:
 *   Número binario: "01" (valor decimal: 1)
 *   current = (0 * 2 + 1) % 5 = 1 % 5 = 1
 *   1 === 0? → false
 *   answers[1] = false
 *   Estado: current=1, answers=[true, false, 0]
 *
 * Iteración i=2, nums[2]=1:
 *   Número binario: "011" (valor decimal: 3)
 *   current = (1 * 2 + 1) % 5 = 3 % 5 = 3
 *   3 === 0? → false
 *   answers[2] = false
 *   Estado: current=3, answers=[true, false, false]
 *
 * Resultado final: [true, false, false]
 *
 * Verificación:
 * - Prefijo [0]: binario "0" = decimal 0, 0 % 5 = 0 ✓
 * - Prefijo [0,1]: binario "01" = decimal 1, 1 % 5 = 1 ✗
 * - Prefijo [0,1,1]: binario "011" = decimal 3, 3 % 5 = 3 ✗
 *
 *
 * Ejemplo paso a paso con nums = [1,1,1]:
 *
 * Estado inicial: current = 0
 *
 * Iteración i=0, nums[0]=1:
 *   Binario: "1" = decimal 1
 *   current = (0 * 2 + 1) % 5 = 1
 *   answers[0] = false
 *
 * Iteración i=1, nums[1]=1:
 *   Binario: "11" = decimal 3
 *   current = (1 * 2 + 1) % 5 = 3
 *   answers[1] = false
 *
 * Iteración i=2, nums[2]=1:
 *   Binario: "111" = decimal 7
 *   current = (3 * 2 + 1) % 5 = 7 % 5 = 2
 *   answers[2] = false
 *
 * Resultado: [false, false, false]
 *
 *
 * Ejemplo con nums = [0,1,1,1,1,1]:
 *
 * i=0: "0"=0, 0%5=0 → true
 * i=1: "01"=1, 1%5=1 → false
 * i=2: "011"=3, 3%5=3 → false
 * i=3: "0111"=7, 7%5=2 → false
 * i=4: "01111"=15, 15%5=0 → true
 * i=5: "011111"=31, 31%5=1 → false
 *
 * Resultado: [true,false,false,false,true,false]
 */
