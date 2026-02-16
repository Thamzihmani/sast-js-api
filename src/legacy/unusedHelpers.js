/**
 * Unused Helper Functions
 * SAST Reachability Test: This file is NOT imported by any module.
 * All functions should be marked as UNREACHABLE.
 *
 * Expected scanner behavior:
 * - Detect vulnerabilities
 * - Mark all as "unreachable" (file not imported)
 * - Downgrade severity accordingly
 */

/**
 * UNREACHABLE: SSRF in unused helper
 */
function fetchRemoteData(url) {
  const http = require("http");
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve(data));
    }).on("error", reject);
  });
}

/**
 * UNREACHABLE: SQL injection in unused helper
 */
function findUserByEmail(email) {
  const sql = `SELECT * FROM users WHERE email = '${email}'`;
  return sql;
}

/**
 * UNREACHABLE: Command injection in unused helper
 */
function compressFile(filename) {
  const { execSync } = require("child_process");
  return execSync(`gzip ${filename}`);
}

/**
 * UNREACHABLE: XSS in unused helper
 */
function generateUserCard(user) {
  return `<div class="card"><h2>${user.name}</h2><p>${user.bio}</p></div>`;
}

/**
 * UNREACHABLE: Hardcoded secret
 */
const API_SECRET = "sk-prod-UNREACHABLE-secret-key-12345";

function getApiSecret() {
  return API_SECRET;
}

module.exports = {
  fetchRemoteData,
  findUserByEmail,
  compressFile,
  generateUserCard,
  getApiSecret,
};
