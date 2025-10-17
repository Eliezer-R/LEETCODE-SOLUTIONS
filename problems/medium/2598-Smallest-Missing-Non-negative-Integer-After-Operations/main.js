const findSmallestInteger = function (nums, value) {
  // Array para contar frecuencia de cada residuo (0 a value-1)
  const freq = new Int32Array(value)

  // Contar residuos de todos los números
  for (let i = 0; i < nums.length; i++) {
    // Manejar números negativos: ((n % v) + v) % v siempre da positivo
    const rem = ((nums[i] % value) + value) % value
    freq[rem]++
  }

  // Intentar formar 0, 1, 2, 3, ... usando los residuos
  let j = 0
  while (true) {
    const rem = j % value // Residuo necesario para formar j

    if (freq[rem]) {
      freq[rem]-- // Usar un número con este residuo
      j++ // Intentar siguiente número
    } else {
      return j // No podemos formar j, es el MEX
    }
  }
}

console.log(findSmallestInteger([1, -10, 7, 13, 6, 8], 5)) // 4

/**
 * Ejemplo paso a paso con nums = [1,-10,7,13,6,8], value = 5:
 *
 * Residuos:
 * 1 % 5 = 1
 * -10 % 5 = 0 (después de ajustar)
 * 7 % 5 = 2
 * 13 % 5 = 3
 * 6 % 5 = 1
 * 8 % 5 = 3
 *
 * freq = [1, 2, 1, 2, 0]
 *         0  1  2  3  4
 *
 * Formando secuencia:
 * j=0: rem=0, freq[0]=1 → usar, freq[0]=0, j=1
 * j=1: rem=1, freq[1]=2 → usar, freq[1]=1, j=2
 * j=2: rem=2, freq[2]=1 → usar, freq[2]=0, j=3
 * j=3: rem=3, freq[3]=2 → usar, freq[3]=1, j=4
 * j=4: rem=4, freq[4]=0 → no podemos formar 4
 *
 * Resultado: 4
 */
