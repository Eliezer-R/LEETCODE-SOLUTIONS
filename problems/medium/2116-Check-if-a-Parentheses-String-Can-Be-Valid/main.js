const canBeValid = function (s, locked) {
  if (s.length % 2 === 1) return false // Si encontramos que la longitud no es divisible por 2 quiere decir que no estan completo los paréntesis
  let openString = 0 // Creamos una variable para verificar los parentesis que estan abiertos
  let closeString = 0 // Creamos una variable para verificar los parentesis que estan cerrados

  for (let i = 0; i < s.length; i++) { // Iteramos primero de orden acendente para verificar los parentesis abiertos
    if (s[i] === '(' || locked[i] === '0') { // Verificamos que si s[i] === ( || 0, entonces:
      openString++ // Le sumamos
    } else {
      openString-- // Si no quiere decir que no es ni 0 ni (, asi que restamos
    }

    if (openString < 0) { // En cada pasada tambien comprobamos que openString se mayor que 0, esto nos quiere decir que no hay mas cerrados que abiertos
      return false
    }
  }

  // Hacemos lo mismo con el siquiente for, pero de manera decendente
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ')' || locked[i] === '0') {
      closeString++
    } else {
      closeString--
    }

    if (closeString < 0) {
      return false
    }
  }

  return true // Retornamos si Open o closeString son mayores o 0
}
console.log(canBeValid('(((())(((())', '111111010111'))
