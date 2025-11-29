const maxKDivisibleComponents = function (n, edges, values, k) {
  // Construir lista de adyacencia
  const adj = Array.from({ length: n }, () => [])

  for (const [a, b] of edges) {
    adj[a].push(b)
    adj[b].push(a)
  }

  let ans = 0 // Contador de componentes

  // DFS que retorna la suma del subárbol módulo k
  const dfs = (node, parent) => {
    // Iniciar con el valor del nodo actual
    let sum = values[node]

    // Sumar recursivamente los subárboles de todos los hijos
    for (const nxt of adj[node]) {
      if (nxt !== parent) {
        sum += dfs(nxt, node)
      }
    }

    // Si la suma del subárbol es divisible por k, contarlo como componente
    if (sum % k === 0) {
      ans++
    }

    // Retornar el resto para que el padre lo pueda usar
    return sum % k
  }

  dfs(0, -1) // Iniciar DFS desde el nodo 0
  return ans
}

console.log(maxKDivisibleComponents(5, [[0, 2], [1, 2], [1, 3], [2, 4]], [1, 8, 1, 4, 4], 6)) // 2

/**
 * Ejemplo paso a paso con n=5, edges=[[0,2],[1,2],[1,3],[2,4]], values=[1,8,1,4,4], k=6:
 *
 * Árbol visualizado:
 *       0 (val=1)
 *       |
 *       2 (val=1)
 *      / \
 *     1   4
 *   (8)  (4)
 *    |
 *    3 (val=4)
 *
 * Lista de adyacencia:
 * adj[0] = [2]
 * adj[1] = [2, 3]
 * adj[2] = [0, 1, 4]
 * adj[3] = [1]
 * adj[4] = [2]
 *
 * Ejecución DFS desde nodo 0:
 *
 * dfs(0, -1):
 *   sum = 1
 *   Procesar hijo 2:
 *     dfs(2, 0):
 *       sum = 1
 *       Procesar hijo 1:
 *         dfs(1, 2):
 *           sum = 8
 *           Procesar hijo 3:
 *             dfs(3, 1):
 *               sum = 4
 *               Sin hijos
 *               4 % 6 = 4 (no divisible)
 *               return 4
 *           sum = 8 + 4 = 12
 *           12 % 6 = 0 ✓ (divisible)
 *           ans++ → ans = 1
 *           return 0
 *       sum = 1 + 0 = 1
 *       Procesar hijo 4:
 *         dfs(4, 2):
 *           sum = 4
 *           Sin hijos
 *           4 % 6 = 4 (no divisible)
 *           return 4
 *       sum = 1 + 4 = 5
 *       5 % 6 = 5 (no divisible)
 *       return 5
 *   sum = 1 + 5 = 6
 *   6 % 6 = 0 ✓ (divisible)
 *   ans++ → ans = 2
 *   return 0
 *
 * Resultado final: ans = 2
 *
 * Explicación de los componentes:
 * 1. Componente [1, 3]: suma = 8 + 4 = 12 (divisible por 6)
 * 2. Componente [0, 2, 4]: suma = 1 + 1 + 4 = 6 (divisible por 6)
 */
