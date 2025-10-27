const magicalSum = function (m, k, nums) {
  const MOD = BigInt(1000000007)
  const n = nums.length

  // Paso 1: Precalcular coeficientes binomiales C(n,k)
  // C[i][j] = número de formas de elegir j elementos de i elementos
  const C = Array.from({ length: m + 1 }, () => Array(m + 1).fill(0n))
  for (let i = 0; i <= m; i++) {
    C[i][0] = 1n // C(i,0) = 1
    C[i][i] = 1n // C(i,i) = 1
    // Fórmula de Pascal: C(i,j) = C(i-1,j-1) + C(i-1,j)
    for (let j = 1; j < i; j++) {
      C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD
    }
  }

  // Paso 2: Precalcular potencias de cada número
  // powA[i][t] = nums[i]^t mod MOD
  const powA = Array.from({ length: n }, () => Array(m + 1).fill(1n))
  for (let i = 0; i < n; i++) {
    powA[i][0] = 1n // Cualquier número^0 = 1
    const a = BigInt(nums[i]) % MOD
    for (let t = 1; t <= m; t++) {
      powA[i][t] = (powA[i][t - 1] * a) % MOD
    }
  }

  // Paso 3: Programación Dinámica
  const M = m

  // cur[r][carry][ones] = número de formas de llegar a este estado
  // r: elementos restantes por elegir
  // carry: acarreo actual en la suma binaria
  // ones: número de bits '1' contados hasta ahora
  let cur = Array.from({ length: M + 1 }, () =>
    Array.from({ length: M + 1 }, () =>
      Array(M + 1).fill(0n)
    )
  )

  // Estado inicial: tenemos M elementos por elegir, sin carry, sin ones
  cur[M][0][0] = 1n

  // Paso 4: Procesar cada número del array
  for (let i = 0; i < n; i++) {
    // Crear nueva tabla DP para esta iteración
    const nxt = Array.from({ length: M + 1 }, () =>
      Array.from({ length: M + 1 }, () =>
        Array(M + 1).fill(0n)
      )
    )

    // Para cada estado posible actual
    for (let r = 0; r <= M; r++) {
      for (let carry = 0; carry <= M; carry++) {
        for (let ones = 0; ones <= M; ones++) {
          const val = cur[r][carry][ones]
          if (val === 0n) continue // Skip estados vacíos

          // Decidir cuántas veces usar nums[i]: t veces (0 a r)
          for (let t = 0; t <= r; t++) {
            const newr = r - t // Elementos restantes después de usar t
            const sum = carry + t // Nueva suma en esta posición binaria
            const bit = sum & 1 // Bit menos significativo (0 o 1)
            const newones = ones + bit // Actualizar conteo de '1's

            // Si excedemos k bits '1', este camino no es válido
            if (newones > M) continue

            const newcarry = sum >>> 1 // Nuevo acarreo (shift derecha)

            // Multiplicador combinatorio: C(r,t) * nums[i]^t
            const mult = (C[r][t] * powA[i][t]) % MOD

            // Sumar a la nueva tabla
            const add = (val * mult) % MOD
            nxt[newr][newcarry][newones] = (nxt[newr][newcarry][newones] + add) % MOD
          }
        }
      }
    }
    cur = nxt // Actualizar tabla para próxima iteración
  }

  // Paso 5: Recolectar resultados
  let ans = 0n

  // Solo estados donde elegimos todos los elementos (r=0)
  for (let carry = 0; carry <= M; carry++) {
    for (let ones = 0; ones <= M; ones++) {
      const val = cur[0][carry][ones]
      if (val === 0n) continue

      // Contar bits '1' adicionales en el carry final
      const extra = popcount(carry)

      // Si el total de bits '1' es exactamente k
      if (ones + extra === k) {
        ans = (ans + val) % MOD
      }
    }
  }

  return Number(ans)

  // Función auxiliar: contar bits '1' en un número
  function popcount (x) {
    let c = 0
    while (x > 0) {
      c += x & 1 // Sumar el bit menos significativo
      x >>>= 1 // Shift derecha
    }
    return c
  }
}

console.log(magicalSum(2, 2, [1, 2, 3])) // 39
console.log(magicalSum(3, 1, [4])) // 64
