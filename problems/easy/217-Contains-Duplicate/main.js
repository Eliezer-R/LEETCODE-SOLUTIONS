const containsDuplicate = function (nums) {
  const window = new Set() // Creamos un Set para almacenar los elementos únicos

  // Recorremos el array nums
  for (let i = 0; i < nums.length; i++) {
    // Si el elemento ya está en el Set, hay duplicado y retornamos true
    if (window.has(nums[i])) return true

    // Si no está, lo agregamos al Set
    window.add(nums[i])
  }

  // Si terminamos el ciclo sin encontrar duplicados, retornamos false
  return false
}

console.log(containsDuplicate([1, 2, 3, 1])) // true

/**
 * Ejemplo paso a paso con nums = [1, 2, 3, 1]:
 * i=0: window = {}. No está 1, lo agrego → window = {1}
 * i=1: window = {1}. No está 2, lo agrego → window = {1,2}
 * i=2: window = {1,2}. No está 3, lo agrego → window = {1,2,3}
 * i=3: window = {1,2,3}. Ya está 1, retorna true
 */
