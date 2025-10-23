const hasSameDigits = function (s) {
  let n

  while (s.length !== 2) {
    n = ''
    for (let i = 0; i < s.length - 1; i++) {
      n += (Number(s[i]) + Number(s[i + 1])) % 10
    }
    s = n
  }

  return s[0] === s[1]
}

console.log(hasSameDigits('3902')) // true
console.log(hasSameDigits('34789')) // false

/**
 * Ejemplo paso a paso con s = "3902":
 *
 * Iteración 1: s = "3902", length = 4
 *   i=0: (3+9)%10 = 2
 *   i=1: (9+0)%10 = 9
 *   i=2: (0+2)%10 = 2
 *   n = "292", s = "292"
 *
 * Iteración 2: s = "292", length = 3
 *   i=0: (2+9)%10 = 1
 *   i=1: (9+2)%10 = 1
 *   n = "11", s = "11"
 *
 * s.length === 2, salir del loop
 *
 * Comparación: s[0] === s[1] → '1' === '1' → true
 */
