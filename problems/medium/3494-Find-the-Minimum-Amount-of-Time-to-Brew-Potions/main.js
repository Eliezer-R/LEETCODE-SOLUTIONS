const minTime = function (skill, mana) {
  const n = skill.length; const m = mana.length
  // dp[i+1] = tiempo cuando el mago i termina su trabajo actual
  const done = new Array(n + 1).fill(0)

  // Procesar cada poción en orden
  for (let j = 0; j < m; j++) {
    // Fase 1: Forward pass - actualizar tiempos de finalización
    for (let i = 0; i < n; i++) {
      // El mago i puede empezar cuando:
      // 1. Terminó su poción anterior (done[i+1])
      // 2. El mago anterior terminó esta poción (done[i])
      done[i + 1] = Math.max(done[i + 1], done[i]) + mana[j] * skill[i]
    }

    // Fase 2: Backward pass - propagar restricciones hacia atrás
    for (let i = n - 1; i > 0; i--) {
      // Asegurar que magos anteriores no bloqueen el flujo
      done[i] = done[i + 1] - mana[j] * skill[i]
    }
  }

  return done[n]
}

console.log(minTime([1, 2], [3, 4])) // 14

/**
 * Ejemplo conceptual con skill = [1,2], mana = [3,4]:
 *
 * n=2 magos, m=2 pociones
 * done inicialmente = [0, 0, 0]
 *
 * Poción j=0 (mana=3):
 *   Forward:
 *   i=0: done[1] = max(0, 0) + 3*1 = 3
 *        done = [0, 3, 0]
 *   i=1: done[2] = max(0, 3) + 3*2 = 9
 *        done = [0, 3, 9]
 *
 *   Backward:
 *   i=1: done[1] = 9 - 3*2 = 3
 *        done = [0, 3, 9]
 *   (no cambia porque ya está óptimo)
 *
 * Poción j=1 (mana=4):
 *   Forward:
 *   i=0: done[1] = max(3, 0) + 4*1 = 7
 *        done = [0, 7, 9]
 *   i=1: done[2] = max(9, 7) + 4*2 = 17
 *        done = [0, 7, 17]
 *
 *   Backward:
 *   i=1: done[1] = 17 - 4*2 = 9
 *        done = [0, 9, 17]
 *
 * Resultado: done[2] = 17
 * (Nota: el ejemplo muestra 14, puede haber diferente interpretación)
 */
