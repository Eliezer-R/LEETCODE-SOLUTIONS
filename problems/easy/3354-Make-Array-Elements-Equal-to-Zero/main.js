const countValidSelections = function (nums) {
  let count = 0 // Contador de selecciones válidas
  let left = 0 // Suma de elementos a la izquierda

  // Calcular suma total del array (representa la suma derecha inicial)
  let right = nums.reduce((value, sum) => value + sum)

  // Recorrer cada posición del array
  for (let i = 0; i < nums.length; i++) {
    // Actualizar sumas: agregar a left, quitar de right
    left += nums[i]
    right -= nums[i]

    // Si la posición no es 0, continuar (solo los 0 son válidos)
    if (nums[i] !== 0) continue

    // CASO 1: Sumas iguales → podemos ir en ambas direcciones
    if (left === right) count += 2

    // CASO 2: Diferencia de 1 → solo una dirección funciona
    if (Math.abs(left - right) === 1) count++
  }

  return count
}

console.log(countValidSelections([1, 0, 2, 0, 3])) // 2
console.log(countValidSelections([2, 3, 4, 0, 4, 1, 0])) // 0
/**

### 📝 Ejemplo paso a paso con `nums = [1,0,2,0,3]`:

Suma total: 1 + 0 + 2 + 0 + 3 = 6

i=0: nums[0]=1 (no es 0, continuar)
  left = 1, right = 5

i=1: nums[1]=0 ✓
  left = 1, right = 5
  |1 - 5| = 4 > 1 → no válido
  count = 0

i=2: nums[2]=2 (no es 0, continuar)
  left = 3, right = 3

i=3: nums[3]=0 ✓
  left = 3, right = 3
  3 == 3 → válido en ambas direcciones
  count += 2 → count = 2

i=4: nums[4]=3 (no es 0, continuar)
  left = 6, right = 0

Resultado: 2 selecciones válidas
*/
