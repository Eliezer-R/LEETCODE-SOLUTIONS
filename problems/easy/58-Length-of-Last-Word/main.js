const lengthOfLastWord = function (s) {
  s = s.trim() // Eliminamos los espacios
  return s.split(' ')[s.split(' ').length - 1].length
  /**  Breve explicacion lo primero que se ve es s.plit(' ') estoy ya nos da una cadena como esta  [
  'fly', 'me',  '',
  '',    'to',  '',
  '',    'the', 'moon'
] */
// luego buscamos la ultima palabra con s.split(' ') ya que con s.length lo que estamos haciendo es cojer la longitud del string entero y no es lo que queremos, luego s.plit(' ').length - 1 no da la ultima posicion gracias al .length - 1
// Luego al final solo nos toca que nos de la longitud con .length
}

console.log(lengthOfLastWord('   fly me   to   the moon  ')) // moon.length = 4
