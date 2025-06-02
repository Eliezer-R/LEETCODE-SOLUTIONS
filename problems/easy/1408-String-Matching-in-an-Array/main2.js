const stringMatching = function (words) {
  const subArr = [] // Creamos un array para almacenar los subString
  for (let i = 0; i < words.length; i++) { // Recorremos words
    const elem = words[i] // Almacenamos el primer elemento
    if (words.some((word, index) => (word.includes(elem) && index !== i))) { // aqui usamos el metodo some y includes y basicamente le dicmos some: si hay al menos un elemnto que cumpla con esta linea (word.includes(elem) && index !== i) introduce el subString includes: preguna si el elem esta incluido dentro de elem example: od esta incluido en leetcoder ? esto es verdadero
      subArr.push(elem) // Introducimos el subString
    }
  }
  return subArr // Retornamos el valor
}

console.log(stringMatching(['leetcoder', 'leetcode', 'od', 'hamlet', 'am']))
// Input: words = ["leetcode","et","code"]
// Output: ["et","code"]
