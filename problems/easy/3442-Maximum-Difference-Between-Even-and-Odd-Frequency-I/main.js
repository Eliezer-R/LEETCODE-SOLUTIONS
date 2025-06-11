const maxDifference = function (s) {
  const hashp = new Map() // Iniciamos con un map
  let impar = -Infinity // Inicializamos la variables con un -infinity que quiere decir que es el valor mas bajo posible
  let par = Infinity // Infinity quiere decir que es valor mas alto posible

  for (let i = 0; i < s.length; i++) { // Iteramos y setiamos las veces que aparece una letra
    hashp.set(s[i], (hashp.get(s[i]) || 0) + 1) // Cada vez que aparezca una letra se le suma 1
  }

  hashp.forEach((value, _) => { // Iteramos el resultado de map
    if (value % 2 !== 0 && value > impar) impar = value // Aqui buscamos el impar (Mayor)
    if (value < par && value % 2 === 0) par = value // Aqui buscamos el par (Menor)
  })

  return impar - par // Luego restamos el resultado de cada uno
}

console.log(maxDifference('xkxzkkk'))
// Pequeño ejemplo de xkxzkkk
// En el map trendiamos que x = 2, k = 4 y z = 1
// Con el impar -Inifity  value es 1
// Mientras que con el par value sera 2 ya que estamos buscando el value < par y 2 es menor a infinity, ya despues 4 no es menor a 2 aun que sea par
