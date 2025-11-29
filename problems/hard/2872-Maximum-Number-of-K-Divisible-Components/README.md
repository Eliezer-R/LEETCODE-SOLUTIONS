# 2872. Maximum Number of K-Divisible Components

Hay un árbol no dirigido con **n** nodos etiquetados de **0** a **n - 1**. Se te da el entero **n** y un arreglo 2D de enteros **edges** de longitud **n - 1**, donde `edges[i] = [aᵢ, bᵢ]` indica que hay una arista entre los nodos `aᵢ` y `bᵢ` en el árbol.

También se te da un arreglo de enteros **values** indexado desde 0 de longitud **n**, donde `values[i]` es el **valor** asociado con el nodo **i**, y un entero **k**.

Una **división válida** del árbol se obtiene eliminando cualquier conjunto de aristas (posiblemente vacío) del árbol de manera que los componentes resultantes tengan valores **divisibles por k**, donde el valor de un componente conexo es la **suma de los valores de sus nodos**.

Retorna el **número máximo de componentes** en cualquier división válida.

**Dificultad:** Hard

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `n = 5`, `edges = [[0,2],[1,2],[1,3],[2,4]]`, `values = [1,8,1,4,4]`, `k = 6`
- Salida: `2`
- Explicación: Removemos la arista entre nodo 1 y nodo 2. La división resultante es válida porque:
  - Componente con nodos 1 y 3: `values[1] + values[3] = 8 + 4 = 12` (divisible por 6)
  - Componente con nodos 0, 2 y 4: `values[0] + values[2] + values[4] = 1 + 1 + 4 = 6` (divisible por 6)

**Ejemplo 2:**

- Entrada: `n = 7`, `edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]]`, `values = [3,0,6,1,5,2,1]`, `k = 3`
- Salida: `3`
- Explicación: Removemos las aristas entre nodo 0-2 y nodo 0-1. Obtenemos 3 componentes:
  - Componente con nodo 0: `values[0] = 3` (divisible por 3)
  - Componente con nodos 2, 5, 6: `values[2] + values[5] + values[6] = 6 + 2 + 1 = 9` (divisible por 3)
  - Componente con nodos 1, 3, 4: `values[1] + values[3] + values[4] = 0 + 1 + 5 = 6` (divisible por 3)

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Encontrar el número máximo de subárboles donde cada subárbol tiene suma divisible por k.
- **Insight clave**: Usar **DFS post-order** para calcular sumas de subárboles desde las hojas hacia la raíz. Si un subárbol tiene suma divisible por k, podemos "cortarlo" y contarlo como componente independiente.
- **Técnica**: DFS recursivo que retorna el resto de la suma del subárbol módulo k.
- **Retos**: Manejar correctamente el retorno del resto para que el padre pueda calcular su propia suma.

La estrategia aprovecha que cuando encontramos un subárbol con suma divisible por k, podemos "separarlo" y contar como componente, retornando resto 0 al padre (como si no contribuyera nada).

---

## 🔧 Implementación

```javascript
var maxKDivisibleComponents = function (n, edges, values, k) {
    // Construir lista de adyacencia
    const adj = Array.from({ length: n }, () => []);

    for (let [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
    }

    let ans = 0; // Contador de componentes

    // DFS que retorna la suma del subárbol módulo k
    const dfs = (node, parent) => {
        // Iniciar con el valor del nodo actual
        let sum = values[node];
        
        // Sumar recursivamente los subárboles de todos los hijos
        for (let nxt of adj[node]) {
            if (nxt !== parent) {
                sum += dfs(nxt, node);
            }
        }
        
        // Si la suma del subárbol es divisible por k, contarlo como componente
        if (sum % k === 0) {
            ans++;
        }
        
        // Retornar el resto para que el padre lo pueda usar
        return sum % k;
    };

    dfs(0, -1); // Iniciar DFS desde el nodo 0
    return ans;
};

console.log(maxKDivisibleComponents(5, [[0,2],[1,2],[1,3],[2,4]], [1,8,1,4,4], 6)); // 2

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
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n), donde n es el número de nodos.
  - Visitamos cada nodo exactamente una vez en el DFS
- **Complejidad espacial**: O(n), para la lista de adyacencia y el call stack de recursión.
![rendimiento](./public/rendimiento.png)

*Esta solución es óptima ya que necesitamos visitar cada nodo para calcular las sumas.*

---

## 🔧 Detalles Técnicos Importantes

**¿Por qué retornar `sum % k`?**

Cuando un subárbol tiene suma divisible por k, lo contamos como componente y retornamos 0 (resto 0) al padre. Esto simula "cortar" ese subárbol, como si no contribuyera nada al padre.

```javascript
if (sum % k === 0) {
    ans++;          // Contar este subárbol como componente
    return 0;       // No aportar nada al padre
}
return sum % k;     // Aportar el resto al padre
```

**Construcción de lista de adyacencia:**

```javascript
for (let [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);  // Árbol no dirigido
}
```

Como es un árbol no dirigido, agregamos la arista en ambas direcciones.

**Evitar visitar al padre:**

```javascript
if (nxt !== parent) {
    sum += dfs(nxt, node);
}
```

Al pasar el `parent` como parámetro, evitamos volver a visitar el nodo del cual venimos.

**¿Por qué funciona este algoritmo?**

La clave es el orden post-order del DFS:
1. Procesamos primero los subárboles hijos (hojas hacia raíz)
2. Cuando llegamos a un nodo, ya conocemos las sumas de todos sus subárboles
3. Si la suma total es divisible por k, es una división válida
4. Retornamos el resto para que el padre pueda continuar calculando

---

## 🎯 Aprendizajes Clave

- **DFS post-order**: Procesar hijos antes que el padre es crucial.
- **Retorno de restos**: Usar módulo para comunicar información entre niveles.
- **Greedy en árboles**: Separar subárboles divisibles maximiza componentes.
- **Árbol como grafo**: Usar lista de adyacencia con detección de padre.

---

## 🔍 Casos Edge

- **Árbol lineal**: `n=3`, `edges=[[0,1],[1,2]]`, todos forman un camino
- **Un solo nodo**: `n=1`, `values=[6]`, `k=3` → `1` componente
- **Estrella**: Un nodo central conectado a todos
- **k=1**: Todos los subárboles son divisibles → máximo n componentes
- **Todos los valores son 0**: Todos los subárboles son divisibles
- **Suma total no divisible**: Aún podemos tener componentes válidos

---

## 🧮 Ejemplos Adicionales

```javascript
n=5, edges=[[0,2],[1,2],[1,3],[2,4]], 
values=[1,8,1,4,4], k=6  → 2

n=7, edges=[[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], 
values=[3,0,6,1,5,2,1], k=3  → 3

n=1, values=[9], k=3     → 1
n=2, edges=[[0,1]], values=[3,3], k=3  → 2
```

---

## 🚀 Solución Alternativa: BFS con Procesamiento de Hojas

Versión iterativa usando BFS eliminando hojas:

```javascript
var maxKDivisibleComponentsBFS = function(n, edges, values, k) {
    if (n === 1) return 1;
    
    const adj = Array.from({ length: n }, () => []);
    const degree = new Array(n).fill(0);
    
    for (let [a, b] of edges) {
        adj[a].push(b);
        adj[b].push(a);
        degree[a]++;
        degree[b]++;
    }
    
    const queue = [];
    for (let i = 0; i < n; i++) {
        if (degree[i] === 1) queue.push(i);
    }
    
    let ans = 0;
    
    while (queue.length > 0) {
        const node = queue.shift();
        degree[node]--;
        
        let carry = values[node] % k;
        if (carry === 0) ans++;
        
        for (let neighbor of adj[node]) {
            if (degree[neighbor] === 0) continue;
            
            degree[neighbor]--;
            values[neighbor] += carry;
            
            if (degree[neighbor] === 1) {
                queue.push(neighbor);
            }
        }
    }
    
    return ans;
};
```

**Ventaja**: Iterativo, evita recursión profunda
**Desventaja**: Más complejo de entender

---

## 🔬 Comparación de Enfoques

| Enfoque | Tiempo | Espacio | Legibilidad | Cuándo usar |
|---------|--------|---------|-------------|-------------|
| **DFS recursivo** (presentado) | O(n) | O(n) | ⭐⭐⭐⭐⭐ | Siempre (más claro) |
| **BFS hojas** | O(n) | O(n) | ⭐⭐⭐ | Evitar recursión profunda |
| **DP en árbol** | O(n) | O(n) | ⭐⭐⭐⭐ | Enfoque más formal |

---

## 💡 Visualización del Algoritmo

Para el árbol del Ejemplo 1:

```
Árbol original:
      0(1)
       |
      2(1)
     /   \
   1(8)  4(4)
    |
   3(4)

Procesamiento DFS (post-order):

1. dfs(3): sum=4, resto=4, no divisible
2. dfs(1): sum=8+4=12, resto=0 ✓ → ans=1, return 0
3. dfs(4): sum=4, resto=4, no divisible
4. dfs(2): sum=1+0+4=5, resto=5, no divisible
5. dfs(0): sum=1+5=6, resto=0 ✓ → ans=2, return 0

Componentes resultantes:
[1,3] con suma 12
[0,2,4] con suma 6
```

---

## 🧠 Intuición del Problema

**¿Por qué DFS post-order?**

Imagina que estás en un árbol y necesitas decidir dónde "cortar":
- No puedes decidir hasta conocer la suma de tus hijos
- Por eso procesas de abajo hacia arriba (hojas → raíz)
- Cuando encuentras un subárbol divisible, lo separas

**Analogía:**
Es como podar un árbol: solo puedes decidir cortar una rama cuando sabes el peso total de esa rama (incluyendo todas sus sub-ramas).

---


## 🏷️ Tags

`Tree` `DFS` `Graph` `Dynamic Programming` `Hard`

---