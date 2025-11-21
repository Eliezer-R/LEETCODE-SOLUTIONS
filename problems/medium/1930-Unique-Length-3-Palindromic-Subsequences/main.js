const countPalindromicSubsequence = function (s) {
  let res = 0

  // Iterar sobre las 26 letras del alfabeto
  for (let c = 0; c < 26; c++) {
    // Convertir número a letra: 0→'a', 1→'b', ..., 25→'z'
    const letter = String.fromCharCode(97 + c)

    // Encontrar la primera aparición de esta letra
    const left = s.indexOf(letter)

    // Encontrar la última aparición de esta letra
    const right = s.lastIndexOf(letter)

    // Si la letra no existe o aparece solo una vez, continuar
    if (left === -1 || right === left) continue

    // Set para rastrear caracteres únicos entre left y right
    const middle = new Set()

    // Contar todos los caracteres únicos entre left y right
    for (let i = left + 1; i < right; i++) {
      middle.add(s[i])
    }

    // Cada carácter único en el medio forma un palíndromo único
    res += middle.size
  }

  return res
}

console.log(countPalindromicSubsequence('aabca')) // 3

/**
 * Ejemplo paso a paso con s = "aabca":
 * Índices:  0 1 2 3 4
 * Cadena:  "a a b c a"
 *
 * Iterar sobre cada letra del alfabeto (a-z):
 *
 * Letra 'a' (c=0):
 *   left = s.indexOf('a') = 0
 *   right = s.lastIndexOf('a') = 4
 *   left !== right ✓ → Procesar
 *
 *   Caracteres entre posiciones 0 y 4 (índices 1, 2, 3):
 *   i=1: s[1]='a' → middle.add('a')
 *   i=2: s[2]='b' → middle.add('b')
 *   i=3: s[3]='c' → middle.add('c')
 *
 *   middle = {'a', 'b', 'c'} → size = 3
 *   res += 3 → res = 3
 *
 *   Palíndromos formados: "aaa", "aba", "aca"
 *
 * Letra 'b' (c=1):
 *   left = s.indexOf('b') = 2
 *   right = s.lastIndexOf('b') = 2
 *   left === right ✗ → Saltar (solo aparece una vez)
 *
 * Letra 'c' (c=2):
 *   left = s.indexOf('c') = 3
 *   right = s.lastIndexOf('c') = 3
 *   left === right ✗ → Saltar
 *
 * Letras 'd'-'z' (c=3-25):
 *   left = -1 (no existen) → Saltar
 *
 * Resultado final: res = 3
 *
 *
 * Ejemplo paso a paso con s = "bbcbaba":
 * Índices:  0 1 2 3 4 5 6
 * Cadena:  "b b c b a b a"
 *
 * Letra 'a' (c=0):
 *   left = 4, right = 6
 *   Caracteres entre [5, 6): s[5]='b'
 *   middle = {'b'} → size = 1
 *   res += 1 → res = 1
 *   Palíndromo: "aba"
 *
 * Letra 'b' (c=1):
 *   left = 0, right = 5
 *   Caracteres entre [1, 5): s[1]='b', s[2]='c', s[3]='b', s[4]='a'
 *   middle = {'b', 'c', 'a'} → size = 3
 *   res += 3 → res = 4
 *   Palíndromos: "bbb", "bcb", "bab"
 *
 * Letra 'c' (c=2):
 *   left = 2, right = 2
 *   left === right → Saltar
 *
 * Resultado final: res = 4
 */
