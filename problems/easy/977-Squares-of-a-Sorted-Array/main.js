const sortedSquares = function (nums) {
  const subArr = [...nums] // Array resultado del mismo tamaño
  let left = 0 // Puntero al inicio del array
  let right = nums.length - 1 // Puntero al final del array

  // Llenamos el array desde la última posición hacia la primera
  for (let i = nums.length - 1; i >= 0; i--) {
    // Comparamos los cuadrados de los extremos
    if ((nums[right] ** 2) > (nums[left] ** 2)) {
      subArr[i] = nums[right] ** 2 // El extremo derecho es mayor
      right-- // Movemos puntero derecho hacia adentro
    } else {
      subArr[i] = nums[left] ** 2 // El extremo izquierdo es mayor
      left++ // Movemos puntero izquierdo hacia adentro
    }
  }

  return subArr
}

console.log(sortedSquares([-4, -1, 0, 3, 10])) // [0,1,9,16,100]

/**
 * Ejemplo paso a paso con nums = [-4,-1,0,3,10]:
 *
 * i=4: (-4)²=16 vs (10)²=100 → subArr[4]=100, right=3
 * i=3: (-4)²=16 vs (3)²=9   → subArr[3]=16,  left=1
 * i=2: (-1)²=1  vs (3)²=9   → subArr[2]=9,   right=2
 * i=1: (-1)²=1  vs (0)²=0   → subArr[1]=1,   left=2
 * i=0: (0)²=0   vs (0)²=0   → subArr[0]=0,   left=3
 *
 * Resultado: [0,1,9,16,100]
 */
