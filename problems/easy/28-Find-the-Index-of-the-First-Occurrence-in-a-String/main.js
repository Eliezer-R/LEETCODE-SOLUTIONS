const strStr = function (haystack, needle) {
  if (haystack === needle) return 0 // Si los str son iguales retornarmos 0

  for (let i = 0; i < haystack.length; i++) { // Iteramos normal
    if (haystack.slice(i, needle.length + i) === needle) return i // Aqui cortamos el haystack desde 0 hasta needle.length + i asegurandonos de que avancemos de 1 en 1 apartir de needle.length
  }
  return -1 // Si no encontramos retornamos -1
}

console.log(strStr('mississippi', 'issi'))
// Pequeño ejem
// En la primera iteracion se vera algo asi : haystack.slice(i, needle.length + i) sera igual a = miss
// Luego segunda iteracion : haystack.slice(i, needle.length + i) sera igual a = issi
// Estoy sucede ya que vamos avanzando con i que es 0 hasta needle.length + i que seria 5 y luego 6, 7 etc
