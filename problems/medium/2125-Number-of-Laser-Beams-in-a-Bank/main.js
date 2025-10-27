const numberOfBeams = function (bank) {
  let count = 0 // Contador de dispositivos en la fila anterior con dispositivos
  let resul2 = 0 // Resultado total de rayos láser

  // Recorremos cada fila del banco
  for (let i = 0; i < bank.length; i++) {
    // Contamos cuántos '1' (dispositivos) hay en la fila actual
    // split('') convierte el string en array de caracteres
    // reduce suma 1 por cada '1' encontrado, 0 por cada '0'
    const resul = bank[i].split('').reduce((sum, value) => value === '1' ? sum + 1 : sum, 0)

    // Si la fila actual tiene dispositivos Y la anterior también tenía
    if (resul !== 0 && count !== 0) {
      // Calculamos los rayos: dispositivos fila anterior × dispositivos fila actual
      resul2 += resul * count
      // Actualizamos count con el número de dispositivos de la fila actual
      count = resul
    }

    // Si es la primera fila con dispositivos (count aún es 0)
    if (count === 0) {
      // Simplemente guardamos el conteo para la próxima fila
      count = resul
    }
  }

  return resul2
}

console.log(numberOfBeams(['011001', '000000', '010100', '001000'])) // 8
