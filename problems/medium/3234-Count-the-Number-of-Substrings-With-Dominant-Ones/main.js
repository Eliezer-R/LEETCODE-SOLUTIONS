const numberOfSubstrings = function (s) {
  const n = s.length

  // pre[i] guarda el índice del '0' más reciente antes de la posición i
  // o el índice del inicio del grupo actual de '1's
  const pre = new Array(n + 1)
  pre[0] = -1

  for (let i = 0; i < n; i++) {
    if (i === 0 || (i > 0 && s[i - 1] === '0')) {
      // Si estamos al inicio o el carácter anterior era '0',
      // marcamos esta posición como el inicio de un nuevo segmento
      pre[i + 1] = i
    } else {
      // Si el anterior era '1', heredamos el inicio del segmento
      pre[i + 1] = pre[i]
    }
  }

  let res = 0

  // Iterar sobre cada posición como posible final de subcadena
  for (let i = 1; i <= n; i++) {
    let cnt0 = s[i - 1] === '0' ? 1 : 0 // Contador de ceros
    let j = i // Índice para moverse hacia la izquierda

    // Saltar entre grupos de '0's hacia la izquierda
    // Solo continuar mientras cnt0² no exceda n (optimización)
    while (j > 0 && cnt0 * cnt0 <= n) {
      // Calcular cuántos '1's hay en el rango [pre[j], i)
      const cnt1 = i - pre[j] - cnt0

      // Verificar si esta configuración satisface la condición
      if (cnt0 * cnt0 <= cnt1) {
        // Calcular cuántas subcadenas válidas terminan en i
        // con exactamente cnt0 ceros
        res += Math.min(j - pre[j], cnt1 - cnt0 * cnt0 + 1)
      }

      // Saltar al siguiente grupo de '0's hacia la izquierda
      j = pre[j]
      cnt0++
    }
  }

  return res
}

console.log(numberOfSubstrings('00011')) // 5

/**
 * Ejemplo paso a paso con s = "00011":
 * Índices:  0 1 2 3 4
 * Cadena:  "0 0 0 1 1"
 *
 * PASO 1: Construir arreglo pre[]
 *
 * pre[0] = -1 (inicialización)
 *
 * i=0, s[0]='0':
 *   i === 0 ✓ → pre[1] = 0
 *
 * i=1, s[1]='0':
 *   s[0]='0' ✓ → pre[2] = 1
 *
 * i=2, s[2]='0':
 *   s[1]='0' ✓ → pre[3] = 2
 *
 * i=3, s[3]='1':
 *   s[2]='0' ✓ → pre[4] = 3
 *
 * i=4, s[4]='1':
 *   s[3]='1' → pre[5] = pre[4] = 3
 *
 * Resultado: pre = [-1, 0, 1, 2, 3, 3]
 *
 * PASO 2: Contar subcadenas válidas
 *
 * i=1, s[0]='0': cnt0=1, j=1
 *   cnt0²=1 <= 5 ✓
 *   cnt1 = 1 - pre[1] - 1 = 1 - 0 - 1 = 0
 *   cnt0²=1 > cnt1=0 ✗ → no válido
 *   j = pre[1] = 0, cnt0=2
 *   cnt0²=4 <= 5 ✓
 *   j=0, salir del while
 *
 * i=2, s[1]='0': cnt0=1, j=2
 *   cnt1 = 2 - pre[2] - 1 = 2 - 1 - 1 = 0
 *   cnt0²=1 > cnt1=0 ✗
 *   j = pre[2] = 1, cnt0=2
 *   (similar, no válido)
 *
 * i=3, s[2]='0': cnt0=1, j=3
 *   cnt1 = 3 - pre[3] - 1 = 3 - 2 - 1 = 0
 *   No válido
 *
 * i=4, s[3]='1': cnt0=0, j=4
 *   cnt0²=0 <= 5 ✓
 *   cnt1 = 4 - pre[4] - 0 = 4 - 3 - 0 = 1
 *   cnt0²=0 <= cnt1=1 ✓
 *   res += min(4 - 3, 1 - 0 + 1) = min(1, 2) = 1
 *   → Subcadena "1" (índice 3)
 *   j = pre[4] = 3, cnt0=1
 *   cnt1 = 4 - pre[3] - 1 = 4 - 2 - 1 = 1
 *   cnt0²=1 <= cnt1=1 ✓
 *   res += min(3 - 2, 1 - 1 + 1) = min(1, 1) = 1
 *   → Subcadena "01" (índices 2-3)
 *   j = pre[3] = 2, cnt0=2
 *   cnt1 = 4 - pre[2] - 2 = 4 - 1 - 2 = 1
 *   cnt0²=4 > cnt1=1 ✗
 *
 * i=5, s[4]='1': cnt0=0, j=5
 *   cnt1 = 5 - pre[5] - 0 = 5 - 3 - 0 = 2
 *   cnt0²=0 <= cnt1=2 ✓
 *   res += min(5 - 3, 2 - 0 + 1) = min(2, 3) = 2
 *   → Subcadenas "1" (índice 4) y "11" (índices 3-4)
 *   j = pre[5] = 3, cnt0=1
 *   cnt1 = 5 - pre[3] - 1 = 5 - 2 - 1 = 2
 *   cnt0²=1 <= cnt1=2 ✓
 *   res += min(3 - 2, 2 - 1 + 1) = min(1, 2) = 1
 *   → Subcadena "011" (índices 2-4)
 *
 * Resultado final: res = 1 + 1 + 2 + 1 = 5 ✓
 */
