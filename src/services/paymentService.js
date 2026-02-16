/**
 * Payment Service
 * SAST Test: Cross-file taint sink — receives tainted payment data from routes
 * Categories: Information Disclosure, Insecure Logging, Weak Crypto
 */
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { validateCard, formatCurrency } = require("../legacy/deadCodeInImportedFile");

/**
 * Process a payment
 * VULNERABILITY: Taint sink — cardNumber and cvv are user-controlled
 * Cross-file taint: api.js → processPayment() → logs/disk
 *
 * @param {number} amount - Payment amount
 * @param {string} cardNumber - Credit card number (TAINTED)
 * @param {string} cvv - CVV code (TAINTED)
 * @param {string} recipient - Recipient ID (TAINTED)
 */
async function processPayment(amount, cardNumber, cvv, recipient) {
  // VULNERABILITY: Logging sensitive payment data (PCI violation)
  console.log(`Processing payment: amount=${amount}, card=${cardNumber}, cvv=${cvv}`);

  // Cross-file call: validates card using imported function (reachability test)
  if (!validateCard(cardNumber)) {
    return { success: false, error: "Invalid card number" };
  }
  const formattedAmount = formatCurrency(amount);

  // VULNERABILITY: Storing card details in plain text to file
  const logEntry = `${new Date().toISOString()},${cardNumber},${cvv},${amount},${recipient}\n`;
  try {
    fs.appendFileSync(path.join(__dirname, "../../logs/payments.log"), logEntry);
  } catch {
    // Ignore
  }

  // VULNERABILITY: Weak encryption for card storage (DES + hardcoded key)
  const key = Buffer.from("paymentk");
  const cipher = crypto.createCipheriv("des-ecb", key, "");
  let encryptedCard = cipher.update(cardNumber, "utf8", "hex");
  encryptedCard += cipher.final("hex");

  // VULNERABILITY: No amount validation — negative amounts, overflow, etc.
  const transactionId = crypto.createHash("md5")
    .update(`${cardNumber}${amount}${Date.now()}`)
    .digest("hex");

  return {
    success: true,
    transactionId,
    amount,
    encryptedCard,
    // VULNERABILITY: Returning partial card number without proper masking
    cardLast4: cardNumber.slice(-4),
  };
}

/**
 * Refund a payment
 * VULNERABILITY: SQL Injection via transactionId
 */
async function refundPayment(transactionId, reason) {
  const { query } = require("../utils/database");

  // VULNERABILITY: SQL Injection - transactionId from user input
  const sql = `UPDATE transactions SET status = 'refunded', reason = '${reason}' WHERE transaction_id = '${transactionId}'`;

  return await query(sql);
}

module.exports = { processPayment, refundPayment };
