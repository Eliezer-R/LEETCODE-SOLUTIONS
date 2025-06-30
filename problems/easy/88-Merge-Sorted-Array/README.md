# 88. Merge Sorted Array

Se te dan dos arrays de enteros `nums1` y `nums2`, ordenados en orden no decreciente, y dos enteros `m` y `n`, que representan la cantidad de elementos en `nums1` y `nums2` respectivamente.

Debes fusionar `nums1` y `nums2` en un solo array ordenado en orden no decreciente. El resultado debe almacenarse dentro de `nums1`. Para esto, `nums1` tiene una longitud de `m + n`, donde los primeros `m` elementos son los que deben fusionarse y los últimos `n` elementos están inicializados en 0 y deben ser ignorados. `nums2` tiene longitud `n`.

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums1 = [1,2,3,0,0,0]`, `m = 3`, `nums2 = [2,5,6]`, `n = 3`
- Salida: `[1,2,2,3,5,6]`
- Explicación: Se fusionan `[1,2,3]` y `[2,5,6]` en `[1,2,2,3,5,6]`.

**Ejemplo 2:**

- Entrada: `nums1 = [1]`, `m = 1`, `nums2 = []`, `n = 0`
- Salida: `[1]`
- Explicación: Solo hay un elemento en `nums1` y ninguno en `nums2`.

**Ejemplo 3:**

- Entrada: `nums1 = [0]`, `m = 0`, `nums2 = [1]`, `n = 1`
- Salida: `[1]`
- Explicación: No hay elementos en `nums1`, solo en `nums2`.

---

## 💭 Enfoque y Estrategia

Existen varias formas de fusionar dos arrays ordenados en uno solo, manteniendo el orden y almacenando el resultado en `nums1`:

- **merge1**: Copia los elementos de `nums2` al final de `nums1` y luego ordena todo el array usando `sort`. Es simple pero menos eficiente.
- **merge2**: Inserta los elementos de `nums2` uno a uno en `nums1` usando un algoritmo similar a insertion sort para mantener el orden. Es más eficiente que ordenar todo, pero aún puede ser lento para arrays grandes.
- **merge3**: Utiliza tres punteros para recorrer ambos arrays desde el final, insertando los elementos más grandes al final de `nums1`. Este método es el más eficiente y evita sobrescribir datos importantes.

**Recomendación:** Usar el método de tres punteros (`merge3`) para lograr una complejidad O(m + n) y espacio

---

## 🔧 Implementaciónes

```js
const merge1 = function (nums1, m, nums2, n) {
  let pont = 0 // Inicializamos un puntero
  for (let i = m; i < m + n; i++) { // Iteramos desde i que en este caso es 3 hasta m + n que es 6
    nums1[i] = nums2[pont] // Ahora simplemte ponemos los numeros en donde empiezan los ceros
    pont++ // Aumentamos el puntero para poder avanzar en el segundo array osea nums2
  }

  return nums1.sort((a, b) => a - b) // Retornamos no sin antes hacer un sort
}

console.log(merge1([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))

const merge2 = function (nums1, m, nums2, n) {
  let pont = m // Primer puntero
  let pont2 = 0 // Segundo puntero

  while (pont < (m + n)) { // Lo que haremos aqui es que si el puntero es menor a m + n osea 6 que es la longitud del array, entonces para
    nums1[pont] = nums2[pont2] // Aca simplemte introducimos un numero al array nums1 en la posicion 3 la cual seria el primer 0 del array
    let index = pont - 1 // Inicializamos un index ya que usaremos el algoritmo Insertion Sort

    while (index >= 0 && nums1[index] > nums2[pont2]) { // Aqui lo que hace es comparar si por ejemplo el numero de delante del cero que es 3 es mayor a 2 del primer array
      nums1[index + 1] = nums1[index] // Ahora ese numero va ser igual a 3 el array quedaria asi [1,2,3,3,0,0]
      index-- // Luego restamos a index para poder seguir comprobando si el que esta delante del 3 que es 2 es mayor
    }

    nums1[index + 1] = nums2[pont2] // Al final del algoritmo insertion sort quedaria asi [1,2,3,3,0,0] pero con esta linea
    // Quedaria asi [1,2,2,3,0,0] ya que lo que hacemos es en la posicion donde esta el antiguo 3 ponemos el numero 2 de nums2[pont2]
    pont++ // Aumentamos el primer puntero y segundo
    pont2++
  }
  return nums1 // Retornamos
}

// Pequeño ejemplo de como se ira viendo el array mediante pasa por los whiles

/**  Primer while
 * nums1[pont] = nums2[pont2] Gracias a esta linea se vera asi [1,2,3,2,0,0]
 * Segundo while
 * nums1[index + 1] = nums1[index] Gracias a esta linea [1,2,3,3,0,0]
 * Luego salimos del primero ya que la segunda iteracion no se cumple por que 2 no es menor a 2
 * al final cracias a esta linea nums1[index + 1] = nums2[pont2]
 * el array quedaria asi [1,2,2,3,0,0]
*/

console.log(merge2([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))

const merge3 = function (nums1, m, nums2, n) {
  let i = m - 1 // Inicializamos 3 punteros, uno para movernos en el primer array, el otro para el otro array y el tercero sera la posicion en donde ira el numero que en este caso seria m + n - 1 osea 3 + 3 - 1 igual a 5 la posicion 5 del array
  let j = n - 1
  let k = m + n - 1

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) { // Si la posicion nums1[i] que es igual a 3 en el array nums1 entonces es mayor a el numero nums2[j] igual a 6 del segundo array
      nums1[k] = nums1[i] // Si es asi en la posicion numero k = 5 que es 0 osea la ultima posicion del primer array, lo asignamos a esa posicion
      i-- // Y decrementamos i para que podamos compara con el siguiente numero
    } else {
      nums1[k] = nums2[j] // Si no pues simplemente asignamos la posicion nums1[k] la ultima posicion de nums1 a nums2 que en este caso seria 6
      j-- //  decrementamos j para que podamos compara con el siguiente numero
    }
    k-- // Decrementamos k ya que la posicion en donde asignamos el valor/numero ya esta lleno
  }

  while (j >= 0) { // Aqui esta el truco, en el caso de que j sea mayor o igual a 0 quiere decir que hubieron mas numero mayores de parte de nums[2]
    nums1[k] = nums2[j] // Ahora simplemnte en las posiciones donde se repiten algunos numeros, ponemos sus respectivos numero
    j-- // Y vamos decrementando
    k--
  }
}

console.log(merge3([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3))

// Pequeño ejemplo de como se ira viendo el array mediante pasa por los whiles

/**  Primera iteracion del primer while
 *   if nums1[i] = 3 > nums2[j] = 6 (No) pasamos al else y asignamos la posicion de nums2[j] en nums1[k]
 *  asi se vera el array = [1,2,3,0,0,6]
 * le restamos 1 a j-- y tambien a k--
 *
 * Segunda iteracion del primer while
 * if nums1[i] = 3 > nums2[j] = 5 (No) pasamos al else y asignamos la posicion de nums2[j] en nums1[k]
 * asi se vera el array = [1,2,3,0,5,6]
 * le restamos 1 otra mas  a j-- y tambien a k--
 *
 * Tercera iteracion del primer while
 * if nums1[i] = 3 > nums2[j] = 2 (Si)
 * asi se vera el array = [1,2,3,3,5,6] ya que i = 2 del array nums1 osea que nums1[i] = 3 y asignamos esa posicion  a nums1[k]
 * le restamos 1 a i-- y tambien a k--
 *
 * Cuarta iteracion del primer while
 * if nums1[i] = 2 > nums2[j] = 2 (No) pasamos al else y asignamos la posicion de nums2[j] en nums1[k]
 * asi se vera el array = [1,2,2,3,5,6]
 * Terminamos con el primer while ya que j es -1
 * Y no llegamos al segundo por lo mismo
 *
 * resultado = [1,2,2,3,5,6]
*/

```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**:
  - `merge1`: O((m + n) log(m + n)) por el uso de sort.
  - `merge2`: O((m + n)^2) por el uso de insertion sort en cada inserción.
  - `merge3`: O(m + n) por recorrer ambos arrays una sola vez desde el final.
- **Complejidad espacial**: O(1) en las tres implementaciones, ya que la fusión se hace en el mismo array.
- Rendimiento del merge3:
- 
![rendimiento](./public/rendimiento.png)
---

## 🎯 Aprendizajes Clave

- Usar tres punteros permite fusionar desde el final sin sobrescribir datos.
- Si quedan elementos en `nums2`, se copian al inicio de `nums1`.
- El enfoque es eficiente y directo para arrays ordenados.

---

## 🏷️ Tags

`Array` `Two Pointers` `Sorting` `Easy`

---

**Tiempo invertido**: 5 minutos  
**Intentos**: 1
