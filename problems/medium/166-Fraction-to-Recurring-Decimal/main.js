const fractionToDecimal = function (numerator, denominator) {
  // Caso especial: numerador es 0
  if (numerator === 0) return '0'

  // Usar BigInt para evitar overflow con números grandes
  let n = BigInt(numerator)
  let d = BigInt(denominator)

  let res = ''

  // Determinar signo: negativo solo si uno es negativo (XOR lógico)
  if ((n < 0n) !== (d < 0n)) res += '-'

  // Trabajar con valores absolutos
  if (n < 0n) n = -n
  if (d < 0n) d = -d

  // Parte entera de la división
  res += (n / d).toString()
  let rem = n % d // Residuo inicial

  // Si no hay residuo, es un entero
  if (rem === 0n) return res

  // Agregar punto decimal
  res += '.'
  const seen = new Map() // Rastrear residuos y sus posiciones

  // Simular división larga
  while (rem !== 0n) {
    // Si ya vimos este residuo, encontramos un ciclo
    if (seen.has(rem)) {
      const pos = seen.get(rem)
      // Insertar paréntesis en la posición donde comenzó el ciclo
      res = res.slice(0, pos) + '(' + res.slice(pos) + ')'
      break
    }

    // Recordar posición actual del residuo
    seen.set(rem, res.length)

    // Continuar división larga
    rem *= 10n // Bajar el siguiente dígito
    res += (rem / d).toString() // Agregar dígito del cociente
    rem = rem % d // Nuevo residuo
  }

  return res
}

console.log(fractionToDecimal(4, 333)) // "0.(012)"

/**
 * Ejemplo paso a paso con numerator = 4, denominator = 333:
 *
 * 1. Configuración inicial:
 *    n = 4n, d = 333n
 *    Signo: ambos positivos → sin signo negativo
 *    Parte entera: 4n / 333n = 0n → res = "0"
 *    rem = 4n % 333n = 4n
 *    res += "." → res = "0."
 *
 * 2. División larga (simulando):
 *    rem = 4n, seen = {}, res.length = 2
 *    seen.set(4n, 2), rem = 40n
 *    40n / 333n = 0n → res = "0.0"
 *    rem = 40n % 333n = 40n
 *
 *    rem = 40n, seen = {4n: 2}, res.length = 3
 *    seen.set(40n, 3), rem = 400n
 *    400n / 333n = 1n → res = "0.01"
 *    rem = 400n % 333n = 67n
 *
 *    rem = 67n, seen = {4n: 2, 40n: 3}, res.length = 4
 *    seen.set(67n, 4), rem = 670n
 *    670n / 333n = 2n → res = "0.012"
 *    rem = 670n % 333n = 4n
 *
 *    rem = 4n → seen.has(4n) = true!
 *    pos = seen.get(4n) = 2
 *    res = "0." + "(" + "012" + ")" = "0.(012)"
 *
 * Resultado: "0.(012)"
 */
