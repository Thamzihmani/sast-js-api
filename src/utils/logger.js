/**
 * Logger Utility
 * SAST Test: Cross-file taint propagation — receives tainted user input from routes
 * Categories: Log Injection, Information Disclosure
 */
const fs = require("fs");
const path = require("path");

const LOG_FILE = path.join(__dirname, "../../logs/app.log");

/**
 * Log an action to file
 * VULNERABILITY: Log injection — tainted input (username, ip) written to log file
 * Taint propagation: routes pass user-controlled values → written to disk without sanitization
 *
 * @param {string} action - Action name
 * @param {string} user - Username (TAINTED - from req.body)
 * @param {string} ip - IP address (TAINTED - from req.ip)
 */
function logAction(action, user, ip) {
  // VULNERABILITY: Log injection - user input can inject newlines/fake log entries
  const entry = `[${new Date().toISOString()}] ACTION=${action} USER=${user} IP=${ip}\n`;

  try {
    fs.appendFileSync(LOG_FILE, entry);
  } catch {
    // Silently fail if log directory doesn't exist
  }

  // VULNERABILITY: Logging to console with unsanitized input
  console.log(`[LOG] ${action}: ${user} from ${ip}`);
}

/**
 * Log an error with full details
 * VULNERABILITY: Information disclosure — full error stack written to log
 */
function logError(error, context) {
  const entry = `[${new Date().toISOString()}] ERROR: ${error.message}\nStack: ${error.stack}\nContext: ${JSON.stringify(context)}\n`;

  try {
    fs.appendFileSync(LOG_FILE, entry);
  } catch {
    // Silently fail
  }
}

/**
 * Log a security event
 * VULNERABILITY: Security event details could be tainted
 */
function logSecurityEvent(event, details) {
  const entry = `[SECURITY] ${event}: ${JSON.stringify(details)}\n`;

  // VULNERABILITY: Writing tainted details to log
  try {
    fs.appendFileSync(LOG_FILE, entry);
  } catch {
    // Silently fail
  }
}

module.exports = { logAction, logError, logSecurityEvent };
