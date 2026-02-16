/**
 * Dead Code in an Imported File
 * SAST Reachability Test: This file IS imported (by services/paymentService.js for validateCard),
 * but only some functions are actually called. The rest are dead code.
 *
 * Expected scanner behavior:
 * - validateCard(): REACHABLE (called from paymentService → api.js route)
 * - formatCurrency(): REACHABLE (exported + called)
 * - internalSQLHelper(): UNREACHABLE (not exported, not called by any reachable function)
 * - unusedExportedFn(): UNKNOWN (exported but no callers found in project)
 */

/**
 * REACHABLE: Called from paymentService
 * Has a vulnerability (weak validation) — severity should NOT be downgraded
 */
function validateCard(cardNumber) {
  // VULNERABILITY: Logging sensitive card data
  console.log("Validating card:", cardNumber);

  // VULNERABILITY: Weak validation — only checks length, not Luhn algorithm
  return cardNumber && cardNumber.length >= 13 && cardNumber.length <= 19;
}

/**
 * REACHABLE: Exported and used
 */
function formatCurrency(amount) {
  // VULNERABILITY: No protection against prototype pollution via toString
  return "$" + amount.toFixed(2);
}

/**
 * UNREACHABLE: Not exported, internal helper never called by reachable code
 * Expected: unreachable + severity downgrade
 */
function internalSQLHelper(userId) {
  // VULNERABILITY: SQL Injection — but unreachable so should be downgraded
  const sql = `SELECT credit_limit FROM accounts WHERE user_id = '${userId}'`;
  return sql;
}

/**
 * UNKNOWN: Exported but no callers found in the project
 * Could be called externally, so should be "unknown" confidence
 */
function unusedExportedFn(data) {
  // VULNERABILITY: eval — but exported with no internal callers
  return eval(data);
}

/**
 * UNREACHABLE: Not exported, never called
 */
function anotherInternalHelper(config) {
  // VULNERABILITY: Command injection — but unreachable
  const { exec } = require("child_process");
  exec(`curl ${config.webhook}`, () => {});
}

module.exports = { validateCard, formatCurrency, unusedExportedFn };
