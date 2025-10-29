const smallestNumber = function (n) {
  // Convertir n a string binario para contar sus bits
  // Ejemplo: n=5 → "101" (3 bits)
  const bitNum = (n).toString(2)

  // Crear un string con la misma cantidad de bits, todos '1'
  // Ejemplo: 3 bits → "111"
  const newBit = new Array(bitNum.length).fill('1').join('')

  // Convertir el string binario a número decimal
  // Ejemplo: "111" → 7
  let resul = parseInt(newBit, 2)

  // Si el resultado es menor que n, necesitamos un bit más
  while (resul < n) {
    // Crear un nuevo número con un bit adicional
    // Ejemplo: "111" → "1111"
    const bit2 = new Array(newBit.length + 1).fill('1').join('')
    resul = parseInt(bit2, 2)
  }

  return resul
}

console.log(smallestNumber(5)) // 7
console.log(smallestNumber(10)) // 15
console.log(smallestNumber(3)) // 3

/**
### 📝 Ejemplo paso a paso con `n = 5`:

n = 5

Paso 1: Convertir a binario
  5 en binario = "101" (3 bits)

Paso 2: Crear número con todos los bits en 1
  3 bits en 1 = "111"

Paso 3: Convertir a decimal
  "111" en decimal = 7

Paso 4: Verificar
  7 >= 5 ✓

Resultado: 7

*/
