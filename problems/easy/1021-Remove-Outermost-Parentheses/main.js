const removeOuterParentheses = function (s) {
  const arr = [] // Array para construir el resultado
  let balance = 0 // Contador de balance para rastrear nivel de anidación

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      // Si balance >= 1, no es paréntesis externo
      if (balance >= 1) {
        arr.push(s[i])
      }
      balance++ // Incrementar balance por paréntesis abierto
    } else {
      balance-- // Decrementar balance por paréntesis cerrado

      // Si balance >= 1 después de decrementar, no es paréntesis externo
      if (balance >= 1) {
        arr.push(s[i])
      }
    }
  }

  return arr.join('')
}

console.log(removeOuterParentheses('(()())(())')) // "()()()"

/**
 * Ejemplo paso a paso con s = "(()())(())":
 *
 * i=0: '(' balance=0→1, 0>=1? No → no agregar
 * i=1: '(' balance=1→2, 1>=1? Sí → agregar '(' → arr=['(']
 * i=2: ')' balance=2→1, 1>=1? Sí → agregar ')' → arr=['(',')']
 * i=3: '(' balance=1→2, 1>=1? Sí → agregar '(' → arr=['(',')','(']
 * i=4: ')' balance=2→1, 1>=1? Sí → agregar ')' → arr=['(',')','(',')']
 * i=5: ')' balance=1→0, 0>=1? No → no agregar (fin primitiva 1)
 * i=6: '(' balance=0→1, 0>=1? No → no agregar (inicio primitiva 2)
 * i=7: '(' balance=1→2, 1>=1? Sí → agregar '(' → arr=['(',')','(',')',')','(']
 * i=8: ')' balance=2→1, 1>=1? Sí → agregar ')' → arr=['(',')','(',')','(',')']
 * i=9: ')' balance=1→0, 0>=1? No → no agregar (fin primitiva 2)
 *
 * Resultado: "()()" → join() → "()()()"
 */
