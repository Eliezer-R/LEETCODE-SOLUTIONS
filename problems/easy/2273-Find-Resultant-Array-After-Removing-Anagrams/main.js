const removeAnagrams = function (words) {
  const result = []
  let prevSig = ''

  for (const w of words) {
    // Crear firma del string ordenando caracteres
    const sig = w.split('').sort().join('')

    // Solo añadir si es diferente al anterior
    if (sig !== prevSig) {
      result.push(w)
      prevSig = sig
    }
  }

  return result
}

console.log(removeAnagrams(['abba', 'baba', 'bbaa', 'cd', 'cd']))
// ["abba","cd"]

console.log(removeAnagrams(['a', 'b', 'c', 'd', 'e']))
// ["a","b","c","d","e"]

/**
 * Ejemplo paso a paso con words = ["abba","baba","bbaa","cd","cd"]:
 *
 * i=0: w="abba", sig="aabb", prevSig=""
 *      sig !== prevSig ✓ → añadir "abba", prevSig="aabb"
 *
 * i=1: w="baba", sig="aabb", prevSig="aabb"
 *      sig === prevSig → NO añadir (es anagrama)
 *
 * i=2: w="bbaa", sig="aabb", prevSig="aabb"
 *      sig === prevSig → NO añadir (es anagrama)
 *
 * i=3: w="cd", sig="cd", prevSig="aabb"
 *      sig !== prevSig ✓ → añadir "cd", prevSig="cd"
 *
 * i=4: w="cd", sig="cd", prevSig="cd"
 *      sig === prevSig → NO añadir (es anagrama)
 *
 * Resultado: ["abba", "cd"]
 */
