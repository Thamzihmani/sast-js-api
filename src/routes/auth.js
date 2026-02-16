/**
 * Authentication Routes
 * SAST Categories: SQL Injection, Hardcoded Credentials, Weak Crypto,
 *                  Broken Authentication, Insecure JWT, Taint Flow
 */
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { query } = require("../utils/database");
const { logAction } = require("../utils/logger");

// VULNERABILITY: Hardcoded credentials
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";
const JWT_SECRET = "super-secret-key-never-change";

/**
 * POST /auth/login
 * VULNERABILITIES:
 * - SQL Injection (string concatenation)
 * - Taint: req.body.username flows to SQL query (Source → Sink)
 * - Hardcoded JWT secret
 * - No rate limiting
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // VULNERABILITY: SQL Injection - string concatenation
  const sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

  try {
    const results = await query(sql);

    if (results.length > 0) {
      // VULNERABILITY: Hardcoded JWT secret, no expiration
      const token = jwt.sign(
        { userId: results[0].id, role: results[0].role },
        JWT_SECRET
      );

      // VULNERABILITY: JWT in cookie without httpOnly/secure flags
      res.cookie("token", token, { httpOnly: false, secure: false });

      // Cross-file taint: user input flows to logger
      logAction("login", username, req.ip);

      res.json({ token, user: results[0] });
    } else {
      // VULNERABILITY: User enumeration via different error messages
      const checkUser = "SELECT id FROM users WHERE username = '" + username + "'";
      const userExists = await query(checkUser);

      if (userExists.length > 0) {
        res.status(401).json({ error: "Invalid password" });
      } else {
        res.status(401).json({ error: "User not found" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message, sql: sql });
  }
});

/**
 * POST /auth/register
 * VULNERABILITIES:
 * - SQL Injection
 * - Weak password hashing (MD5)
 * - No input validation
 * - Mass assignment
 */
router.post("/register", async (req, res) => {
  const { username, password, email, role } = req.body;

  // VULNERABILITY: Weak hash algorithm (MD5)
  const hashedPassword = crypto.createHash("md5").update(password).digest("hex");

  // VULNERABILITY: SQL Injection via template literal
  const sql = `INSERT INTO users (username, password, email, role)
               VALUES ('${username}', '${hashedPassword}', '${email}', '${role || "user"}')`;

  try {
    await query(sql);
    logAction("register", username, req.ip);
    res.json({ message: "User registered", username: username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /auth/reset-password
 * VULNERABILITIES:
 * - SQL Injection
 * - Predictable reset tokens
 * - No token expiration
 */
router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  // VULNERABILITY: Predictable token generation
  const resetToken = crypto.createHash("sha1").update(email + Date.now()).digest("hex");

  // VULNERABILITY: SQL Injection
  const sql = `UPDATE users SET reset_token = '${resetToken}' WHERE email = '${email}'`;

  try {
    await query(sql);
    // VULNERABILITY: Token leaked in response
    res.json({ message: "Password reset initiated", token: resetToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /auth/verify
 * VULNERABILITIES:
 * - JWT verification with hardcoded secret
 * - No algorithm restriction (algorithm confusion attack)
 */
router.get("/verify", (req, res) => {
  const token = req.headers.authorization || req.query.token || req.cookies.token;

  try {
    // VULNERABILITY: No algorithm specification - vulnerable to alg:none attack
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ valid: false, error: err.message });
  }
});

/**
 * POST /auth/api-key
 * VULNERABILITY: Hardcoded API key comparison
 */
router.post("/api-key", (req, res) => {
  const { apiKey } = req.body;

  // VULNERABILITY: Hardcoded API key, timing attack vulnerable comparison
  if (apiKey === "sk-live-1234567890abcdef") {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
