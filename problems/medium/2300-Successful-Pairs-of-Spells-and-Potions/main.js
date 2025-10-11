const successfulPairs = function (spells, potions, success) {
  potions.sort((a, b) => a - b) // Ordenar pociones una vez
  const subArr = []

  // Para cada hechizo, encontrar cuántas pociones son válidas
  for (let i = 0; i < spells.length; i++) {
    const divi = success / spells[i] // Umbral mínimo de poción necesaria
    const idx = binarySearch(divi) // Encontrar primera poción válida

    subArr.push(potions.length - idx) // Contar pociones desde idx hasta el final
  }

  // Búsqueda binaria: encuentra la primera poción >= num
  function binarySearch (num) {
    let left = 0
    let right = potions.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (potions[mid] >= num) {
        right = mid - 1 // Buscar a la izquierda para encontrar la primera
      } else {
        left = mid + 1 // Buscar a la derecha
      }
    }
    return left // left es el índice de la primera poción válida
  }

  return subArr
}

console.log(successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7)) // [4,0,3]

/**
 * Ejemplo paso a paso con spells = [5,1,3], potions = [1,2,3,4,5], success = 7:
 *
 * Paso 1: Ordenar pociones
 * potions = [1,2,3,4,5] (ya estaba ordenado)
 *
 * Paso 2: Procesar cada hechizo
 *
 * Hechizo i=0 (spell=5):
 *   divi = 7/5 = 1.4
 *   binarySearch(1.4):
 *     left=0, right=4
 *     mid=2: potions[2]=3 >= 1.4 → right=1
 *     mid=0: potions[0]=1 >= 1.4? No → left=1
 *     mid=1: potions[1]=2 >= 1.4 → right=0
 *     left=1, right=0 → termina, return 1
 *
 *   Count: 5 - 1 = 4 pociones [2,3,4,5]
 *   subArr = [4]
 *
 * Hechizo i=1 (spell=1):
 *   divi = 7/1 = 7
 *   binarySearch(7):
 *     ... ninguna poción >= 7
 *     return 5
 *
 *   Count: 5 - 5 = 0 pociones
 *   subArr = [4, 0]
 *
 * Hechizo i=2 (spell=3):
 *   divi = 7/3 = 2.333...
 *   binarySearch(2.333):
 *     ... encuentra índice 2
 *     return 2
 *
 *   Count: 5 - 2 = 3 pociones [3,4,5]
 *   subArr = [4, 0, 3]
 *
 * Resultado: [4, 0, 3]
 */
