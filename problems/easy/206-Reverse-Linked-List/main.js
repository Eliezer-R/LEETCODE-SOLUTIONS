const reverseList = function (head) {
  let prev = null // Puntero al nodo anterior (inicialmente null)
  let current = head // Puntero al nodo actual (empieza en head)

  // Iterar hasta procesar todos los nodos
  while (current !== null) {
    const next = current.next // Guardar referencia al siguiente nodo
    current.next = prev // Invertir el enlace: apuntar al anterior
    prev = current // Mover prev al nodo actual
    current = next // Mover current al siguiente nodo
  }

  return prev // prev ahora apunta al nuevo head (último nodo original)
}

console.log(reverseList([1, 2, 3, 4, 5]))

/**
 * Ejemplo paso a paso con head = [1,2,3,4,5]:
 *
 * Estado inicial:
 * prev = null, current = 1→2→3→4→5→null
 *
 * Iteración 1:
 * next = 2→3→4→5→null
 * current.next = null → 1→null
 * prev = 1→null, current = 2→3→4→5→null
 *
 * Iteración 2:
 * next = 3→4→5→null
 * current.next = 1→null → 2→1→null
 * prev = 2→1→null, current = 3→4→5→null
 *
 * Iteración 3:
 * next = 4→5→null
 * current.next = 2→1→null → 3→2→1→null
 * prev = 3→2→1→null, current = 4→5→null
 *
 * Iteración 4:
 * next = 5→null
 * current.next = 3→2→1→null → 4→3→2→1→null
 * prev = 4→3→2→1→null, current = 5→null
 *
 * Iteración 5:
 * next = null
 * current.next = 4→3→2→1→null → 5→4→3→2→1→null
 * prev = 5→4→3→2→1→null, current = null
 *
 * Resultado: prev = 5→4→3→2→1→null
 */
