const triangleNumber = function (nums) {
  nums.sort((a, b) => a - b) // Ordenar array ascendentemente
  let count = 0 // Contador de triángulos válidos

  // Iterar desde el final (lado más largo) hacia el inicio
  for (let i = nums.length - 1; i >= 2; i--) {
    const first = nums[i] // Lado más largo fijo
    let point1 = i - 1 // Puntero derecho (lado mediano)
    let point2 = 0 // Puntero izquierdo (lado más corto)

    // Two pointers para encontrar pares válidos
    while (point2 < point1) {
      // Si la suma de los dos lados menores > lado mayor
      if ((nums[point1] + nums[point2]) > first) {
        // Todos los elementos entre point2 y point1 forman triángulos válidos
        count += (point1 - point2)
        point1-- // Mover puntero derecho hacia la izquierda
      } else {
        // La suma es muy pequeña, incrementar lado menor
        point2++
      }
    }
  }

  return count
}

console.log(triangleNumber([2, 2, 3, 4])) // 3

/**
 * Ejemplo paso a paso con nums = [2,2,3,4]:
 *
 * Después de ordenar: [2,2,3,4]
 *
 * i=3 (first=4, lado más largo):
 * point1=2, point2=0 → nums[2]+nums[0] = 3+2 = 5 > 4 ✓
 * count += (2-0) = 2 → count = 2
 * (Triángulos: [2,3,4] con índices (0,2,3) y (1,2,3))
 * point1=1
 *
 * point1=1, point2=0 → nums[1]+nums[0] = 2+2 = 4 > 4? No
 * point2=1
 *
 * point2=1, point1=1 → point2 < point1? No, salir del while
 *
 * i=2 (first=3, lado más largo):
 * point1=1, point2=0 → nums[1]+nums[0] = 2+2 = 4 > 3 ✓
 * count += (1-0) = 1 → count = 3
 * (Triángulo: [2,2,3])
 * point1=0
 *
 * point2=0, point1=0 → point2 < point1? No, salir del while
 *
 * i=1: i >= 2? No, terminar
 *
 * Resultado: count = 3
 */
