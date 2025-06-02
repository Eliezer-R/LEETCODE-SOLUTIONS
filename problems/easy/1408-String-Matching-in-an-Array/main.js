const stringMatching = function (words) {
  const subMap = [] // Creamos una variable para almacenar los subStrings

  for (let i = 0; i < words.length; i++) { // Usamos el primer bucle para obtener el primer elemnto del array
    const firtElem = words[i] // El primer elemnto del array
    for (let j = 0; j < words.length; j++) { // Usamos el segundo bucle para poder recorrer el segundo elemnto
      for (let r = 0; r < words[j].length; r++) { // Recorremos el segundo elemento y evitamos su mismo indice en el if
        const subStr = words[j].slice(r, firtElem.length + r) // Usamos esta variable cortando el elemnto tal que quede del mismo tamaño como el primer elemnto  example : mass --- quedaria = ma y luego en el segundo bucle : mass --- quedaria = as
        if (subStr === firtElem && j !== i) { // Comparamos si as === as si no es asi seguimos
          subMap.push(firtElem) //  si es asi introducimos el subString
        }
      }
    }
  }

  return Array.from(new Set(subMap)) // Evitamos duplicados y retornamos el valor
}

console.log(stringMatching(['mass', 'as', 'hero', 'superhero']))
// Input: words = ["mass","as","hero","superhero"]
// Output: ["as","hero"]
