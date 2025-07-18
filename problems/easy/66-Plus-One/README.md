# 66. Plus One

## 🧠 Descripción

Se te da un número entero grande representado como un array `digits`, donde cada `digits[i]` representa un dígito. Los dígitos están ordenados del más significativo al menos significativo de izquierda a derecha. No hay ceros a la izquierda.

Incrementa el número en 1 y devuelve el array resultante.

---

## 📋 Ejemplos

### Ejemplo 1:
```
Input: digits = [1,2,3]
Output: [1,2,4]
```

### Ejemplo 2:
```
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
```

### Ejemplo 3:
```
Input: digits = [9]
Output: [1,0]
```

---

## 💭 Estrategia y Enfoque

Al principio, pensé en resolverlo convirtiendo el número a string, sumándole 1, y luego convirtiéndolo nuevamente en array. Aquí dejo esa versión inicial que hice al comenzar con LeetCode. Aunque no es la solución más eficiente, el valor está en intentar resolverlo uno mismo.

---

## 🛠️ Primera Solución (Usando `BigInt`)

```js
// En su momento se me habria ocurrido esta solucion cuando empece en leetcode, la cual dare una breve explicacion a medias, no es el mejor codigo claro pero lo importante es intentar hacer el ejercicio por su cuenta, ese codigo es de cuando practicaba antes de ahora
const plusOne = function (digits) {
  const bigin = BigInt(digits.join('')).toString().split('') // Convertimos el array en un string o mas bien los numeros

  if (digits[digits.length - 1] !== 9) { // Este if lo que hace es comprobar si el ultimo numero es menor a 9
    bigin.forEach((elem, index) => { // Ahora simplemente lo que haremos es iterar y comprobar que el index sea igual a el ultimo index de digits y si no simplemente lo trasformamos a un numero
      if (index === digits.length - 1) {
        digits[index] = Number(elem) + 1
      } else {
        digits[index] = Number(elem)
      }
    })
    return digits
  }

  for (let j = digits.length - 1; j >= 0; j--) { // Si llega hasta aqui, quiere decir que el numero es 9
    let r = j
    if (digits[j] === 9 && j !== 0) { // Si el numero es 9 y ademas el indice no es 0 entonces lo cambiamos por 0
      digits[j] = 0
    } else if (Number(digits[j]) + 1 === 10 && j === 0) { // Entonces suponiendo que es el ultimo numero del array o mas bien el primero por que vamos de atras para delante, lo que hace es comprobar si ese numero es 10, para asi poder agregar 2 valores el 1 y el 0 detras simulando el 10
      digits[j] = 1
      digits.push(0)
    } else {
      digits[j] = Number(digits[r]) + 1 // Si el valor llega hasta aqui quiere decir que el valor puede ser 9 o algun otro numero y se le aumenta 1, si no entrara al while y lo convertira en un numero
      while (r - 1 >= 0 && Number(digits[r] !== 9)) {
        digits[r] = Number(digits[r])
        r--
      }
      return digits
    }
  }
  return digits
}

console.log(plusOne([9, 9, 9]))
```

---

## 💡 Segunda Solución (Eficiente y Limpia)

```js
// Este codigo es el mas efeciente claro por debajo de algunos otros matemticos
const plusOne2 = function (digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    // Si el dígito es menor que 9, simplemente sumamos 1 y terminamos
    if (digits[i] < 9) {
      digits[i]++
      return digits
    }

    // Si es 9, lo convertimos en 0 y seguimos al dígito anterior
    digits[i] = 0
  }

  // Si llegamos aquí, todos eran 9 (ej. [9,9,9] -> [1,0,0,0])
  digits.unshift(1)
  return digits
}

console.log(plusOne2([9, 9, 9]))
```

---

## 📊 Análisis de Rendimiento

| Versión         | Complejidad | Notas                     |
|------------------|-------------|----------------------------|
| `BigInt`         | O(n)        | Fácil de escribir pero menos eficiente y no soportado en todos los entornos |
| `Optimizada`     | O(n)        | Más rápida y sin conversiones innecesarias |


![rendimiento](./public/rendimiento.png)
---

## 🎯 Aprendizajes Clave

- A veces una idea simple como usar `BigInt` puede resolver el problema, pero no es lo más óptimo ni portable.
- Entender cómo propagar el acarreo (`carry`) de derecha a izquierda permite resolver el problema sin conversiones.
- Siempre vale la pena reescribir tu solución inicial con una mente más clara después de entender bien el problema.

---

## 🏷️ Etiquetas

`Array` `Math` 

---

**Tiempo invertido**: Nothing  
**Intentos**: 1  
**Dificultad percibida**: Fácil
