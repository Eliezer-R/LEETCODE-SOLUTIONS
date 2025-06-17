const maximumDifference = function (nums) {
  let ans = -1 // Valor maximo a guardar
  let min = nums[0] // Valor minimo encontrado, esto se hace para que cuando encontremos un valor mas bajo que el siguiente, la resta nos de con el valor mas alto
  for (let i = 1; i < nums.length; ++i) { // Iteramos
    if (nums[i] > min) { // Verifacamos que el siguiente valor que en este caso es 2 sea mayor a 8, lo cual no lo es
      ans = Math.max(ans, nums[i] - min) // Aqui se verifica que guardemos el valor mayor
    } else {
      min = nums[i] // Aqui si el nums[i] es menor entonces elegimos ese valor para que la resta nos de un valor mayor
    }
  }
  return ans // Retornamos
}

console.log(maximumDifference([8, 2, 7, 9])) // valor -> 7
// Breve explicacion del array
// Cuando iteramos min es la posicion 0 sea 8 y nums[i] es 2 asi que :
// nums[i](2) > min(8) es false asi que ahora pasa al else y min es 2
// nums[i](7) > min(2) es true asi que ahora restamos nums[i](7) - min(2), y ans: es 5
// nums[i](9) > min(2) es true asi que ahora restamos comprobamos que ans que es 5 sea mayor en el Math.max(ans(5), nums[i](9) - min(2) = 7)
// Por lo tanto en el max el valor mayor es 7 y ans retorna ese valor
