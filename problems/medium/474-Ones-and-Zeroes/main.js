const findMaxForm = function (S, M, N) {
  // Crear tabla DP 2D de tamaño (M+1) x (N+1)
  // dp[i][j] = máximo número de strings con ≤ i ceros y ≤ j unos
  // Usamos Uint8Array para optimizar memoria (solo necesitamos valores pequeños)
  const dp = Array.from({ length: M + 1 }, () => new Uint8Array(N + 1))

  // Iterar por cada string en el array
  for (let i = 0; i < S.length; i++) {
    const str = S[i]; let zeros = 0; let ones = 0

    // Contar cuántos '0' y '1' tiene este string
    for (let j = 0; j < str.length; j++) { str.charAt(j) === '0' ? zeros++ : ones++ }

    // Actualizar la tabla DP en orden REVERSO
    // IMPORTANTE: Iterar de M hacia zeros (no de zeros hacia M)
    // Esto evita usar el mismo string múltiples veces
    for (let j = M; j >= zeros; j--) {
      for (let k = N; k >= ones; k--)
      // Decidir: ¿tomamos este string o no?
      // No tomar: dp[j][k] (valor actual)
      // Tomar: dp[j-zeros][k-ones] + 1
      //   (el mejor resultado con menos zeros/ones + 1)
      { dp[j][k] = Math.max(dp[j][k], dp[j - zeros][k - ones] + 1) }
    }
  }

  // La respuesta está en dp[M][N]: máximo con M ceros y N unos
  return dp[M][N]
}

console.log(findMaxForm(['10', '0001', '111001', '1', '0'], 5, 3)) // 4
console.log(findMaxForm(['10', '0', '1'], 1, 1)) // 2
