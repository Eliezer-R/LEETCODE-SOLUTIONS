const countStudents = function (students, sandwiches) {
  const n = students.length
  let count0 = 0 // Estudiantes que prefieren sándwich tipo 0 (circular)
  let count1 = 0 // Estudiantes que prefieren sándwich tipo 1 (cuadrado)

  // Paso 1: Contar preferencias de los estudiantes
  for (let i = 0; i < n; i++) {
    if (students[i] === 1) {
      count1++
    } else {
      count0++
    }
  }

  // Paso 2: Procesar pila de sándwiches secuencialmente
  for (let j = 0; j < sandwiches.length; j++) {
    if (sandwiches[j] === 1) {
      // Sándwich cuadrado en la parte superior
      if (count1 > 0) {
        count1-- // Un estudiante toma el sándwich y se va
      } else {
        return count0 // No hay más estudiantes que quieran tipo 1
      }
    } else {
      // Sándwich circular en la parte superior
      if (count0 > 0) {
        count0-- // Un estudiante toma el sándwich y se va
      } else {
        return count1 // No hay más estudiantes que quieran tipo 0
      }
    }
  }

  return 0 // Todos los estudiantes pudieron comer
}

console.log(countStudents([1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1])) // 3

/**
 * Ejemplo paso a paso con students = [1,1,1,0,0,1], sandwiches = [1,0,0,0,1,1]:
 *
 * 1. Conteo inicial:
 *    count0 = 2 (estudiantes que prefieren circular)
 *    count1 = 4 (estudiantes que prefieren cuadrado)
 *
 * 2. Procesando pila de sándwiches:
 *    j=0: sandwiches[0]=1, count1>0 → count1=3
 *    j=1: sandwiches[1]=0, count0>0 → count0=1
 *    j=2: sandwiches[2]=0, count0>0 → count0=0
 *    j=3: sandwiches[3]=0, count0=0 → return count1=3
 *
 * Resultado: 3 estudiantes no pueden comer
 */
