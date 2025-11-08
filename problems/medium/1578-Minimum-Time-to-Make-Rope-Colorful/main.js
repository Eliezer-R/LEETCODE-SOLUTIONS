const minCost = function (colors, neededTime) {
  // count acumula el tiempo total necesario para remover globos
  let count = 0

  // value guarda el tiempo del globo actual que estamos considerando mantener
  // Inicialmente es el tiempo del primer globo
  let value = neededTime[0]

  // Empezamos desde el índice 1 para comparar con el anterior
  for (let i = 1; i < colors.length; i++) {
    // Verificar si el color actual es igual al color anterior
    if (colors[i] === colors[i - 1]) {
      // CONFLICTO: Dos globos consecutivos del mismo color

      // Estrategia: Remover el más barato, mantener el más caro
      // Math.min(value, neededTime[i]) obtiene el tiempo del más barato
      count += Math.min(value, neededTime[i])

      // Actualizar value al tiempo del más caro
      // Math.max(value, neededTime[i]) nos da el tiempo del que mantenemos
      // Este será el nuevo valor de referencia para la próxima comparación
      value = Math.max(value, neededTime[i])
    } else {
      // NO HAY CONFLICTO: Colores diferentes
      // Actualizar value al tiempo del globo actual
      // Este se convierte en el nuevo globo de referencia
      value = neededTime[i]
    }
  }

  return count
}

console.log(minCost('abaac', [1, 2, 3, 4, 5])) // 3
console.log(minCost('abc', [1, 2, 3])) // 0
console.log(minCost('aabaa', [1, 2, 3, 4, 1])) // 2
