const backspaceCompare = function (s, t) {
  const left = [] // Stack para procesar la cadena s aplicando los backspaces
  const left2 = [] // Stack para procesar la cadena t aplicando los backspaces

  // Recorremos hasta la longitud máxima de ambas cadenas
  for (let i = 0; i < Math.max(s.length, t.length); i++) {
    // Procesamos la cadena s si hay carácter en la posición i
    if (s[i]) {
      if (s[i] === '#') left.pop() // Si es '#', eliminamos el último carácter del stack
      else left.push(s[i]) // Si no, agregamos el carácter al stack
    }

    // Procesamos la cadena t si hay carácter en la posición i
    if (t[i]) {
      if (t[i] === '#') left2.pop() // Si es '#', eliminamos el último carácter del stack
      else left2.push(t[i]) // Si no, agregamos el carácter al stack
    }
  }

  // Comparamos los resultados finales de ambos stacks convertidos a string
  return left.join('') === left2.join('')
}

console.log(backspaceCompare('ab#c', 'ad#c')) // true

/**
 * Ejemplo paso a paso con s = "ab#c", t = "ad#c":
 * left:  [] -> ['a'] -> ['a','b'] -> ['a'] (por '#') -> ['a','c']
 * left2: [] -> ['a'] -> ['a','d'] -> ['a'] (por '#') -> ['a','c']
 * Ambos quedan como "ac", por lo tanto retorna true.
 */
