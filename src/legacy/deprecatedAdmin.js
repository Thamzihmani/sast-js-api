/**
 * Deprecated Admin Module
 * SAST Reachability Test: This file is NOT imported by any other module.
 * All functions here should be marked as UNREACHABLE.
 *
 * Expected scanner behavior:
 * - Detect vulnerabilities (SQL injection, command injection, etc.)
 * - Mark them all as "unreachable" with high confidence
 * - Downgrade severity (critical → medium, high → low)
 */
const { exec } = require("child_process");
const crypto = require("crypto");

/**
 * UNREACHABLE: SQL Injection in deprecated function
 * Expected: unreachable + severity downgrade
 */
function deleteAllUsers(confirmation) {
  const sql = `DELETE FROM users WHERE confirmation = '${confirmation}'`;
  console.log("Executing:", sql);
  return sql;
}

/**
 * UNREACHABLE: Command Injection in deprecated function
 * Expected: unreachable + severity downgrade
 */
function backupDatabase(outputPath) {
  exec(`mysqldump -u root -proot123 vulnerable_app > ${outputPath}`, (err) => {
    if (err) console.error("Backup failed:", err);
  });
}

/**
 * UNREACHABLE: Hardcoded credentials
 * Expected: unreachable + severity downgrade
 */
function connectToLegacyDB() {
  const connectionString = "mysql://admin:P@ssw0rd!@legacy-db.internal:3306/production";
  return connectionString;
}

/**
 * UNREACHABLE: Eval injection
 * Expected: unreachable + severity downgrade
 */
function legacyCalculate(expression) {
  return eval(expression);
}

/**
 * UNREACHABLE: Weak crypto
 * Expected: unreachable + severity downgrade
 */
function legacyEncrypt(data) {
  const key = "12345678";
  const cipher = crypto.createCipheriv("des-ecb", Buffer.from(key), "");
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

/**
 * UNREACHABLE: Path traversal
 * Expected: unreachable + severity downgrade
 */
function readLegacyConfig(configName) {
  const fs = require("fs");
  const path = require("path");
  return fs.readFileSync(path.join("/etc/legacy/", configName), "utf-8");
}

module.exports = {
  deleteAllUsers,
  backupDatabase,
  connectToLegacyDB,
  legacyCalculate,
  legacyEncrypt,
  readLegacyConfig,
};
