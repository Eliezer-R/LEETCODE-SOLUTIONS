const areAlmostEqual = function (s1, s2) {
  if (s1 === s2) return true // Comprobamos que sean iguales al principio para evitar iteraciones innecesarias

  const subArr = [] // Creamos un subArra para almacenar indices

  for (let i = 0; i < s1.length; i++) { // Iteramos
    if (s1[i] !== s2[i]) subArr.push(i) // Si no son iguales almacenamos ese indice

    if (subArr.length > 2) return false // Si subArr es mayor a 2 quiere decir que hay mas casos lo cual no cumple
  }

  return subArr.length === 2 && // Comprobamos que subArr es 2 (opcional)
      s1[subArr[0]] === s2[subArr[1]] && // Aqui le decimos que si el primer indice de s1 es igual al ultimo indice de s2
      s2[subArr[0]] === s1[subArr[1]] // Aqui es lo mismo pero al reves
}

console.log(areAlmostEqual('bank', 'kanb'))
