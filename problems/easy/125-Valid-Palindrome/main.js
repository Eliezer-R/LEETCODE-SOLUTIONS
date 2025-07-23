const isPalindrome = function (s) {
  if (s === '') return true // Si está vacío es palíndromo
  s = s.toLowerCase() // Convertimos a minúsculas
  let letter = ''
  for (let i = 0; i < s.length; i++) {
    const num = s[i].charCodeAt(0) >= 48 && s[i].charCodeAt(0) <= 57 // Solo números
    const str = s[i].charCodeAt(0) <= 122 && s[i].charCodeAt(0) >= 97 // Solo letras
    if (num || str) letter += s[i] // Unimos los caracteres válidos
  }
  return letter === letter.split('').reverse().join('') // Comparamos normal y reversa
}

console.log(isPalindrome('A man, a plan, a canal: Panama')) // true
