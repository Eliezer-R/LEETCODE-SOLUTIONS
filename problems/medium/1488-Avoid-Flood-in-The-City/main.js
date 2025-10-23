const avoidFlood = function (rains) {
  const n = rains.length
  const ans = new Array(n).fill(1)
  const lastRain = new Map() // lago → último día que llovió
  const dryDays = [] // días secos disponibles

  for (let i = 0; i < n; i++) {
    const lake = rains[i]

    if (lake === 0) {
      // Día seco: guardar para uso posterior
      dryDays.push(i)
      ans[i] = 1 // Placeholder, se actualizará si es necesario
    } else {
      // Día lluvioso
      ans[i] = -1

      // Verificar si el lago ya estaba lleno
      if (lastRain.has(lake)) {
        const prevDay = lastRain.get(lake)

        // Buscar un día seco después de prevDay
        const idx = binarySearch(dryDays, prevDay)
        if (idx === -1) return [] // No hay día seco disponible

        const dryDay = dryDays[idx]
        ans[dryDay] = lake // Secar este lago en ese día
        dryDays.splice(idx, 1) // Remover día usado
      }

      lastRain.set(lake, i) // Actualizar último día de lluvia
    }
  }

  return ans

  function binarySearch (arr, target) {
    let left = 0; let right = arr.length - 1
    let res = -1
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (arr[mid] > target) {
        res = mid
        right = mid - 1
      } else {
        left = mid + 1
      }
    }
    return res
  }
}

console.log(avoidFlood([1, 2, 3, 4])) // [-1,-1,-1,-1]
console.log(avoidFlood([1, 2, 0, 0, 2, 1])) // [-1,-1,2,1,-1,-1]
console.log(avoidFlood([1, 2, 0, 1, 2])) // []

/**
 * Ejemplo paso a paso con rains = [1,2,0,0,2,1]:
 *
 * i=0: lake=1, ans[0]=-1, lastRain={1→0}
 * i=1: lake=2, ans[1]=-1, lastRain={1→0, 2→1}
 * i=2: lake=0, dryDays=[2], ans[2]=1
 * i=3: lake=0, dryDays=[2,3], ans[3]=1
 *
 * i=4: lake=2
 *   prevDay = lastRain.get(2) = 1
 *   Buscar día seco > 1 en [2,3]
 *   binarySearch([2,3], 1) → índice 0 (día 2)
 *   ans[2] = 2 (secar lago 2 en día 2)
 *   dryDays = [3]
 *   ans[4] = -1
 *   lastRain={1→0, 2→4}
 *
 * i=5: lake=1
 *   prevDay = lastRain.get(1) = 0
 *   Buscar día seco > 0 en [3]
 *   binarySearch([3], 0) → índice 0 (día 3)
 *   ans[3] = 1 (secar lago 1 en día 3)
 *   dryDays = []
 *   ans[5] = -1
 *   lastRain={1→5, 2→4}
 *
 * Resultado: [-1, -1, 2, 1, -1, -1]
 */
