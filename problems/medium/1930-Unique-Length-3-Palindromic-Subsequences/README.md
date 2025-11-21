# 1930. Unique Length-3 Palindromic Subsequences

Dada una cadena **s**, retorna el número de **palíndromos únicos de longitud 3** que son una subsecuencia de `s`.

Nota que incluso si hay múltiples formas de obtener la misma subsecuencia, solo se cuenta una vez.

Un **palíndromo** es una cadena que se lee igual hacia adelante y hacia atrás.

Una **subsecuencia** de una cadena es una nueva cadena generada de la cadena original eliminando algunos caracteres (puede ser ninguno) sin cambiar el orden relativo de los caracteres restantes.

Por ejemplo, `"ace"` es una subsecuencia de `"abcde"`.

**Dificultad:** Medium

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `s = "aabca"`
- Salida: `3`
- Explicación: Las 3 subsecuencias palindrómicas de longitud 3 son:
  - `"aba"` (subsecuencia de `"aabca"`)
  - `"aaa"` (subsecuencia de `"aabca"`)
  - `"aca"` (subsecuencia de `"aabca"`)

**Ejemplo 2:**

- Entrada: `s = "adc"`
- Salida: `0`
- Explicación: No hay subsecuencias palindrómicas de longitud 3 en `"adc"`.

**Ejemplo 3:**

- Entrada: `s = "bbcbaba"`
- Salida: `4`
- Explicación: Las 4 subsecuencias palindrómicas de longitud 3 son:
  - `"bbb"` (subsecuencia de `"bbcbaba"`)
  - `"bcb"` (subsecuencia de `"bbcbaba"`)
  - `"bab"` (subsecuencia de `"bbcbaba"`)
  - `"aba"` (subsecuencia de `"bbcbaba"`)

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Contar palíndromos únicos de longitud 3 en forma `XYX`.
- **Insight clave**: Un palíndromo de longitud 3 tiene la forma `c_c`, donde el primer y último carácter son iguales (`c`) y el del medio (`_`) puede ser cualquier carácter.
- **Técnica**: Para cada letra del alfabeto, encontrar su primera y última aparición, luego contar caracteres únicos entre esas posiciones.
- **Retos**: Asegurar que solo contamos palíndromos únicos y manejar casos donde la letra aparece solo una vez.

La solución elegante aprovecha que solo hay 26 letras posibles, permitiendo iterar sobre cada una y contar los palíndromos que puede formar.

---

## 🔧 Implementación

```javascript
var countPalindromicSubsequence = function (s) {
    let res = 0;

    // Iterar sobre las 26 letras del alfabeto
    for (let c = 0; c < 26; c++) {
        // Convertir número a letra: 0→'a', 1→'b', ..., 25→'z'
        let letter = String.fromCharCode(97 + c);

        // Encontrar la primera aparición de esta letra
        let left = s.indexOf(letter);
        
        // Encontrar la última aparición de esta letra
        let right = s.lastIndexOf(letter);

        // Si la letra no existe o aparece solo una vez, continuar
        if (left === -1 || right === left) continue;

        // Set para rastrear caracteres únicos entre left y right
        let middle = new Set();

        // Contar todos los caracteres únicos entre left y right
        for (let i = left + 1; i < right; i++) {
            middle.add(s[i]);
        }

        // Cada carácter único en el medio forma un palíndromo único
        res += middle.size;
    }

    return res;
};

console.log(countPalindromicSubsequence("aabca")); // 3

/**
 * Ejemplo paso a paso con s = "aabca":
 * Índices:  0 1 2 3 4
 * Cadena:  "a a b c a"
 * 
 * Iterar sobre cada letra del alfabeto (a-z):
 * 
 * Letra 'a' (c=0):
 *   left = s.indexOf('a') = 0
 *   right = s.lastIndexOf('a') = 4
 *   left !== right ✓ → Procesar
 *   
 *   Caracteres entre posiciones 0 y 4 (índices 1, 2, 3):
 *   i=1: s[1]='a' → middle.add('a')
 *   i=2: s[2]='b' → middle.add('b')
 *   i=3: s[3]='c' → middle.add('c')
 *   
 *   middle = {'a', 'b', 'c'} → size = 3
 *   res += 3 → res = 3
 *   
 *   Palíndromos formados: "aaa", "aba", "aca"
 * 
 * Letra 'b' (c=1):
 *   left = s.indexOf('b') = 2
 *   right = s.lastIndexOf('b') = 2
 *   left === right ✗ → Saltar (solo aparece una vez)
 * 
 * Letra 'c' (c=2):
 *   left = s.indexOf('c') = 3
 *   right = s.lastIndexOf('c') = 3
 *   left === right ✗ → Saltar
 * 
 * Letras 'd'-'z' (c=3-25):
 *   left = -1 (no existen) → Saltar
 * 
 * Resultado final: res = 3
 * 
 * 
 * Ejemplo paso a paso con s = "bbcbaba":
 * Índices:  0 1 2 3 4 5 6
 * Cadena:  "b b c b a b a"
 * 
 * Letra 'a' (c=0):
 *   left = 4, right = 6
 *   Caracteres entre [5, 6): s[5]='b'
 *   middle = {'b'} → size = 1
 *   res += 1 → res = 1
 *   Palíndromo: "aba"
 * 
 * Letra 'b' (c=1):
 *   left = 0, right = 5
 *   Caracteres entre [1, 5): s[1]='b', s[2]='c', s[3]='b', s[4]='a'
 *   middle = {'b', 'c', 'a'} → size = 3
 *   res += 3 → res = 4
 *   Palíndromos: "bbb", "bcb", "bab"
 * 
 * Letra 'c' (c=2):
 *   left = 2, right = 2
 *   left === right → Saltar
 * 
 * Resultado final: res = 4
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(26 × n) = O(n), donde n es la longitud de la cadena.
  - Iteramos 26 letras (constante)
  - Para cada letra, recorremos la cadena una vez en el peor caso
- **Complejidad espacial**: O(26) = O(1), para el Set que almacena caracteres únicos.
  - El Set puede tener máximo 26 caracteres
  ![rendimiento](./public/rendimiento.png)

*Esta solución es eficiente para cadenas largas gracias a que iteramos sobre un alfabeto de tamaño fijo.*

---

## 🔧 Detalles Técnicos Importantes

**Estructura de un Palíndromo de Longitud 3:**

```
Formato: c _ c
         ↑ ↑ ↑
         │ │ └─ Mismo carácter que el primero
         │ └─── Carácter del medio (puede ser cualquiera)
         └───── Carácter externo
```

**¿Por qué `indexOf` y `lastIndexOf`?**

```javascript
let left = s.indexOf(letter);   // Primera aparición
let right = s.lastIndexOf(letter); // Última aparición
```

Estos métodos nos dan el rango máximo donde podemos formar palíndromos con esta letra como extremos:
- `left`: Posición más temprana de la letra
- `right`: Posición más tardía de la letra
- Entre `left` y `right`: todos los posibles caracteres del medio

**¿Por qué usar un Set?**

```javascript
let middle = new Set();
```

El Set garantiza que solo contamos cada carácter único una vez, evitando duplicados. Por ejemplo, en `"aabaa"`:
- Entre las 'a' externas: tenemos 'a', 'b', 'a'
- Set: {'a', 'b'} → 2 palíndromos únicos: "aaa", "aba"

**Código para generar letra:**

```javascript
let letter = String.fromCharCode(97 + c);
// c=0  → 97+0  = 97  → 'a'
// c=1  → 97+1  = 98  → 'b'
// c=25 → 97+25 = 122 → 'z'
```

---

## 🎯 Aprendizajes Clave

- **Reducción del problema**: En lugar de generar todas las subsecuencias, analizamos el patrón.
- **Iteración sobre alfabeto**: Con solo 26 letras, es eficiente iterar sobre todas.
- **Uso de Set**: Garantiza unicidad sin necesidad de verificaciones adicionales.
- **Rango de búsqueda**: `indexOf` y `lastIndexOf` definen el espacio de búsqueda óptimo.

---

## 🔍 Casos Edge

- **Sin repeticiones**: `"abc"` → `0` (ninguna letra se repite)
- **Una letra repetida**: `"aba"` → `1` (solo "aba")
- **Todas iguales**: `"aaaa"` → `1` (solo "aaa", múltiples formas pero único)
- **Dos letras**: `"abab"` → `2` ("aba", "bab")
- **Letra al inicio y fin**: `"abcda"` → `3` ("aba", "aca", "ada")
- **String vacío**: `""` → `0`
- **Un carácter**: `"a"` → `0`

---

## 🧮 Ejemplos Adicionales

```javascript
"aabca"     → 3   ("aaa", "aba", "aca")
"adc"       → 0   (ninguna letra se repite)
"bbcbaba"   → 4   ("bbb", "bcb", "bab", "aba")
"aaa"       → 1   (solo "aaa")
"abcabc"    → 3   ("aba", "aca", "bcb")
"xyz"       → 0   (ninguna repetición)
```

---

## 🚀 Solución Alternativa: Con Bitmask

Para optimizar aún más el espacio, podemos usar un bitmask en lugar de Set:

```javascript
var countPalindromicSubsequenceOptimized = function(s) {
    let res = 0;
    
    for (let c = 0; c < 26; c++) {
        let letter = String.fromCharCode(97 + c);
        let left = s.indexOf(letter);
        let right = s.lastIndexOf(letter);
        
        if (left === -1 || right === left) continue;
        
        // Usar bitmask en lugar de Set
        let mask = 0;
        
        for (let i = left + 1; i < right; i++) {
            let charCode = s.charCodeAt(i) - 97;
            mask |= (1 << charCode);
        }
        
        // Contar bits activados
        res += countBits(mask);
    }
    
    return res;
};

function countBits(n) {
    let count = 0;
    while (n) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}
```

**Ventajas:**
- Espacio: O(1) en lugar de O(26)
- Operaciones bit a bit son más rápidas
- Mismo tiempo asintótico

---

## 🔬 Comparación de Enfoques

| Enfoque | Tiempo | Espacio | Legibilidad | Cuándo usar |
|---------|--------|---------|-------------|-------------|
| **Set** (presentado) | O(26n) | O(26) | ⭐⭐⭐⭐⭐ | Siempre (más claro) |
| **Bitmask** | O(26n) | O(1) | ⭐⭐⭐ | Optimización de espacio |
| **Brute Force** | O(n³) | O(n³) | ⭐⭐ | Solo para entender el problema |

---

## 💡 Visualización del Algoritmo

Para `s = "aabca"`:

```
Cadena: a a b c a
        ↑       ↑
      left    right
      (0)     (4)

Caracteres del medio (índices 1, 2, 3):
  a, b, c

Palíndromos formados con 'a' en los extremos:
  a-a-a  ✓
  a-b-a  ✓
  a-c-a  ✓

Total: 3 palíndromos únicos
```

Para `s = "bbcbaba"`:

```
Letra 'b':
  b b c b a b a
  ↑         ↑
left(0)  right(5)

Medio: b, c, b, a → únicos: {b, c, a}
Palíndromos: b-b-b, b-c-b, b-a-b

Letra 'a':
  b b c b a b a
          ↑   ↑
       left(4) right(6)

Medio: b → únicos: {b}
Palíndromos: a-b-a

Total: 3 + 1 = 4
```

---

## 🧠 Intuición del Problema

**¿Por qué este enfoque funciona?**

Para formar un palíndromo de longitud 3:
1. Necesitamos encontrar dos posiciones con el mismo carácter
2. Cualquier carácter entre ellas puede ser el del medio
3. Cada carácter único del medio forma un palíndromo único

**Ejemplo conceptual:**
```
Si tenemos: a _ _ _ a
                ↑
         Cualquier carácter aquí forma un palíndromo único
         Si hay 'b', 'c', 'd' en el medio → 3 palíndromos
```

**¿Por qué no necesitamos enumerar todas las subsecuencias?**

Porque solo nos importa:
- ¿Qué letra está en los extremos? (26 opciones)
- ¿Qué caracteres únicos están en el medio? (Set lo maneja)

No importa cuántas veces aparece cada carácter del medio, solo si aparece al menos una vez.

---

## 🏷️ Tags

`Hash Table` `String` `Bit Manipulation` `Prefix Sum` `Medium`

---