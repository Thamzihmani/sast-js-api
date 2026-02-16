/**
 * Search Routes
 * SAST Categories: XXE, XML Injection, NoSQL Injection, Stored XSS,
 *                  DOM-based XSS patterns, Information Disclosure
 */
const express = require("express");
const router = express.Router();
const xml2js = require("xml2js");
const { query } = require("../utils/database");
const { buildMongoQuery } = require("../utils/queryBuilder");

/**
 * POST /search/xml
 * VULNERABILITY: XXE (XML External Entity) Injection
 * Taint: req.body → xml2js.parseString (Source → Sink)
 */
router.post("/xml", (req, res) => {
  const xmlData = req.body.xml || req.body;

  // VULNERABILITY: XXE - external entities not disabled
  const parser = new xml2js.Parser({
    explicitArray: false,
    // Missing: reject external entities
  });

  parser.parseString(xmlData, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ parsed: result });
  });
});

/**
 * POST /search/xpath
 * VULNERABILITY: XPath Injection
 */
router.post("/xpath", (req, res) => {
  const { username, password } = req.body;

  // VULNERABILITY: XPath injection - user input in XPath query
  const xpath = `//users/user[username='${username}' and password='${password}']`;

  res.json({ xpath, message: "XPath query executed" });
});

/**
 * GET /search/results
 * VULNERABILITIES:
 * - Stored XSS (rendering DB content without encoding)
 * - SQL Injection
 */
router.get("/results", async (req, res) => {
  const { q, page, sort } = req.query;

  // VULNERABILITY: SQL Injection with ORDER BY
  const sql = `SELECT * FROM articles WHERE title LIKE '%${q}%' ORDER BY ${sort || "created_at"} LIMIT 10 OFFSET ${(page - 1) * 10}`;

  try {
    const results = await query(sql);

    // VULNERABILITY: Stored XSS - rendering DB content as HTML
    let html = "<html><body><h1>Search Results</h1>";
    for (const row of results) {
      html += `<div class="result">
        <h2>${row.title}</h2>
        <p>${row.content}</p>
        <span>By: ${row.author}</span>
      </div>`;
    }
    html += "</body></html>";

    res.send(html);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * POST /search/advanced
 * VULNERABILITIES:
 * - NoSQL Injection via $where
 * - Cross-file taint to queryBuilder
 */
router.post("/advanced", (req, res) => {
  const { filters, options } = req.body;

  // VULNERABILITY: NoSQL injection - $where operator from user input
  const mongoFilter = {
    $where: `this.name === '${filters.name}'`,
    ...filters,
  };

  // Cross-file taint
  const builtQuery = buildMongoQuery("articles", mongoFilter);

  res.json({ query: builtQuery });
});

/**
 * GET /search/suggest
 * VULNERABILITY: Response splitting / Header injection
 */
router.get("/suggest", (req, res) => {
  const { term } = req.query;

  // VULNERABILITY: HTTP Response splitting via header
  res.setHeader("X-Search-Term", term);
  res.json({ suggestions: [`${term} tutorial`, `${term} guide`, `${term} examples`] });
});

/**
 * POST /search/graphql
 * VULNERABILITY: GraphQL injection (query passed directly)
 */
router.post("/graphql", (req, res) => {
  const { query: gqlQuery } = req.body;

  // VULNERABILITY: User-controlled GraphQL query without depth/complexity limits
  // Simulating GraphQL execution
  const result = {
    data: null,
    query: gqlQuery,
    message: "GraphQL query executed without validation",
  };

  res.json(result);
});

module.exports = router;
