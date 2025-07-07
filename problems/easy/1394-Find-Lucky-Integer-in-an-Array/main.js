const findLucky = function (arr) {
  const map = new Map() // Creamos un map para almacenar todo las secuencias/numeros
  let count = 0 // En esta variable le asignaremos el valor maximo del map si esta
  let keyMin = -1 // Aqui almacenaremos la key que en este caso seria el numero que cumple con la regla
  for (let i = 0; i < arr.length; i++) {
    map.set(arr[i], (map.get(arr[i]) + 1) || 1) // En este primero for simplemnte vamos sumando los nuero que aparecen
  }

  for (const [value, key] of map.entries()) { // Tambien podemos usar un forEach
    if (value === key && value > count) { // Luego aca la regla es que debe de ser igual a el numero
      count = value
      keyMin = key
    }
  }

  return keyMin // Retornamos
}

console.log(findLucky([2, 2, 3, 4])) // 2

/**
 * en el primero for el map se vera asi:
 * Map(3) { 2 => 2, 3 => 1, 4 => 1 }
 * Como se ve, el del lado izquierdo es la key que es el numero que veremos cuantas veces a aparecido en el array y el valor
 * luego en el segundo for simplemnte vamos buscando si por ejemplo value que es igual a 2 === key que es igual 2 y && value es mayor a count
 *
 * ya luego al final retornamos keyMin
 */
