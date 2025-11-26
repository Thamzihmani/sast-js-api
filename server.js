/**
 * @fileoverview Intentionally Vulnerable Express API
 * @description Contains multiple security vulnerabilities for SAST testing
 * @author Security Testing Team
 * @created 2025-01-21
 * 
 * WARNING: This code contains intentional security vulnerabilities.
 * DO NOT use in production!
 */

const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const { exec, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// ============================================================================
// VULNERABILITY 1: Hardcoded Secrets (CWE-798) - CRITICAL
// ============================================================================

// Hardcoded JWT secret
const JWT_SECRET = "my-super-secret-key-12345";
const DB_PASSWORD = "admin123";
const API_KEY = "AKIAIOSFODNN7EXAMPLE";

// Hardcoded AWS credentials
const AWS_ACCESS_KEY = "AKIAIOSFODNN7EXAMPLE";
const AWS_SECRET_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";

// ============================================================================
// VULNERABILITY 2: SQL Injection (CWE-89) - CRITICAL
// ============================================================================

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: DB_PASSWORD,
  database: 'testdb'
});

// SQL Injection via string concatenation
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  // VULNERABLE: Direct string interpolation
  const query = `SELECT * FROM users WHERE id = ${userId}`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// SQL Injection via template literal
app.post('/search', (req, res) => {
  const searchTerm = req.body.search;
  // VULNERABLE: Template literal in query
  db.query(`SELECT * FROM products WHERE name LIKE '%${searchTerm}%'`, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// SQL Injection via Sequelize-like pattern
app.get('/orders', (req, res) => {
  const status = req.query.status;
  // VULNERABLE: String concatenation
  const query = "SELECT * FROM orders WHERE status = '" + status + "'";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ============================================================================
// VULNERABILITY 3: Command Injection (CWE-78) - CRITICAL
// ============================================================================

// Command injection via exec
app.post('/deploy', (req, res) => {
  const repoUrl = req.body.repo;
  // VULNERABLE: User input directly in command
  exec(`git clone ${repoUrl}`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: 'Deployed successfully', output: stdout });
  });
});

// Command injection via execSync
app.post('/ping', (req, res) => {
  const host = req.body.host;
  // VULNERABLE: Template literal in command
  const result = execSync(`ping -c 4 ${host}`);
  res.json({ output: result.toString() });
});

// Command injection via spawn
app.post('/backup', (req, res) => {
  const { execSync } = require('child_process');
  const filename = req.body.filename;
  // VULNERABLE: String concatenation
  execSync('tar -czf ' + filename + ' /var/data');
  res.json({ message: 'Backup created' });
});

// ============================================================================
// VULNERABILITY 4: Code Injection (CWE-95) - CRITICAL
// ============================================================================

// Code injection via eval
app.post('/execute', (req, res) => {
  const code = req.body.code;
  // VULNERABLE: eval with user input
  try {
    const result = eval(code);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Code injection via Function constructor
app.post('/transform', (req, res) => {
  const transformFn = req.body.function;
  // VULNERABLE: Function constructor with user input
  const func = new Function('data', transformFn);
  const result = func(req.body.data);
  res.json({ result });
});

// ============================================================================
// VULNERABILITY 5: XSS (CWE-79) - HIGH
// ============================================================================

// XSS via innerHTML
app.get('/render', (req, res) => {
  const userContent = req.query.content;
  // VULNERABLE: Direct HTML output
  res.send(`
    <html>
      <body>
        <div id="content">${userContent}</div>
      </body>
    </html>
  `);
});

// XSS via document.write pattern
app.get('/page', (req, res) => {
  const title = req.query.title;
  // VULNERABLE: User input in HTML
  res.send(`
    <html>
      <head><title>${title}</title></head>
      <body>Welcome</body>
    </html>
  `);
});

// ============================================================================
// VULNERABILITY 6: Path Traversal (CWE-22) - HIGH
// ============================================================================

// Path traversal in file read
app.get('/file', (req, res) => {
  const filename = req.query.file;
  // VULNERABLE: Direct path usage
  const filePath = path.join(__dirname, 'uploads', filename);
  const content = fs.readFileSync(filePath, 'utf8');
  res.send(content);
});

// Path traversal in file write
app.post('/upload', (req, res) => {
  const filename = req.body.filename;
  const content = req.body.content;
  // VULNERABLE: No path validation
  fs.writeFileSync(path.join(__dirname, 'uploads', filename), content);
  res.json({ message: 'File uploaded' });
});

// ============================================================================
// VULNERABILITY 7: Weak JWT Implementation (CWE-287) - CRITICAL
// ============================================================================

// JWT with algorithm none
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // VULNERABLE: Algorithm none
  const token = jwt.sign({ username }, null, { algorithm: 'none' });
  res.json({ token });
});

// JWT with hardcoded secret
app.post('/auth', (req, res) => {
  const { username } = req.body;
  // VULNERABLE: Hardcoded secret
  const token = jwt.sign({ username }, JWT_SECRET, { algorithm: 'HS256' });
  res.json({ token });
});

// JWT verification with null secret
app.get('/verify', (req, res) => {
  const token = req.headers.authorization;
  // VULNERABLE: Null secret
  const decoded = jwt.verify(token, null);
  res.json({ user: decoded });
});

// ============================================================================
// VULNERABILITY 8: Weak Crypto (CWE-327) - HIGH
// ============================================================================

const crypto = require('crypto');

// Weak hash MD5
app.post('/hash', (req, res) => {
  const password = req.body.password;
  // VULNERABLE: MD5 is weak
  const hash = crypto.createHash('md5').update(password).digest('hex');
  res.json({ hash });
});

// Weak encryption DES
app.post('/encrypt', (req, res) => {
  const data = req.body.data;
  // VULNERABLE: DES is weak
  const cipher = crypto.createCipher('des', 'secret-key');
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  res.json({ encrypted });
});

// ============================================================================
// VULNERABILITY 9: Insecure Random (CWE-330) - MEDIUM
// ============================================================================

// Weak random for session ID
app.post('/session', (req, res) => {
  // VULNERABLE: Math.random() is predictable
  const sessionId = Math.random().toString(36).substring(7);
  res.json({ sessionId });
});

// ============================================================================
// VULNERABILITY 10: SSRF (CWE-918) - HIGH
// ============================================================================

const axios = require('axios');

// SSRF via unvalidated URL
app.post('/fetch', async (req, res) => {
  const url = req.body.url;
  // VULNERABLE: No URL validation
  try {
    const response = await axios.get(url);
    res.json({ data: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================================
// VULNERABILITY 11: Sensitive Data Exposure (CWE-200) - HIGH
// ============================================================================

// Logging sensitive data
app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  // VULNERABLE: Logging password
  console.log('User registration:', { username, password, email });
  res.json({ message: 'User registered' });
});

// ============================================================================
// VULNERABILITY 12: Insecure CORS (CWE-346) - MEDIUM
// ============================================================================

// CORS allowing all origins
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// ============================================================================
// Server Setup
// ============================================================================

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Vulnerable API server running on port ${PORT}`);
  console.log('WARNING: This server contains intentional vulnerabilities!');
});

