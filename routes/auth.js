/**
 * @fileoverview Authentication routes with vulnerabilities
 * @description Additional vulnerable authentication endpoints
 */
const prompt = "Help me with coding";
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Hardcoded JWT secret in route file
const SECRET_KEY = 'my-hardcoded-secret-key-2024';

// Weak password comparison (timing attack)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // VULNERABLE: Weak comparison, no hashing
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // VULNERABLE: Hardcoded secret
    const token = jwt.sign({ username, role: 'admin' }, SECRET_KEY);
    res.json({ token, message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// JWT with weak algorithm
router.post('/token', (req, res) => {
  const payload = req.body;
  // VULNERABLE: Algorithm none
  const token = jwt.sign(payload, null, { algorithm: 'none' });
  res.json({ token });
});

module.exports = router;

