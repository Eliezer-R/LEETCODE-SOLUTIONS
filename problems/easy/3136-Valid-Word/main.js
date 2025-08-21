const isValid = function (word) {
  // Verificar longitud mínima
  if (word.length < 3) return false

  const vowels = new Set('aeiou') // Set de vocales para búsqueda O(1)
  const seen = new Set(word.toLowerCase()) // Caracteres únicos en minúsculas

  let hasVowel = false // Flag para detectar al menos una vocal
  let hasConsonant = false // Flag para detectar al menos una consonante

  // Recorremos cada carácter único
  for (const char of seen) {
    const code = char.charCodeAt(0) // Obtenemos el código ASCII

    if (code >= 97 && code <= 122) { // letra minúscula (a-z)
      if (vowels.has(char)) {
        hasVowel = true // Encontramos una vocal
      } else {
        hasConsonant = true // Encontramos una consonante
      }
    } else if (code >= 48 && code <= 57) {
      // es número (0-9), permitido pero no suma a vocales/consonantes
      continue
    } else {
      return false // símbolo u otro carácter no válido
    }
  }

  // Debe tener al menos una vocal Y una consonante
  return hasVowel && hasConsonant
}

console.log(isValid('234Adas')) // true
