const processQueries = function (c, connections, queries) {
  // PARTE 1: UNION-FIND (DSU) SETUP

  // p[i] = padre del nodo i (inicialmente cada nodo es su propio padre)
  const p = Array(c + 1).fill(0).map((_, i) => i)

  // sz[i] = tamaño del componente con raíz i
  const sz = Array(c + 1).fill(1)

  // find: encuentra la raíz del componente con path compression
  const find = x => (p[x] === x ? x : (p[x] = find(p[x])))

  // unite: une dos componentes
  const unite = (a, b) => {
    a = find(a); b = find(b)
    if (a === b) return // Ya están en el mismo componente

    // Union by size: el componente más grande se convierte en padre
    if (sz[a] < sz[b]) [a, b] = [b, a]
    p[b] = a
    sz[a] += sz[b]
  }

  // Unir todas las conexiones
  for (const [u, v] of connections) unite(u, v)

  // PARTE 2: MIN HEAP IMPLEMENTATION

  class MinHeap {
    constructor () { this.a = [] }
    size () { return this.a.length }
    peek () { return this.a[0] }

    // push: agregar elemento y hacer bubble up
    push (x) {
      const a = this.a
      a.push(x)
      let i = a.length - 1

      // Bubble up: subir el elemento hasta su posición correcta
      while (i > 0) {
        const p = (i - 1) >> 1 // Padre = (i-1)/2
        if (a[p] <= a[i]) break; // Ya está en posición correcta
        [a[p], a[i]] = [a[i], a[p]] // Swap con padre
        i = p
      }
    }

    // pop: extraer el mínimo y hacer bubble down
    pop () {
      const a = this.a
      if (a.length === 0) return undefined

      const top = a[0]; const last = a.pop()
      if (a.length) {
        a[0] = last
        let i = 0

        // Bubble down: bajar el elemento hasta su posición correcta
        while (true) {
          const l = i * 2 + 1; const r = l + 1; let m = i

          // Encontrar el menor entre nodo actual e hijos
          if (l < a.length && a[l] < a[m]) m = l
          if (r < a.length && a[r] < a[m]) m = r

          if (m === i) break; // Ya está en posición correcta
          [a[i], a[m]] = [a[m], a[i]] // Swap
          i = m
        }
      }
      return top
    }
  }

  // PARTE 3: CREAR HEAPS POR COMPONENTE

  // heap: Map donde la clave es la raíz del componente
  // y el valor es un MinHeap con todas las ciudades de ese componente
  const heap = new Map()

  for (let i = 1; i <= c; i++) {
    const r = find(i) // Encontrar raíz del componente
    if (!heap.has(r)) heap.set(r, new MinHeap())
    heap.get(r).push(i) // Agregar ciudad al heap de su componente
  }

  // PARTE 4: PROCESAR CONSULTAS

  // offline: marca qué ciudades están desconectadas
  const offline = Array(c + 1).fill(false)
  const ans = []

  for (const [t, x] of queries) {
    if (t === 2) {
      // Tipo 2: Desconectar ciudad x
      offline[x] = true
    } else {
      // Tipo 1: Encontrar ciudad disponible más pequeña

      if (!offline[x]) {
        // Caso simple: x misma está disponible
        ans.push(x)
      } else {
        // x está offline, buscar en el heap del componente
        const r = find(x) // Raíz del componente de x
        const pq = heap.get(r) // Heap del componente

        if (!pq) {
          ans.push(-1)
          continue
        }

        // Limpiar el heap: remover ciudades offline del tope
        while (pq.size() && offline[pq.peek()]) {
          pq.pop()
        }

        // El tope del heap es la ciudad más pequeña disponible
        ans.push(pq.size() ? pq.peek() : -1)
      }
    }
  }

  return ans
}

console.log(processQueries(5, [[1, 2], [2, 3], [3, 4], [4, 5]], [[1, 3], [2, 3], [1, 2], [1, 4]]))
