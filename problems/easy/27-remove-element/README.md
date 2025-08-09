
# 27. Remove Element

Dado un array de enteros `nums` y un entero `val`, elimina todas las ocurrencias de `val` en `nums` **in-place**. El orden de los elementos puede cambiar. Devuelve el número de elementos en `nums` que no son iguales a `val`.

---

## Descripción

Considera que el número de elementos en `nums` que no son iguales a `val` es `k`. Para que la solución sea aceptada, debes:

- Cambiar el array `nums` de modo que los primeros `k` elementos contengan los elementos que no son iguales a `val`.
- Los elementos más allá de la posición `k` no importan.
- Retornar `k`.



## Código del juez personalizado


int[] nums = [...]; // Array de entrada
int val = ...;      // Valor a eliminar
int[] expectedNums = [...]; // Respuesta esperada con longitud correcta.
// Está ordenada sin valores iguales a val.

int k = removeElement(nums, val); // Llama a tu implementación

assert k == expectedNums.length;
sort(nums, 0, k); // Ordena los primeros k elementos de nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}


Si todas las aserciones pasan, la solución será aceptada.

---

## 📋 Ejemplos

### Ejemplo 1:

Entrada:
`nums = [3, 2, 2, 3], val = 3`
Salida:
`2, nums = [2, 2, _, _]`
Explicación:
La función debe retornar `k = 2`, y los primeros dos elementos del array deben ser `2`. No importa lo que quede después de `k`.

---

### Ejemplo 2:

Entrada:
`nums = [0, 1, 2, 2, 3, 0, 4, 2], val = 2`
Salida:
`5, nums = [0, 1, 4, 0, 3, _, _, _]`
Explicación:
La función debe retornar `k = 5`, y los primeros cinco elementos deben contener los números `0, 0, 1, 3, 4` en cualquier orden.

---

## 💭 Enfoque y Estrategia

* Utilizar un puntero `k` para mantener la posición donde colocar los elementos que no son iguales a `val`.
* Recorrer el array con otro puntero `i`.
* Cada vez que encontramos un elemento diferente de `val`, lo colocamos en la posición `k` y aumentamos `k`.
* Al final, `k` indicará el número de elementos válidos y la posición hasta donde los elementos están actualizados.

---

## 🔧 Implementación

```js
const removeElement = function (nums, val) {
  let k = 0; // Puntero para la posición de los elementos válidos
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i]; // Colocamos el elemento válido en la posición k
      k++;
    }
  }
  return k;
};
```



## 📌 Observaciones sobre el código

* `k` indica la posición para colocar el siguiente elemento válido.
* Se modifica el array original `nums` **in-place**.
* El orden relativo de los elementos puede cambiar.
* Los elementos más allá de `k` no tienen importancia.

---

## 🔎 Línea por línea — explicación detallada

```js
const removeElement = function (nums, val) {
```

Declara la función que recibe el array `nums` y el valor `val`.

```js
  let k = 0; 
```

Inicializa el puntero `k` para la posición donde pondremos los elementos distintos a `val`.

```js
  for (let i = 0; i < nums.length; i++) {
```

Recorre cada índice `i` del array.

```js
    if (nums[i] !== val) {
```

Si el elemento actual no es igual a `val`...

```js
      nums[k] = nums[i];
      k++;
```

... lo copiamos a la posición `k` y aumentamos `k`.

```js
    }
  }
  return k;
};
```

Al final retorna `k`, el número de elementos que no son `val`.

---

## 🧪 Ejemplos con código

```js
const nums1 = [3, 2, 2, 3];
console.log(removeElement(nums1, 3), nums1); 
// Output: 2, [2, 2, 2, 3] (los dos primeros son válidos)

const nums2 = [0, 1, 2, 2, 3, 0, 4, 2];
console.log(removeElement(nums2, 2), nums2); 
// Output: 5, [0, 1, 3, 0, 4, ..., ...] (los primeros cinco son válidos)
```

---

## 📊 Análisis de Rendimiento

* Complejidad temporal: O(n), donde n es el tamaño del array `nums`. Solo se recorre una vez.
* Complejidad espacial: O(1), se modifica el array en sitio sin usar espacio adicional significativo.

---

## 🎯 Aprendizajes Clave

* Uso eficiente de un puntero para modificar arrays in-place.
* No es necesario mantener el orden exacto de los elementos que permanecen.
* La técnica de "dos punteros" es común para problemas similares de modificación de arrays.

---

## 🏷️ Tags

Array | Two Pointers | Easy | In-Place

---

## ⏱️ Tiempo invertido

20m

---

## 🔄 Intentos

2

---

## 💡 Dificultad percibida

Fácil


