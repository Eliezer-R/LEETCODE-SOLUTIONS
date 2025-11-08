const modifiedList = function (nums, head) {
  // Paso 1: Convertir el array a Set para búsquedas O(1)
  // Set nos permite verificar si un valor existe en tiempo constante
  const toRemove = new Set(nums)

  // Paso 2: Crear un nodo dummy (ficticio)
  // El dummy node simplifica el manejo de casos edge como eliminar la cabeza
  // new ListNode(0, head) crea un nodo con valor 0 que apunta a head
  const dummy = new ListNode(0, head)

  // curr empieza en el dummy, no en head
  // Esto nos permite verificar curr.next y eliminarlo si es necesario
  let curr = dummy

  // Paso 3: Iterar mientras haya un siguiente nodo
  while (curr.next !== null) {
    // Verificar si el SIGUIENTE nodo debe ser eliminado
    // Verificamos curr.next, no curr, porque necesitamos mantener
    // una referencia al nodo anterior para poder eliminar
    if (toRemove.has(curr.next.val)) {
      // ELIMINAR: Saltar el siguiente nodo
      // curr.next = curr.next.next hace que curr apunte al nodo
      // después del que queremos eliminar, efectivamente eliminándolo
      curr.next = curr.next.next
    } else {
      // NO ELIMINAR: Avanzar al siguiente nodo
      // Solo avanzamos si NO eliminamos el nodo
      curr = curr.next
    }
  }

  // Paso 4: Retornar dummy.next (la nueva cabeza)
  // dummy.next es la nueva cabeza de la lista
  // (podría ser diferente de head si la cabeza original fue eliminada)
  return dummy.next
}
