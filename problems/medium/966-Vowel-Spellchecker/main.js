const spellchecker = function (wordlist, queries) {
  const result = []
  const exactWords = new Set(wordlist) // Para coincidencias exactas
  const caseInsensitive = new Map() // Para coincidencias de case
  const vowelInsensitive = new Map() // Para coincidencias de vocales

  // Función para enmascarar vocales con '*'
  const maskVowels = (word) => {
    return word.toLowerCase().replace(/[aeiou]/g, '*')
  }

  // Preprocessing: construir las estructuras de datos
  for (const word of wordlist) {
    const lower = word.toLowerCase()
    const masked = maskVowels(lower)

    // Solo guardar la PRIMERA aparición (orden de precedencia)
    if (!caseInsensitive.has(lower)) {
      caseInsensitive.set(lower, word)
    }
    if (!vowelInsensitive.has(masked)) {
      vowelInsensitive.set(masked, word)
    }
  }

  // Procesamiento de queries siguiendo orden de precedencia
  for (const query of queries) {
    if (exactWords.has(query)) {
      // Nivel 1: Coincidencia exacta (case-sensitive)
      result.push(query)
    } else {
      const lower = query.toLowerCase()
      const masked = maskVowels(lower)

      if (caseInsensitive.has(lower)) {
        // Nivel 2: Coincidencia case-insensitive
        result.push(caseInsensitive.get(lower))
      } else if (vowelInsensitive.has(masked)) {
        // Nivel 3: Coincidencia vowel-insensitive
        result.push(vowelInsensitive.get(masked))
      } else {
        // Nivel 4: Sin coincidencia
        result.push('')
      }
    }
  }

  return result
}

console.log(spellchecker(['KiTe', 'kite'], ['kite', 'Kite'])) // ["kite","KiTe"]

/**
 * Ejemplo paso a paso con wordlist = ["KiTe","kite"], query = "kite":
 *
 * 1. Preprocessing:
 *    exactWords = Set{"KiTe", "kite"}
 *    caseInsensitive = {"kite" → "KiTe"}  // Primera aparición
 *    vowelInsensitive = {"k*t*" → "KiTe"} // Primera aparición
 *
 * 2. Query "kite":
 *    - exactWords.has("kite") = true → result.push("kite")
 *
 * 3. Query "Kite":
 *    - exactWords.has("Kite") = false
 *    - caseInsensitive.has("kite") = true → result.push("KiTe")
 *
 * Resultado: ["kite", "KiTe"]
 */
