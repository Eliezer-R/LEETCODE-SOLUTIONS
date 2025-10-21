const findLexSmallestString = function (s, a, b) {
  const visited = new Set()
  const queue = [s]
  visited.add(s)
  let smallest = s

  // Pre-calcular índices impares para eficiencia
  const oddIndices = []
  for (let i = 1; i < s.length; i += 2) {
    oddIndices.push(i)
  }

  while (queue.length > 0) {
    const current = queue.shift()

    // Actualizar el mínimo
    if (current < smallest) {
      smallest = current
    }

    // Operación 1: Sumar 'a' a índices impares
    const chars = current.split('')
    for (const idx of oddIndices) {
      chars[idx] = String((Number(chars[idx]) + a) % 10)
    }
    const afterAdd = chars.join('')

    if (!visited.has(afterAdd)) {
      visited.add(afterAdd)
      queue.push(afterAdd)
    }

    // Operación 2: Rotar 'b' posiciones a la derecha
    const n = current.length
    const afterRotate = current.slice(n - b) + current.slice(0, n - b)

    if (!visited.has(afterRotate)) {
      visited.add(afterRotate)
      queue.push(afterRotate)
    }
  }

  return smallest
}

console.log(findLexSmallestString('5525', 9, 2)) // "2050"
console.log(findLexSmallestString('74', 5, 1)) // "24"
console.log(findLexSmallestString('0011', 4, 2)) // "0011"
