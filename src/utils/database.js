/**
 * Database Utility
 * SAST Test: Cross-file taint sink — receives tainted data from routes
 * Taint propagation: caller passes user input → this.query() executes raw SQL
 */
const mysql = require("mysql2/promise");

// VULNERABILITY: Hardcoded database credentials
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "vulnerable_app",
  waitForConnections: true,
  connectionLimit: 10,
});

/**
 * Execute a raw SQL query
 * VULNERABILITY: This function executes whatever SQL string it receives.
 * When callers pass unsanitized user input, this becomes an SQL injection sink.
 *
 * Taint sink: The `sql` parameter is often tainted with user input from routes.
 */
async function query(sql, params) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error("Database error:", error.message, "SQL:", sql);
    throw error;
  }
}

/**
 * Execute a raw query and return first result
 * VULNERABILITY: Same as query() — raw SQL execution
 */
async function queryOne(sql) {
  const results = await query(sql);
  return results[0] || null;
}

/**
 * Build an INSERT statement from an object
 * VULNERABILITY: SQL Injection via object keys and values
 */
function buildInsert(table, data) {
  const keys = Object.keys(data).join(", ");
  const values = Object.values(data).map(v => `'${v}'`).join(", ");

  // VULNERABILITY: String interpolation for SQL construction
  return `INSERT INTO ${table} (${keys}) VALUES (${values})`;
}

/**
 * Build an UPDATE statement from an object
 * VULNERABILITY: SQL Injection via object keys and values
 */
function buildUpdate(table, data, whereClause) {
  const sets = Object.entries(data).map(([k, v]) => `${k} = '${v}'`).join(", ");

  // VULNERABILITY: String interpolation for SQL construction
  return `UPDATE ${table} SET ${sets} WHERE ${whereClause}`;
}

module.exports = { query, queryOne, buildInsert, buildUpdate, pool };
