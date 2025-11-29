# 3512. Minimum Operations to Make Array Sum Divisible by K

Se te da un arreglo de enteros **nums** y un entero **k**.

Puedes realizar la siguiente operación cualquier número de veces:
- Selecciona un índice **i** y reemplaza `nums[i]` con `nums[i] - 1`.

Retorna el **número mínimo de operaciones** requeridas para hacer que la suma del arreglo sea divisible por **k**.

**Dificultad:** Easy

---

## 📋 Ejemplos

**Ejemplo 1:**

- Entrada: `nums = [3,9,7]`, `k = 5`
- Salida: `4`
- Explicación: Realizamos 4 operaciones en `nums[1] = 9`. Ahora `nums = [3, 5, 7]`. La suma es 15, que es divisible por 5.

**Ejemplo 2:**

- Entrada: `nums = [4,1,3]`, `k = 4`
- Salida: `0`
- Explicación: La suma es 8, que ya es divisible por 4. Por lo tanto, no se necesitan operaciones.

**Ejemplo 3:**

- Entrada: `nums = [3,2]`, `k = 6`
- Salida: `5`
- Explicación: Realizamos 3 operaciones en `nums[0] = 3` y 2 operaciones en `nums[1] = 2`. Ahora `nums = [0, 0]`. La suma es 0, que es divisible por 6.

---

## 💭 Enfoque y Estrategia

- **Objetivo**: Hacer que la suma del arreglo sea divisible por k con el mínimo número de operaciones de decremento.
- **Insight clave**: Si la suma actual es `S` y su resto al dividir por k es `r`, necesitamos exactamente **r operaciones** para hacer la suma divisible por k.
- **Técnica**: Calcular `sum(nums) % k` directamente.
- **Retos**: Ninguno, el problema es extremadamente directo una vez que entiendes la propiedad matemática.

La solución es elegantemente simple: el resto de la suma nos dice exactamente cuántas operaciones necesitamos.

---

## 🔧 Implementación

```javascript
var minOperations = function (nums, k) {
    // Calcular la suma total del arreglo
    const sum = nums.reduce((acc, n) => acc + n, 0);
    
    // El número de operaciones es simplemente el resto
    return sum % k;
};

console.log(minOperations([3,9,7], 5)); // 4

/**
 * Ejemplo paso a paso con nums = [3,9,7], k = 5:
 * 
 * Paso 1: Calcular suma
 *   sum = 3 + 9 + 7 = 19
 * 
 * Paso 2: Calcular resto
 *   resto = 19 % 5 = 4
 * 
 * Resultado: 4 operaciones
 * 
 * Explicación:
 * La suma actual es 19.
 * Para hacerla divisible por 5, necesitamos llegar a 15 (o 10, o 20, etc.)
 * El múltiplo de 5 más cercano por debajo es 15.
 * 19 - 15 = 4 operaciones necesarias.
 * 
 * Una forma de hacerlo: decrementar nums[1] cuatro veces: 9→8→7→6→5
 * Nueva suma: 3 + 5 + 7 = 15 ✓
 * 
 * 
 * Ejemplo con nums = [4,1,3], k = 4:
 * 
 * sum = 4 + 1 + 3 = 8
 * resto = 8 % 4 = 0
 * 
 * Resultado: 0 operaciones
 * 
 * Explicación: La suma ya es divisible por 4.
 * 
 * 
 * Ejemplo con nums = [3,2], k = 6:
 * 
 * sum = 3 + 2 = 5
 * resto = 5 % 6 = 5
 * 
 * Resultado: 5 operaciones
 * 
 * Explicación:
 * Necesitamos llegar a 0 (múltiplo de 6 más cercano).
 * 5 - 0 = 5 operaciones.
 * Podemos hacer: 3→2→1→0, 2→1→0 (total 5 operaciones)
 */
```

---

## 📊 Análisis de Rendimiento

- **Complejidad temporal**: O(n), para calcular la suma del arreglo.
- **Complejidad espacial**: O(1), solo usamos variables auxiliares.
![rendimiento](./public/rendimiento.png)

*Esta solución es óptima ya que necesitamos examinar cada elemento al menos una vez para calcular la suma.*

---

## 🔧 Detalles Técnicos Importantes

**Propiedad Matemática Fundamental:**

Para hacer que una suma `S` sea divisible por `k`:
```
Si S % k = r (donde 0 ≤ r < k)

Opciones:
1. Decrementar la suma en r → S - r es divisible por k
2. Incrementar la suma en (k - r) → S + (k - r) es divisible por k

Como solo podemos decrementar (restar 1), 
el mínimo es siempre: r operaciones
```

**Ejemplo visual:**

```
Múltiplos de k:  ... 10  15  20  25  30 ...
                       ↑       ↑
Suma actual = 19      15      20

Distancia a 15: 19 - 15 = 4 ← MÍNIMO
Distancia a 20: 20 - 19 = 5

Por lo tanto, el mínimo es 4 (el resto).
```

**¿Por qué no usar `(k - (sum % k)) % k`?**

Esa fórmula funcionaría si pudiéramos incrementar, pero como **solo podemos decrementar**, la respuesta es simplemente `sum % k`.

**Método `reduce()`:**

```javascript
const sum = nums.reduce((acc, n) => acc + n, 0);
```

Este método recorre el arreglo acumulando la suma:
- `acc`: Acumulador (suma hasta ahora)
- `n`: Elemento actual
- `0`: Valor inicial del acumulador

---

## 🎯 Aprendizajes Clave

- **Propiedad modular**: El resto directamente nos da la respuesta.
- **Simplicidad matemática**: A veces la solución más simple es la correcta.
- **Operaciones asimétricas**: Solo poder decrementar simplifica el problema.
- **No necesitamos simular**: Calcular el resultado directamente es más eficiente.

---

## 🔍 Casos Edge

- **Suma ya divisible**: `[4,1,3]`, `k=4` → `0`
- **Suma es 0**: `[0,0,0]`, `k=5` → `0` (0 es divisible por cualquier k)
- **Un elemento**: `[7]`, `k=3` → `1` (7 % 3 = 1)
- **Resto máximo**: `[5]`, `k=6` → `5` (necesitamos decrementar hasta 0)
- **k=1**: Siempre devuelve `0` (todo es divisible por 1)
- **Array grande**: La suma puede ser muy grande, pero el resto siempre es < k

---

## 🧮 Ejemplos Adicionales

```javascript
[3,9,7], k=5     → 4   (19 % 5 = 4)
[4,1,3], k=4     → 0   (8 % 4 = 0)
[3,2], k=6       → 5   (5 % 6 = 5)
[10], k=3        → 1   (10 % 3 = 1)
[1,2,3,4], k=5   → 0   (10 % 5 = 0)
[7,8,9], k=10    → 4   (24 % 10 = 4)
```

---

## 🚀 Soluciones Alternativas

**Versión sin reduce:**

```javascript
var minOperationsLoop = function(nums, k) {
    let sum = 0;
    for (let num of nums) {
        sum += num;
    }
    return sum % k;
};
```

**Versión funcional con sum:**

```javascript
var minOperationsFunctional = function(nums, k) {
    return nums.reduce((a, b) => a + b, 0) % k;
};
```

**Versión con BigInt (para sumas muy grandes):**

```javascript
var minOperationsBigInt = function(nums, k) {
    const sum = nums.reduce((acc, n) => acc + BigInt(n), 0n);
    return Number(sum % BigInt(k));
};
```

Todas tienen la misma complejidad O(n), pero la presentada es la más limpia.

---

## 🔬 Comparación de Enfoques

| Enfoque | Tiempo | Espacio | Legibilidad | Cuándo usar |
|---------|--------|---------|-------------|-------------|
| **Reduce** (presentado) | O(n) | O(1) | ⭐⭐⭐⭐⭐ | Siempre (más conciso) |
| **For loop** | O(n) | O(1) | ⭐⭐⭐⭐⭐ | Preferencia imperativa |
| **BigInt** | O(n) | O(1) | ⭐⭐⭐⭐ | Sumas muy grandes |

---

## 💡 ¿Por qué esta solución funciona?

**Teorema**: Para minimizar operaciones de decremento y hacer `S` divisible por `k`, el mínimo es `S % k`.

**Prueba:**
1. Queremos llegar al múltiplo de k más cercano ≤ S
2. Sea `S = qk + r`, donde `r = S % k`
3. El múltiplo de k más cercano ≤ S es `qk`
4. Necesitamos decrementar `S - qk = r` veces
5. Por lo tanto, el mínimo es `r = S % k` ✓

---

## 🧠 Intuición del Problema

**¿Por qué no necesitamos saber qué elementos decrementar?**

Porque no importa:
- Decrementar cualquier elemento en 1 reduce la suma total en 1
- Solo nos interesa cuántas veces, no dónde
- El problema solo pregunta el número total de operaciones

**Analogía:**
Si tienes $19 y necesitas tener un múltiplo de $5, no importa qué billete gastes primero. Solo importa cuántos dólares necesitas gastar (4) para llegar a $15.

---

## 🔢 Análisis Matemático Detallado

**Número de operaciones vs resto:**

```
Resto (r)  |  Operaciones necesarias
-----------|-------------------------
    0      |          0
    1      |          1
    2      |          2
   ...     |         ...
   k-1     |         k-1
```

La relación es **lineal y directa**: operaciones = resto.

**Distribución de operaciones:**

Podemos distribuir las operaciones de cualquier forma válida:
```
Para nums=[3,9,7], k=5, necesitamos 4 operaciones:
- Opción 1: Todos en nums[1]: [3, 5, 7]
- Opción 2: Distribuidos: [2, 8, 5]
- Opción 3: Mixto: [1, 6, 8]

Todas resultan en suma = 15 (divisible por 5)
```

---

## 🏷️ Tags

`Array` `Math` `Greedy` `Easy`

---