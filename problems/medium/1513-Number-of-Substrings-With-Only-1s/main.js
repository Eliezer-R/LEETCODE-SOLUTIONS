const numSub = function (s) {
  const MOD = 1e9 + 7
  let curr = 0 // Contador de '1's consecutivos
  let ans = 0 // Respuesta acumulada

  for (const c of s) {
    if (c === '1') {
      // Incrementar contador de '1's consecutivos
      curr++

      // Agregar el número de nuevas subcadenas que terminan aquí
      // curr representa cuántas subcadenas terminan en esta posición
      ans = (ans + curr) % MOD
    } else {
      // Encontramos un '0', reiniciar el contador
      curr = 0
    }
  }

  return ans
}

console.log(numSub('0110111')) // 9

/**
 * Ejemplo paso a paso con s = "0110111":
 * Índices:  0 1 2 3 4 5 6
 * Cadena:  "0 1 1 0 1 1 1"
 *
 * Iteración por cada carácter:
 *
 * i=0, c='0': curr=0, ans=0
 *   → No hay subcadenas que terminen aquí
 *
 * i=1, c='1': curr=1, ans=(0+1)%MOD=1
 *   → Nueva subcadena: "1" (índice 1)
 *   → Total acumulado: 1
 *
 * i=2, c='1': curr=2, ans=(1+2)%MOD=3
 *   → Nuevas subcadenas: "1" (índice 2), "11" (índices 1-2)
 *   → Total acumulado: 1 + 2 = 3
 *
 * i=3, c='0': curr=0, ans=3
 *   → Reiniciar contador, no agregar nada
 *
 * i=4, c='1': curr=1, ans=(3+1)%MOD=4
 *   → Nueva subcadena: "1" (índice 4)
 *   → Total acumulado: 3 + 1 = 4
 *
 * i=5, c='1': curr=2, ans=(4+2)%MOD=6
 *   → Nuevas subcadenas: "1" (índice 5), "11" (índices 4-5)
 *   → Total acumulado: 4 + 2 = 6
 *
 * i=6, c='1': curr=3, ans=(6+3)%MOD=9
 *   → Nuevas subcadenas: "1" (índice 6), "11" (índices 5-6), "111" (índices 4-6)
 *   → Total acumulado: 6 + 3 = 9
 *
 * Resultado final: 9
 *
 * Verificación:
 * - Grupo "11" (índices 1-2): 1 + 2 = 3 subcadenas
 * - Grupo "111" (índices 4-6): 1 + 2 + 3 = 6 subcadenas
 * - Total: 3 + 6 = 9 ✓
 */
