const totalMoney = function (n) {
  // Calculamos cuántas semanas completas hay
  const weeks = Math.floor(n / 7)

  // Calculamos cuántos días extra quedan después de las semanas completas
  const extraDays = n % 7

  // Calculamos el total de las semanas completas
  // 28 es la suma de la primera semana (1+2+3+4+5+6+7)
  // Cada semana adicional suma 7 más que la anterior
  // La fórmula 7 * (weeks * (weeks - 1)) / 2 es la suma aritmética del incremento
  const totalWeeks = 28 * weeks + (7 * (weeks * (weeks - 1))) / 2

  // Calculamos el total de los días extra
  // ((1 + extraDays) * extraDays) / 2 es la suma de 1 + 2 + ... + extraDays
  // extraDays * weeks suma el offset de la semana actual
  const totalDays = ((1 + extraDays) * extraDays) / 2 + extraDays * weeks

  // Retornamos la suma total
  return totalWeeks + totalDays
}

console.log(totalMoney(4)) // 10
console.log(totalMoney(10)) // 37
console.log(totalMoney(20)) // 96
