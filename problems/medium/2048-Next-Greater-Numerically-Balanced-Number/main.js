const nextBeautifulNumber = function (n) {
  // Array para guardar todos los números balanceados generados
  const list = []

  // Función que verifica si un conteo de dígitos es balanceado
  function isBeautiful (count) {
    // Recorremos cada dígito del 1 al 7
    for (let d = 1; d <= 7; d++) {
      // Si el dígito aparece pero NO exactamente d veces, no es balanceado
      // count[d] = cuántas veces hemos usado el dígito d
      if (count[d] !== 0 && count[d] !== d) return false
    }
    return true
  }

  // Función recursiva que genera números balanceados
  // num: número actual que estamos construyendo
  // count: array que cuenta cuántas veces usamos cada dígito
  function generate (num, count) {
    // Si el número es válido (> 0) y es balanceado, lo agregamos
    if (num > 0 && isBeautiful(count)) list.push(num)

    // Poda: si excedemos el número balanceado más grande posible, paramos
    if (num > 1224444) return

    // Probamos agregar cada dígito del 1 al 7
    for (let d = 1; d <= 7; d++) {
      // Solo agregamos el dígito si aún no hemos alcanzado su límite
      // Por ejemplo, si d=3, solo podemos usar el dígito 3 hasta 3 veces
      if (count[d] < d) {
        // ELEGIR: incrementamos el contador del dígito d
        count[d]++

        // EXPLORAR: construimos el nuevo número agregando d al final
        // num * 10 + d agrega el dígito d al final del número
        generate(num * 10 + d, count)

        // BACKTRACK: deshacemos el cambio para probar otras opciones
        count[d]--
      }
    }
  }

  // Iniciar la generación con número 0 y contadores en 0
  generate(0, Array(10).fill(0))

  // Ordenar todos los números generados de menor a mayor
  list.sort((a, b) => a - b)

  // Buscar el primer número mayor que n
  for (const num of list) {
    if (num > n) return num
  }

  // Si no encontramos ninguno (no debería pasar), retornar -1
  return -1
}

console.log(nextBeautifulNumber(1)) // 22
console.log(nextBeautifulNumber(1000)) // 1333
console.log(nextBeautifulNumber(3000)) // 3133
