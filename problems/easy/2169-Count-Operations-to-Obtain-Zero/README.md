# 2169. Count Operations to Obtain Zero

## 🧠 Descripción

Se te dan dos enteros no negativos `num1` y `num2`.

En una operación:
- Si `num1 >= num2`, debes restar `num2` de `num1`.
- De lo contrario, debes restar `num1` de `num2`.

Por ejemplo:
- Si `num1 = 5` y `num2 = 4`, resta `num2` de `num1`, obteniendo `num1 = 1` y `num2 = 4`.
- Si `num1 = 4` y `num2 = 5`, resta `num1` de `num2`, obteniendo `num1 = 4` y `num2 = 1`.

Retorna el **número de operaciones** requeridas para hacer que `num1 = 0` o `num2 = 0`.

**Dificultad:** Easy

---

## 📋 Ejemplos

### Ejemplo 1:

* **Entrada**: `num1 = 2, num2 = 3`
* **Salida**: `3`
* **Explicación**:
```
Operación 1: num1 = 2, num2 = 3
  num1 < num2, restar num1 de num2
  Resultado: num1 = 2, num2 = 1

Operación 2: num1 = 2, num2 = 1
  num1 > num2, restar num2 de num1
  Resultado: num1 = 1, num2 = 1

Operación 3: num1 = 1, num2 = 1
  num1 == num2, restar num2 de num1
  Resultado: num1 = 0, num2 = 1

Total: 3 operaciones
```

### Ejemplo 2:

* **Entrada**: `num1 = 10, num2 = 10`
* **Salida**: `1`
* **Explicación**:
```
Operación 1: num1 = 10, num2 = 10
  num1 == num2, restar num2 de num1
  Resultado: num1 = 0, num2 = 10

Total: 1 operación
```

---

## 💭 Estrategia y Enfoque

Este problema es esencialmente el **Algoritmo de Euclides** para encontrar el GCD (Greatest Common Divisor), pero en lugar de encontrar el GCD, contamos las operaciones.

### 🧩 Observación clave:

El proceso es similar a la resta repetida en el algoritmo de Euclides. Cada vez que restamos el número menor del mayor, nos acercamos a hacer uno de ellos cero.

### 🎯 Algoritmo:

1. Mientras ambos números sean mayores que 0:
   - Restar el menor del mayor
   - Incrementar el contador
2. Retornar el contador

---

## 💻 Implementación en JavaScript

```js
var countOperations = function (num1, num2) {
    // operations cuenta el número total de operaciones realizadas
    let operations = 0
    
    // Mientras ambos números sean mayores que 0
    // Si uno de ellos es 0, hemos terminado
    while (num1 > 0 && num2 > 0) {
        // Comparar cuál número es mayor o si son iguales
        if (num1 >= num2) {
            // Si num1 es mayor o igual, restar num2 de num1
            num1 = num1 - num2
            // Incrementar el contador de operaciones
            operations++
        } else {
            // Si num2 es mayor, restar num1 de num2
            num2 = num2 - num1
            // Incrementar el contador de operaciones
            operations++
        }
    }

    // Retornar el número total de operaciones
    return operations
};

console.log(countOperations(2, 3))    // 3
console.log(countOperations(10, 10))  // 1
console.log(countOperations(100, 3))  // 36
```

### 📝 Ejemplo paso a paso con `num1 = 2, num2 = 3`:

```
Estado inicial: num1 = 2, num2 = 3, operations = 0

Iteración 1:
  ¿num1 > 0 && num2 > 0? Sí (2 > 0 && 3 > 0)
  ¿num1 >= num2? No (2 < 3)
  Acción: num2 = num2 - num1 = 3 - 2 = 1
  operations = 1
  Estado: num1 = 2, num2 = 1

Iteración 2:
  ¿num1 > 0 && num2 > 0? Sí (2 > 0 && 1 > 0)
  ¿num1 >= num2? Sí (2 >= 1)
  Acción: num1 = num1 - num2 = 2 - 1 = 1
  operations = 2
  Estado: num1 = 1, num2 = 1

Iteración 3:
  ¿num1 > 0 && num2 > 0? Sí (1 > 0 && 1 > 0)
  ¿num1 >= num2? Sí (1 >= 1)
  Acción: num1 = num1 - num2 = 1 - 1 = 0
  operations = 3
  Estado: num1 = 0, num2 = 1

Iteración 4:
  ¿num1 > 0 && num2 > 0? No (0 no es > 0)
  Salir del loop

Resultado: 3 operaciones
```

---

## 📊 Análisis de Rendimiento

* **Complejidad temporal**: O(max(num1, num2)), en el peor caso cuando uno es mucho mayor que el otro.
* **Complejidad espacial**: O(1), solo variables auxiliares.

![rendimiento](./public/rendimiento.png)

---

## 🔄 Optimización con Módulo (más eficiente)

Podemos optimizar usando división entera en lugar de resta repetida:

```js
var countOperationsOptimized = function(num1, num2) {
    let operations = 0
    
    while (num1 > 0 && num2 > 0) {
        if (num1 >= num2) {
            // En lugar de restar uno a uno, dividir
            operations += Math.floor(num1 / num2)
            num1 = num1 % num2
        } else {
            operations += Math.floor(num2 / num1)
            num2 = num2 % num1
        }
    }
    
    return operations
};

// Para num1 = 100, num2 = 3:
// Versión simple: 36 iteraciones
// Versión optimizada: solo unas pocas iteraciones
```

### Ejemplo con optimización:
```
num1 = 100, num2 = 3

Iteración 1:
  operations += 100 // 3 = 33
  num1 = 100 % 3 = 1
  Estado: num1 = 1, num2 = 3, operations = 33

Iteración 2:
  operations += 3 // 1 = 3
  num2 = 3 % 1 = 0
  Estado: num1 = 1, num2 = 0, operations = 36

Resultado: 36 operaciones (mismo resultado, menos iteraciones)
```

---

## 🎯 Aprendizajes Clave

* **Algoritmo de Euclides**: Este problema usa la misma idea de resta repetida.
* **Optimización con módulo**: División entera reduce iteraciones de O(n) a O(log n).
* **Simulation**: Implementar el proceso exactamente como se describe.
* **Early termination**: El loop termina cuando uno llega a 0.

---

## 💡 Relación con GCD

Este problema está relacionado con el cálculo del GCD:

```js
// GCD usando el algoritmo de Euclides
function gcd(a, b) {
    while (b !== 0) {
        let temp = b
        b = a % b
        a = temp
    }
    return a
}

// El número de operaciones en countOperations
// es similar al número de pasos en el algoritmo de Euclides
```

---

## 🏷️ Etiquetas

`Math` `Simulation` `Easy`