/**
 * User Management Routes
 * SAST Categories: NoSQL Injection, IDOR, XSS, SSRF, Prototype Pollution,
 *                  Broken Access Control, Cross-File Taint
 */
const express = require("express");
const router = express.Router();
const { sanitizeInput } = require("../utils/sanitizer");
const { query } = require("../utils/database");
const { buildMongoQuery } = require("../utils/queryBuilder");
const { renderTemplate } = require("../utils/templateEngine");

/**
 * GET /users/profile/:id
 * VULNERABILITIES:
 * - IDOR (Insecure Direct Object Reference)
 * - SQL Injection in parameter
 * - No authentication check
 */
router.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;

  // VULNERABILITY: SQL Injection via URL parameter
  const sql = "SELECT * FROM users WHERE id = " + userId;

  try {
    const results = await query(sql);
    if (results.length > 0) {
      // VULNERABILITY: Exposing sensitive data (password hash, tokens)
      res.json(results[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * PUT /users/profile
 * VULNERABILITIES:
 * - Mass assignment / Prototype pollution
 * - NoSQL Injection
 * - Cross-file taint (input flows to buildMongoQuery)
 */
router.put("/profile", async (req, res) => {
  const updates = req.body;

  // VULNERABILITY: Prototype pollution - merging user input into object
  const userProfile = {};
  for (const key in updates) {
    userProfile[key] = updates[key];
  }

  // VULNERABILITY: Cross-file taint - user input flows to query builder
  const mongoQuery = buildMongoQuery("users", updates);

  try {
    res.json({ message: "Profile updated", profile: userProfile, query: mongoQuery });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /users/search
 * VULNERABILITIES:
 * - Reflected XSS
 * - SQL Injection
 * - Information disclosure
 */
router.get("/search", async (req, res) => {
  const searchTerm = req.query.q;

  // VULNERABILITY: Reflected XSS - user input in response without encoding
  const html = `<h1>Search results for: ${searchTerm}</h1>`;

  // VULNERABILITY: SQL Injection via LIKE clause
  const sql = `SELECT username, email FROM users WHERE username LIKE '%${searchTerm}%'`;

  try {
    const results = await query(sql);
    res.send(html + `<pre>${JSON.stringify(results)}</pre>`);
  } catch (err) {
    res.status(500).send(`<p>Error: ${err.message}</p>`);
  }
});

/**
 * POST /users/avatar
 * VULNERABILITIES:
 * - SSRF (Server-Side Request Forgery)
 * - Taint: req.body.url flows to HTTP request
 */
router.post("/avatar", async (req, res) => {
  const { url } = req.body;

  try {
    // VULNERABILITY: SSRF - fetching arbitrary URLs from user input
    const http = require("http");
    const https = require("https");
    const client = url.startsWith("https") ? https : http;

    client.get(url, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => {
        const buffer = Buffer.concat(chunks);
        res.set("Content-Type", response.headers["content-type"]);
        res.send(buffer);
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /users/import
 * VULNERABILITIES:
 * - Unsafe deserialization
 * - Prototype pollution via JSON.parse
 */
router.post("/import", (req, res) => {
  const { data } = req.body;

  try {
    // VULNERABILITY: Unsafe deserialization with node-serialize
    const serialize = require("node-serialize");
    const userData = serialize.unserialize(data);

    res.json({ imported: true, count: Object.keys(userData).length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /users/export
 * VULNERABILITIES:
 * - NoSQL Injection via query parameters
 */
router.get("/export", async (req, res) => {
  const { role, status } = req.query;

  // VULNERABILITY: NoSQL Injection - query params used directly in MongoDB query
  const filter = {};
  if (role) filter.role = role;
  if (status) filter.status = JSON.parse(status);

  try {
    const mongoQuery = buildMongoQuery("users", filter);
    res.json({ filter: mongoQuery, message: "Export started" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /users/render-profile
 * VULNERABILITY: Server-Side Template Injection (SSTI)
 */
router.post("/render-profile", (req, res) => {
  const { template } = req.body;

  // VULNERABILITY: Cross-file taint - user template flows to template engine
  const rendered = renderTemplate(template, { username: "testuser" });
  res.send(rendered);
});

module.exports = router;
