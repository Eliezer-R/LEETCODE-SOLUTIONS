// Constructor: Inicializa el banco con los saldos iniciales
const Bank = function (balance) {
  // Guardamos el array de saldos como propiedad del objeto
  this.balance = balance
}

/**
 * Transfiere dinero de account1 a account2
 * @param {number} account1 - Cuenta origen
 * @param {number} account2 - Cuenta destino
 * @param {number} money - Cantidad a transferir
 * @return {boolean} - true si la transacción fue exitosa
 */
Bank.prototype.transfer = function (account1, account2, money) {
  // Convertir de 1-indexed a 0-indexed
  account1--
  account2--

  // Validar que ambas cuentas existan (índices válidos)
  if (account1 < 0 || account1 >= this.balance.length ||
        account2 < 0 || account2 >= this.balance.length) {
    return false // Cuenta inválida
  }

  // Validar que la cuenta origen tenga fondos suficientes
  if (this.balance[account1] < money) return false

  // Realizar la transferencia
  this.balance[account1] -= money // Retirar de cuenta origen
  this.balance[account2] += money // Depositar en cuenta destino

  return true // Transacción exitosa
}

/**
 * Deposita dinero en una cuenta
 * @param {number} account - Número de cuenta
 * @param {number} money - Cantidad a depositar
 * @return {boolean} - true si la transacción fue exitosa
 */
Bank.prototype.deposit = function (account, money) {
  // Convertir de 1-indexed a 0-indexed
  account--

  // Validar que la cuenta exista
  if (account < 0 || account >= this.balance.length) return false

  // Realizar el depósito (siempre es válido si la cuenta existe)
  this.balance[account] += money
  return true
}

/**
 * Retira dinero de una cuenta
 * @param {number} account - Número de cuenta
 * @param {number} money - Cantidad a retirar
 * @return {boolean} - true si la transacción fue exitosa
 */
Bank.prototype.withdraw = function (account, money) {
  // Convertir de 1-indexed a 0-indexed
  account--

  // Validar que la cuenta exista
  if (account < 0 || account >= this.balance.length) return false

  // Validar fondos suficientes
  if (this.balance[account] < money) return false

  // Realizar el retiro
  this.balance[account] -= money
  return true
}

// Ejemplo de uso:
const bank = new Bank([10, 100, 20, 50, 30])
console.log(bank.withdraw(3, 10)) // true
console.log(bank.transfer(5, 1, 20)) // true
console.log(bank.deposit(5, 20)) // true
console.log(bank.transfer(3, 4, 15)) // false
console.log(bank.withdraw(10, 50)) // false
