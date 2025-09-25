const compareVersion = function (version1, version2) {
  const spli1 = version1.split('.') // Dividir version1 en revisiones
  const spli2 = version2.split('.') // Dividir version2 en revisiones
  const n = Math.max(spli1.length, spli2.length) // Longitud máxima
  let num1 = 0 // Revisión actual de version1
  let num2 = 0 // Revisión actual de version2

  // Comparar cada nivel de revisión
  for (let i = 0; i < n; i++) {
    // Convertir a número, usar 0 si no existe la revisión
    num1 = Number(spli1[i]) || 0
    num2 = Number(spli2[i]) || 0

    // Comparar revisiones actuales
    if (num1 < num2) {
      return -1 // version1 < version2
    } else if (num1 > num2) {
      return 1 // version1 > version2
    }
    // Si son iguales, continúa al siguiente nivel
  }

  return 0 // Todas las revisiones son iguales
}

console.log(compareVersion('1.2', '1.10')) // -1

/**
 * Ejemplo paso a paso con version1 = "1.2", version2 = "1.10":
 *
 * 1. Split:
 *    spli1 = ["1", "2"]
 *    spli2 = ["1", "10"]
 *    n = Math.max(2, 2) = 2
 *
 * 2. Comparación por niveles:
 *    i=0: num1 = Number("1") = 1, num2 = Number("1") = 1
 *         1 == 1 → continúa
 *
 *    i=1: num1 = Number("2") = 2, num2 = Number("10") = 10
 *         2 < 10 → return -1
 *
 * Resultado: -1 (version1 < version2)
 */
