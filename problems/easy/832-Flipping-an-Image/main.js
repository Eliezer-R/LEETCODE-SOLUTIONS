const flipAndInvertImage = function (image) {
  // Procesar cada fila de la imagen
  for (let i = 0; i < image.length; i++) {
    const end = image[i].length - 1 // Índice del último elemento

    // Procesar hasta la mitad de la fila (incluyendo elemento central si existe)
    for (let j = 0; j < Math.ceil(image.length / 2); j++) {
      // Combinar flip + invert en una operación
      const temp = image[i][j] ^ 1 // Invertir elemento izquierdo
      image[i][j] = image[i][end - j] ^ 1 // Mover e invertir elemento derecho
      image[i][end - j] = temp // Colocar elemento izquierdo invertido
    }
  }
  return image
}

console.log(flipAndInvertImage([[1, 1, 0], [1, 0, 1], [0, 0, 0]]))
// [[1,0,0],[0,1,0],[1,1,1]]

/**
 * Ejemplo paso a paso con image = [[1,1,0],[1,0,1],[0,0,0]]:
 *
 * Fila 0: [1,1,0]
 * j=0: temp=1^1=0, image[0][0]=0^1=1, image[0][2]=0 → [1,1,1]
 * j=1: temp=1^1=0, image[0][1]=1^1=0, image[0][1]=0 → [1,0,1]
 * Resultado fila 0: [1,0,0]
 *
 * Fila 1: [1,0,1]
 * j=0: temp=1^1=0, image[1][0]=1^1=0, image[1][2]=0 → [0,0,0]
 * j=1: temp=0^1=1, image[1][1]=0^1=1, image[1][1]=1 → [0,1,0]
 * Resultado fila 1: [0,1,0]
 *
 * Fila 2: [0,0,0]
 * j=0: temp=0^1=1, image[2][0]=0^1=1, image[2][2]=1 → [1,0,1]
 * j=1: temp=0^1=1, image[2][1]=0^1=1, image[2][1]=1 → [1,1,1]
 * Resultado fila 2: [1,1,1]
 *
 * Resultado final: [[1,0,0],[0,1,0],[1,1,1]]
 */
