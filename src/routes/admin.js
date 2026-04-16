/**
 * Admin Routes
 * SAST Categories: eval() injection, Regex DoS, LDAP Injection,
 *                  Insecure Randomness, Open Redirect, Header Injection
 */
const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const { query } = require("../utils/database");
const crypto = require("crypto");

/**
 * POST /admin/eval
 * VULNERABILITY: Direct eval() of user input
 // vigilnz-ignore taint-code_injection
 * Taint: req.body.expression → eval() (Source → Sink)
 */
router.post("/eval", (req, res) => {
  const { expression } = req.body;

  try {
    // VULNERABILITY: Code injection via eval
    const result = eval(expression);
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /admin/calculate
 * VULNERABILITY: eval() used for "safe" math calculation
 */
router.post("/calculate", (req, res) => {
  const { formula } = req.body;

  // VULNERABILITY: eval used for math - can be exploited
  const result = new Function("return " + formula)();
  res.json({ result });
});

/**
 * GET /admin/redirect
 * VULNERABILITY: Open redirect
 * Taint: req.query.url → res.redirect (Source → Sink)
 */
router.get("/redirect", (req, res) => {
  const { url } = req.query;

  // VULNERABILITY: Open redirect - no URL validation
  res.redirect(url);
});

/**
 * GET /admin/proxy
 * VULNERABILITY: Open redirect via header
 */
router.get("/proxy", (req, res) => {
  const target = req.query.target;

  // VULNERABILITY: Header injection via user-controlled value
  res.setHeader("Location", target);
  res.setHeader("X-Custom-Header", req.query.custom || "");
  res.status(302).send();
});

/**
 * POST /admin/validate-regex
 * VULNERABILITY: ReDoS (Regular Expression Denial of Service)
 */
router.post("/validate-regex", (req, res) => {
  const { pattern, input } = req.body;

  try {
    // VULNERABILITY: ReDoS - user-controlled regex pattern
    const regex = new RegExp(pattern);
    const matches = input.match(regex);
    res.json({ matches });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * POST /admin/validate-email
 * VULNERABILITY: ReDoS with catastrophic backtracking
 */
router.post("/validate-email", (req, res) => {
  const { email } = req.body;

  // VULNERABILITY: ReDoS - catastrophic backtracking regex
  const emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const isValid = emailRegex.test(email);

  res.json({ valid: isValid });
});

/**
 * POST /admin/ldap-search
 * VULNERABILITY: LDAP Injection
 */
router.post("/ldap-search", (req, res) => {
  const { username } = req.body;

  // VULNERABILITY: LDAP Injection - user input in LDAP filter
  const ldapFilter = `(&(objectClass=user)(uid=${username}))`;

  res.json({ filter: ldapFilter, message: "LDAP search executed" });
});

/**
 * POST /admin/execute
 * VULNERABILITY: OS Command injection via backticks
 */
router.post("/execute", (req, res) => {
  const { host } = req.body;

  // VULNERABILITY: Command injection
  exec(`ping -c 4 ${host}`, (error, stdout, stderr) => {
    res.json({ output: stdout, errors: stderr });
  });
});

/**
 * GET /admin/token
 * VULNERABILITY: Insecure randomness for security token
 */
router.get("/token", (req, res) => {
  // VULNERABILITY: Math.random() for security-sensitive value
  const token = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);

  res.json({ token });
});

/**
 * POST /admin/config
 * VULNERABILITIES:
 * - Mass assignment
 * - Prototype pollution via Object.assign
 */
router.post("/config", (req, res) => {
  const defaultConfig = {
    debug: false,
    logLevel: "info",
    maxRetries: 3,
  };

  // VULNERABILITY: Prototype pollution via Object.assign with user input
  const config = Object.assign({}, defaultConfig, req.body);

  // VULNERABILITY: Config values used without validation
  if (config.debug) {
    config.secretKey = process.env.JWT_SECRET;
  }

  res.json({ config });
});

/**
 * POST /admin/webhook
 * VULNERABILITY: SSRF via webhook URL
 */
router.post("/webhook", async (req, res) => {
  const { webhookUrl, payload } = req.body;

  try {
    // VULNERABILITY: SSRF - making HTTP request to user-specified URL
    const fetch = require("node-fetch");
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    res.json({ status: response.status, statusText: response.statusText });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /admin/cors-test
 * VULNERABILITY: Dynamic CORS with user input reflected in header
 */
router.get("/cors-test", (req, res) => {
  const origin = req.headers.origin;

  // VULNERABILITY: Reflected origin in CORS header
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.json({ message: "CORS test" });
});

module.exports = router;
