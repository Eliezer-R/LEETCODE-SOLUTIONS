const maxFreqSum = function (s) {
  const map = new Map() // Map para contar frecuencias
  const abc = 'aeiou' // String con todas las vocales
  let vowel = 0 // Frecuencia máxima de vocales
  let consonant = 0 // Frecuencia máxima de consonantes

  // Primer recorrido: contar frecuencias de cada carácter
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1)
  }

  // Segundo recorrido: encontrar frecuencias máximas por categoría
  map.forEach((value, key) => {
    if (abc.includes(key) && value > vowel) {
      vowel = value // Actualizar máxima frecuencia de vocal
    } else if (value > consonant && !abc.includes(key)) {
      consonant = value // Actualizar máxima frecuencia de consonante
    }
  })

  return vowel + consonant
}

console.log(maxFreqSum('successes')) // 6

/**
 * Ejemplo paso a paso con s = "successes":
 *
 * 1. Conteo de frecuencias:
 *    map = {s: 4, u: 1, c: 2, e: 2}
 *
 * 2. Clasificación y búsqueda de máximos:
 *    's': consonante, 4 > 0 → consonant = 4
 *    'u': vocal, 1 > 0 → vowel = 1
 *    'c': consonante, 2 < 4 → consonant = 4 (sin cambios)
 *    'e': vocal, 2 > 1 → vowel = 2
 *
 * 3. Resultado: vowel + consonant = 2 + 4 = 6
 */
