# 2125. Number of Laser Beams in a Bank

## 🧠 Descripción

Se activan dispositivos de seguridad antirrobo dentro de un banco. Se te da un array de strings binarios `bank` indexado en 0 que representa el plano del banco, el cual es una matriz 2D de `m x n`. `bank[i]` representa la fila `i`, que consiste en `'0'`s y `'1'`s. `'0'` significa que la celda está vacía, mientras que `'1'` significa que la celda tiene un dispositivo de seguridad.

Hay un rayo láser entre dos dispositivos de seguridad si se cumplen ambas condiciones:

* Los dos dispositivos están ubicados en dos filas diferentes: `r1` y `r2`, donde `r1 < r2`.
* Para cada fila `i` donde `r1 < i < r2`, no hay dispositivos de seguridad en la fila `i`.

Los rayos láser son independientes, es decir, un rayo no interfiere ni se une con otro.

Retorna el número total de rayos láser en el banco.

---

## 📋 Ejemplos

### Ejemplo 1:

* **Entrada**: `bank = ["011001","000000","010100","001000"]`
* **Salida**: `8`

### Ejemplo 2:

* **Entrada**: `bank = ["000","111","000"]`
* **Salida**: `0`

---

## 💭 Estrategia y Enfoque

La clave es entender que los rayos láser se forman entre filas consecutivas que tengan dispositivos. El número de rayos entre dos filas = dispositivos en fila 1 × dispositivos en fila 2.

### 🧩 Pasos del Algoritmo:

1. Recorrer cada fila del banco.
2. Contar cuántos dispositivos ('1') hay en cada fila.
3. Si la fila tiene dispositivos y la fila anterior también, multiplicar ambos conteos.
4. Sumar al resultado total.
5. Actualizar el conteo anterior.

---

## 💻 Implementación en JavaScript

```js
var numberOfBeams = function (bank) {
    let count = 0       // Contador de dispositivos en la fila anterior con dispositivos
    let resul2 = 0      // Resultado total de rayos láser
    
    // Recorremos cada fila del banco
    for (let i = 0; i < bank.length; i++) {
        // Contamos cuántos '1' (dispositivos) hay en la fila actual
        // split('') convierte el string en array de caracteres
        // reduce suma 1 por cada '1' encontrado, 0 por cada '0'
        const resul = bank[i].split('').reduce((sum, value) => value === '1' ? sum + 1 : sum, 0)
        
        // Si la fila actual tiene dispositivos Y la anterior también tenía
        if (resul !== 0 && count !== 0) {
            // Calculamos los rayos: dispositivos fila anterior × dispositivos fila actual
            resul2 += resul * count
            // Actualizamos count con el número de dispositivos de la fila actual
            count = resul
        }
        
        // Si es la primera fila con dispositivos (count aún es 0)
        if (count === 0) {
            // Simplemente guardamos el conteo para la próxima fila
            count = resul
        }
    }

    return resul2
}

console.log(numberOfBeams(["011001","000000","010100","001000"])) // 8
console.log(numberOfBeams(["000","111","000"])) // 0
```

### 📝 Ejemplo paso a paso:

Ver el README del problema 2125 anterior para la explicación detallada paso a paso.

---

## 📊 Análisis de Rendimiento

* **Complejidad temporal**: O(m × n)
* **Complejidad espacial**: O(1)

![rendimiento](./public/rendimiento.png)

---

## 🏷️ Etiquetas

`Array` `String` `Math` `Matrix` `Medium`