# 125. Valid Palindrome

Una frase es un palíndromo si, después de convertir todas las letras mayúsculas en minúsculas y eliminar todos los caracteres no alfanuméricos, se lee igual de izquierda a derecha y de derecha a izquierda. Los caracteres alfanuméricos incluyen letras y números.

Dado un string `s`, retorna `true` si es un palíndromo, o `false` en caso contrario.

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `s = "A man, a plan, a canal: Panama"`
- Salida: `true`
- Explicación: `"amanaplanacanalpanama"` es un palíndromo.

**Ejemplo 2:**

- Entrada: `s = "race a car"`
- Salida: `false`
- Explicación: `"raceacar"` no es un palíndromo.

**Ejemplo 3:**

- Entrada: `s = " "`
- Salida: `true`
- Explicación: Tras limpiar, la cadena queda vacía y se considera palíndromo.

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Verificar si la cadena es un palíndromo ignorando mayúsculas y caracteres no alfanuméricos.
- **Restricción**: Solo considerar letras y números, ignorar espacios y símbolos.
- **Salida**: `true` si es palíndromo, `false` si no.

La estrategia óptima es limpiar la cadena y usar dos punteros para comparar los extremos.

---

## 🔧 Implementación

```js
const isPalindrome = function (s) {
  if (s === '') return true // Si está vacío es palíndromo
  s = s.toLowerCase() // Convertimos a minúsculas
  let letter = ''
  for (let i = 0; i < s.length; i++) {
    const num = s[i].charCodeAt(0) >= 48 && s[i].charCodeAt(0) <= 57 // Solo números
    const str = s[i].charCodeAt(0) <= 122 && s[i].charCodeAt(0) >= 97 // Solo letras
    if (num || str) letter += s[i] // Unimos los caracteres válidos
  }
  return letter === letter.split('').reverse().join('') // Comparamos normal y reversa
}

console.log(isPalindrome('A man, a plan, a canal: Panama')) // true
console.log(isPalindrome('race a car')) // false
console.log(isPalindrome(' ')) // true
console.log(isPalindrome('ab_a')) // true
```

---

> **Nota:** También se puede limpiar la cadena usando expresiones regulares:
>
> ```js
> s = s.toLowerCase().replace(/[^a-z0-9]/g, '') // Limpiamos la cadena
> ```

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n), donde n es la longitud de la cadena.
- **Complejidad espacial**: O(n), por la cadena limpia.

![rendimiento](./public/rendimiento.png)

---

## 🎯 Aprendizajes Clave

- Limpiar la cadena antes de comparar es esencial para problemas de palíndromos.
- El uso de dos punteros permite comparar extremos de forma eficiente.
- Las cadenas vacías se consideran palíndromos por definición.

---

## 🏷️ Tags

`Two Pointers` `String` `Easy`

---

**Tiempo invertido**: 3 minutos  
**Intentos**: 2
**Dificultad percibida**: Fácil