# 2154. Keep Multiplying Found Values by Two

Se te da un arreglo de enteros **nums**. También se te da un entero **original**, que es el primer número que debe buscarse en `nums`.

Luego haces los siguientes pasos:

1. Si `original` se encuentra en `nums`, multiplícalo por dos (es decir, establece `original = 2 * original`).
2. De lo contrario, detén el proceso.
3. Repite este proceso con el nuevo número mientras sigas encontrando el número.

Retorna el **valor final** de `original`.

**Dificultad:** Easy

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums = [5,3,6,1,12]`, `original = 3`
- Salida: `24`
- Explicación:
  - `3` se encuentra en `nums`. `3` se multiplica por `2` para obtener `6`.
  - `6` se encuentra en `nums`. `6` se multiplica por `2` para obtener `12`.
  - `12` se encuentra en `nums`. `12` se multiplica por `2` para obtener `24`.
  - `24` NO se encuentra en `nums`. Por lo tanto, se retorna `24`.

**Ejemplo 2:**

- Entrada: `nums = [2,7,9]`, `original = 4`
- Salida: `4`
- Explicación:
  - `4` NO se encuentra en `nums`. Por lo tanto, se retorna `4`.

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Duplicar repetidamente el valor `original` mientras exista en el arreglo.
- **Insight clave**: Buscar el valor en el arreglo y duplicarlo hasta que no se encuentre.
- **Técnica**: Bucle while con verificación de existencia usando `includes()`.
- **Retos**: La solución naive con `includes()` es O(n) por iteración, pero para este problema es aceptable dado el tamaño de entrada.

La solución más directa es usar un bucle while que verifique si el valor actual existe en el arreglo y lo duplique hasta que ya no lo encuentre.

---

## 🔧 Implementación

```javascript
var findFinalValue = function (nums, original) {
    let value = original;

    // Mientras el valor actual se encuentre en el arreglo
    while (nums.includes(value)) {
        // Duplicar el valor
        value = value * 2;
    }

    return value;
};

console.log(findFinalValue([5,3,6,1,12], 3)); // 24

/**
 * Ejemplo paso a paso con nums = [5,3,6,1,12], original = 3:
 * 
 * Estado inicial: value = 3
 * 
 * Iteración 1:
 *   nums.includes(3)? → true ✓
 *   value = 3 * 2 = 6
 * 
 * Iteración 2:
 *   nums.includes(6)? → true ✓ (6 está en el arreglo)
 *   value = 6 * 2 = 12
 * 
 * Iteración 3:
 *   nums.includes(12)? → true ✓ (12 está en el arreglo)
 *   value = 12 * 2 = 24
 * 
 * Iteración 4:
 *   nums.includes(24)? → false ✗ (24 NO está en el arreglo)
 *   Salir del bucle
 * 
 * Retornar: value = 24
 * 
 * 
 * Ejemplo paso a paso con nums = [2,7,9], original = 4:
 * 
 * Estado inicial: value = 4
 * 
 * Iteración 1:
 *   nums.includes(4)? → false ✗
 *   Salir del bucle inmediatamente
 * 
 * Retornar: value = 4
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n × k), donde n es la longitud del arreglo y k es el número de duplicaciones (usualmente muy pequeño, máximo log de valor máximo).
- **Complejidad espacial**: O(1), solo usamos una variable auxiliar.
![rendimiento](./public/rendimiento.png)

*Para los límites del problema, esta solución es suficientemente eficiente.*

---

## 🔧 Detalles Técnicos Importantes

**Método `includes()`:**

```javascript
nums.includes(value)
```

Este método verifica si `value` existe en el arreglo `nums`. Internamente hace una búsqueda lineal O(n).

**¿Por qué funciona?**

El proceso es determinístico:
1. Si el valor actual está en el arreglo → duplicarlo
2. Si no está → detener y retornar
3. Como cada duplicación es exponencial (×2), el número de iteraciones es logarítmico respecto al valor máximo

**Número máximo de iteraciones:**

Para valores típicos, el número de duplicaciones es muy pequeño:
- `3 → 6 → 12 → 24 → 48 → ...` (5 duplicaciones para llegar a ~100)
- Incluso con `original = 1`, necesitarías ~10 duplicaciones para llegar a 1024

---

## 🎯 Aprendizajes Clave

- **Búsqueda repetida**: El método `includes()` es simple y directo para este problema.
- **Crecimiento exponencial**: Las duplicaciones limitan naturalmente el número de iteraciones.
- **Código limpio**: La solución con `while` + `includes()` es muy legible.
- **Trade-off**: Simplicidad vs eficiencia - para este problema, la simplicidad gana.

---

## 🔍 Casos Edge

- **Valor inicial no está**: `nums = [2,7,9]`, `original = 4` → `4`
- **Una duplicación**: `nums = [1,2]`, `original = 1` → `4` (1→2→4)
- **Sin duplicaciones**: `nums = [5,10]`, `original = 3` → `3`
- **Valor grande**: `nums = [1,2,4,8,16]`, `original = 1` → `32`
- **Array vacío**: `nums = []`, `original = 5` → `5`
- **Original es el máximo**: `nums = [1,2,3,4]`, `original = 4` → `8`

---

## 🧮 Ejemplos Adicionales

```javascript
[5,3,6,1,12], 3    → 24  (3→6→12→24)
[2,7,9], 4         → 4   (no está)
[1], 1             → 2   (1→2)
[1,2,4], 1         → 8   (1→2→4→8)
[10,20,30], 5      → 5   (no está)
[2,4,8,16], 2      → 32  (2→4→8→16→32)
```

---

## 🚀 Solución Optimizada con Set

Para mejorar la eficiencia de las búsquedas, podemos usar un Set:

```javascript
var findFinalValueOptimized = function(nums, original) {
    // Convertir el arreglo a Set para búsquedas O(1)
    const numSet = new Set(nums);
    let value = original;
    
    // Mientras el valor esté en el Set
    while (numSet.has(value)) {
        value = value * 2;
    }
    
    return value;
};
```

**Ventajas:**
- Búsqueda en O(1) en lugar de O(n)
- Complejidad total: O(n + k) donde k es el número de duplicaciones

**Complejidad:**
- Tiempo: O(n + k) donde k ≈ log(maxValue)
- Espacio: O(n) para el Set

---

## 🔬 Comparación de Enfoques

| Enfoque | Tiempo | Espacio | Legibilidad | Cuándo usar |
|---------|--------|---------|-------------|-------------|
| **includes()** (presentado) | O(n × k) | O(1) | ⭐⭐⭐⭐⭐ | Arrays pequeños, código simple |
| **Set** | O(n + k) | O(n) | ⭐⭐⭐⭐ | Arrays grandes, búsquedas frecuentes |

Para este problema con límites pequeños, ambas soluciones son aceptables.

---

## 💡 Variante: Límite de Seguridad

Si quieres evitar bucles infinitos teóricos:

```javascript
var findFinalValueSafe = function(nums, original) {
    let value = original;
    const maxIterations = 32; // 2^32 es más grande que cualquier int
    let iterations = 0;
    
    while (nums.includes(value) && iterations < maxIterations) {
        value = value * 2;
        iterations++;
    }
    
    return value;
};
```

Aunque en este problema no es necesario, es una buena práctica para evitar bucles infinitos accidentales.

---

## 🧠 Intuición del Problema

**¿Por qué el proceso termina?**

1. Los valores en `nums` son finitos
2. Cada duplicación lleva a un valor más grande
3. Eventualmente, el valor duplicado no estará en el arreglo
4. El crecimiento exponencial garantiza pocas iteraciones

**Visualización:**

```
nums = [1, 2, 4, 8, 16], original = 1

Paso 1: 1 está? ✓ → 1 × 2 = 2
Paso 2: 2 está? ✓ → 2 × 2 = 4
Paso 3: 4 está? ✓ → 4 × 2 = 8
Paso 4: 8 está? ✓ → 8 × 2 = 16
Paso 5: 16 está? ✓ → 16 × 2 = 32
Paso 6: 32 está? ✗ → Retornar 32
```

---

## 📚 Problemas Relacionados

Este problema es similar a:
- **Jump Game** (seguir un proceso hasta que no puedas continuar)
- **Happy Number** (seguir transformaciones hasta encontrar un patrón)
- **Climbing Stairs** (problemas con pasos repetitivos)

Todos comparten el patrón de seguir un proceso iterativo con una condición de parada.

---

## 🔢 Análisis Matemático

**Número máximo de iteraciones:**

Si el valor máximo en el arreglo es `M` y `original = 1`:
```
Iteraciones ≈ log₂(M)
```

Para `M = 1000`:
```
log₂(1000) ≈ 10 iteraciones
```

Esto confirma que el número de iteraciones es muy pequeño, haciendo que incluso la solución O(n × k) sea eficiente en la práctica.

---

## 🏷️ Tags

`Array` `Hash Table` `Simulation` `Easy`

---