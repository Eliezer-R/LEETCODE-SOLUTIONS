const fib = function (n) {
  let fib = 0 // Variable para almacenar el resultado
  let n1 = 0 // F(i-2): penúltimo número de Fibonacci
  let n2 = 1 // F(i-1): último número de Fibonacci

  // Casos base
  if (n <= 0) return 0
  if (n === 1) return 1

  // Calcular iterativamente desde F(2) hasta F(n)
  for (let i = 1; i < n; i++) {
    fib = n1 + n2 // F(i) = F(i-2) + F(i-1)
    n1 = n2 // Actualizar F(i-2) para siguiente iteración
    n2 = fib // Actualizar F(i-1) para siguiente iteración
  }

  return fib
}

console.log(fib(4)) // 3

/**
 * Ejemplo paso a paso con n = 4:
 *
 * Inicial: n1=0, n2=1, fib=0
 *
 * i=1: fib = 0+1 = 1, n1=1, n2=1  → F(2) = 1
 * i=2: fib = 1+1 = 2, n1=1, n2=2  → F(3) = 2
 * i=3: fib = 1+2 = 3, n1=2, n2=3  → F(4) = 3
 *
 * Secuencia: F(0)=0, F(1)=1, F(2)=1, F(3)=2, F(4)=3
 * Resultado: 3
 */
