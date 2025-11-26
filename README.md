# Vulnerable API - Test Project 1

## Overview

This is an intentionally vulnerable Express.js API designed to test SAST (Static Application Security Testing) scanners. It contains multiple security vulnerabilities across different categories.

**⚠️ WARNING: This code contains intentional security vulnerabilities. DO NOT use in production!**

## Vulnerabilities Included

### 1. Hardcoded Secrets (CWE-798) - CRITICAL
- JWT secrets hardcoded in code
- Database passwords in plaintext
- API keys and AWS credentials exposed

**Location**: `server.js` lines 18-28

### 2. SQL Injection (CWE-89) - CRITICAL
- String concatenation in SQL queries
- Template literal injection
- Sequelize-like injection patterns

**Location**: 
- `server.js` lines 35-65
- `utils/database.js` (all functions)

### 3. Command Injection (CWE-78) - CRITICAL
- `exec()` with user input
- `execSync()` with template literals
- Command string concatenation

**Location**: `server.js` lines 70-95

### 4. Code Injection (CWE-95) - CRITICAL
- `eval()` with user input
- `Function()` constructor injection

**Location**: `server.js` lines 100-120

### 5. Cross-Site Scripting (XSS) (CWE-79) - HIGH
- Direct HTML output with user input
- Unsanitized content in responses

**Location**: `server.js` lines 125-145

### 6. Path Traversal (CWE-22) - HIGH
- File read without path validation
- File write with user-controlled paths

**Location**: `server.js` lines 150-170

### 7. Weak JWT Implementation (CWE-287) - CRITICAL
- Algorithm "none" vulnerability
- Hardcoded JWT secrets
- Null secret verification

**Location**: 
- `server.js` lines 175-200
- `routes/auth.js` (all routes)

### 8. Weak Cryptographic Algorithms (CWE-327) - HIGH
- MD5 hashing
- DES encryption

**Location**: `server.js` lines 205-225

### 9. Insecure Random Number Generation (CWE-330) - MEDIUM
- `Math.random()` for session IDs

**Location**: `server.js` lines 230-235

### 10. Server-Side Request Forgery (SSRF) (CWE-918) - HIGH
- Unvalidated URL fetching

**Location**: `server.js` lines 240-250

### 11. Sensitive Data Exposure (CWE-200) - HIGH
- Logging passwords and sensitive data

**Location**: `server.js` lines 255-265

### 12. Insecure CORS Configuration (CWE-346) - MEDIUM
- Wildcard origin allowed

**Location**: `server.js` lines 270-275

## Setup

```bash
cd test-projects/vulnerable-api
npm install
npm start
```

The server will start on `http://localhost:3000`

## Testing with SAST Scanner

Run the SAST scanner against this project:

```bash
cd workers
node -e "const { runSastScans } = require('./src/lib/sast'); runSastScans('../test-projects/vulnerable-api').then(r => console.log(JSON.stringify(r, null, 2)));"
```

## Expected Findings

The SAST scanner should detect:
- ✅ All hardcoded secrets (JWT, passwords, API keys)
- ✅ SQL injection vulnerabilities
- ✅ Command injection vulnerabilities
- ✅ Code injection (eval, Function)
- ✅ XSS vulnerabilities
- ✅ Path traversal issues
- ✅ Weak JWT implementations
- ✅ Weak cryptographic algorithms
- ✅ Insecure random usage
- ✅ SSRF vulnerabilities
- ✅ Sensitive data logging
- ✅ Insecure CORS configuration

## Notes

- This project intentionally does NOT include safe patterns
- All vulnerabilities are straightforward and should be easily detected
- No false positive filtering should be needed for these patterns

