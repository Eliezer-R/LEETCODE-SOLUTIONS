const maxProfit = function (prices) {
  let min = Infinity // Aqui pondremos el valor/numero que se menor, lo que buscamos por que asi evitamos que no se reste tanto o mas bien que no nos quiten tanto
  let resul = 0 // este sera el resultado

  for (let i = 0; i < prices.length; i++) { // iteramos
    if (prices[i] < min) min = prices[i] // Bien, aqui le preguntaremos si el valor que tenemos es menor a infinity, ya saben que infinity es un numero infinito y superior a todo
    if (resul < (prices[i + 1] - min)) resul = (prices[i + 1] - min) // Si resul es menor al venta - compra entonces nos quedamos con ese resultado
  }

  return resul // Retornamos
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]))
/**
 * Pequeño ejemplo:
 * Veamos como serian las iteraciones
 * Primera iteracion
 * if(prices[i] = 7 < min = infinity) (Si) min es igual a 7
 * if(resul = 0 < (prices[i + 1]= 1 - min = 7 ) = -6 Aqui recalco que prices + 1 seria la venta y min seria la compra, tambien podriamos poner el if al revez, (No)
 * min = 7
 * resul = 0
 *
 * Segunda iteracion
 *  * if(prices[i] = 1 < min = 7) (Si) min es igual a 1
 * if(resul = 0 < (prices[i + 1] = 5 - min = 1 ) = 4 (Si) resul es igual a 4
 * min = 1
 * resul = 4
 *
 * Tercera iteracion
 *  * if(prices[i] = 5 < min = 1) (No) min Sigue siendo igual a 1
 * if(resul = 4 < (prices[i + 1] = 3 - min = 1 ) = 2 (No) resul sigue siendo igual a 4
 * min = 1
 * resul = 4
 * Y asi hasta llegar hasta a un numero mayor como lo es 6
 *
 */
