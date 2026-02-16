# SAST Scanner Test Project

Intentionally vulnerable Node.js Express API designed to test our SAST scanner's detection capabilities.

**WARNING: This project contains intentionally vulnerable code. Do NOT deploy to production.**

## Quick Start

```bash
npm install
npm start
```

## Project Structure

```
sast-js-api/
├── src/
│   ├── app.js                    # Express app entry point (REACHABLE)
│   ├── routes/
│   │   ├── auth.js               # SQL Injection, Weak Crypto, Hardcoded Creds
│   │   ├── users.js              # NoSQL Injection, XSS, SSRF, Prototype Pollution
│   │   ├── files.js              # Path Traversal, Command Injection, File Upload
│   │   ├── admin.js              # eval(), ReDoS, Open Redirect, Header Injection
│   │   ├── search.js             # XXE, XPath Injection, Stored XSS
│   │   └── api.js                # Weak Crypto, Timing Attack, SSRF, Template Injection
│   ├── utils/
│   │   ├── database.js           # Taint SINK: Raw SQL execution
│   │   ├── logger.js             # Taint SINK: Log injection
│   │   ├── sanitizer.js          # Broken sanitization (bypassable)
│   │   ├── queryBuilder.js       # Taint SINK: NoSQL query builder
│   │   └── templateEngine.js     # Taint SINK: SSTI via eval/Function
│   ├── services/
│   │   ├── paymentService.js     # Taint SINK: PCI data logging, weak crypto
│   │   └── emailService.js       # Taint SINK: Email header injection, command injection
│   ├── middleware/
│   │   └── auth.js               # JWT misuse, timing attack, hardcoded secrets
│   ├── models/
│   │   └── user.js               # Mass assignment, MD5 passwords, info disclosure
│   ├── config/
│   │   ├── database.js           # Hardcoded DB credentials
│   │   └── security.js           # Weak crypto config, insecure defaults
│   └── legacy/
│       ├── deprecatedAdmin.js    # UNREACHABLE: Not imported by any file
│       ├── unusedHelpers.js      # UNREACHABLE: Not imported by any file
│       └── deadCodeInImportedFile.js  # MIXED: Some functions reachable, some dead
├── .env                          # Hardcoded secrets
├── package.json
└── README.md
```

## Vulnerability Catalog

### 1. Injection Vulnerabilities
| Vuln | File | Line(s) | Reachable? |
|------|------|---------|------------|
| SQL Injection (string concat) | routes/auth.js | login, register | YES |
| SQL Injection (template literal) | routes/auth.js | register, reset-password | YES |
| SQL Injection (URL param) | routes/users.js | profile/:id | YES |
| SQL Injection (LIKE clause) | routes/users.js | search | YES |
| SQL Injection (ORDER BY) | routes/search.js | results | YES |
| NoSQL Injection ($where) | routes/search.js | advanced | YES |
| NoSQL Injection (JSON.parse) | routes/users.js | export | YES |
| Command Injection (exec) | routes/files.js | process | YES |
| Command Injection (execSync) | routes/files.js | convert | YES |
| Command Injection (spawn+shell) | routes/files.js | archive | YES |
| Command Injection (ping) | routes/admin.js | execute | YES |
| eval() injection | routes/admin.js | eval | YES |
| new Function() injection | routes/admin.js | calculate, api.js process-template | YES |
| LDAP Injection | routes/admin.js | ldap-search | YES |
| XPath Injection | routes/search.js | xpath | YES |
| XXE Injection | routes/search.js | xml | YES |
| SQL Injection (dead code) | legacy/deprecatedAdmin.js | deleteAllUsers | NO |
| Command Injection (dead code) | legacy/deprecatedAdmin.js | backupDatabase | NO |

### 2. Cross-Site Scripting (XSS)
| Vuln | File | Reachable? |
|------|------|------------|
| Reflected XSS | routes/users.js (search) | YES |
| Stored XSS | routes/search.js (results) | YES |
| XSS in unused helper | legacy/unusedHelpers.js | NO |

### 3. Path Traversal & File Ops
| Vuln | File | Reachable? |
|------|------|------------|
| Arbitrary File Read | routes/files.js (read) | YES |
| Arbitrary File Write | routes/files.js (write) | YES |
| Path Traversal (download) | routes/files.js (download) | YES |
| Path Traversal (delete) | routes/files.js (delete) | YES |
| Insecure File Upload | routes/files.js (upload) | YES |

### 4. Cryptographic Issues
| Vuln | File | Reachable? |
|------|------|------------|
| MD5 password hashing | routes/auth.js, models/user.js | YES |
| DES encryption (weak cipher) | api.js, paymentService.js | YES |
| Hardcoded encryption keys | config/security.js | YES |
| Math.random() for tokens | routes/admin.js, api.js | YES |
| Static IV | config/security.js | YES |
| Timing attack (===) | api.js, middleware/auth.js | YES |

### 5. Server-Side Request Forgery (SSRF)
| Vuln | File | Reachable? |
|------|------|------------|
| SSRF via http.get | routes/users.js (avatar) | YES |
| SSRF via fetch | routes/admin.js (webhook) | YES |
| SSRF + disabled TLS | routes/api.js (fetch-url) | YES |

### 6. Authentication & Authorization
| Vuln | File | Reachable? |
|------|------|------------|
| Hardcoded JWT secret | routes/auth.js, middleware/auth.js | YES |
| JWT alg:none attack | routes/auth.js (verify) | YES |
| User enumeration | routes/auth.js (login) | YES |
| No auth on sensitive endpoints | routes/users.js, admin.js | YES |
| Hardcoded API keys | routes/auth.js, .env | YES |

### 7. Cross-File Taint Flows
| Source | Propagation | Sink |
|--------|-------------|------|
| req.body.username (auth.js) | → query() param | database.js SQL execution |
| req.body (users.js) | → buildMongoQuery() | queryBuilder.js NoSQL query |
| req.body.template (users.js) | → renderTemplate() | templateEngine.js eval() |
| req.body.cardNumber (api.js) | → processPayment() | paymentService.js logging |
| req.body (api.js) | → sendEmail() | emailService.js exec() |
| req.body.username (auth.js) | → logAction() | logger.js log injection |

### 8. Reachability Analysis Test Cases
| File | Expected Result |
|------|----------------|
| src/routes/*.js | All functions: **REACHABLE** (Express route handlers) |
| src/utils/database.js | query(), buildInsert(): **REACHABLE** (imported by routes) |
| src/utils/logger.js | logAction(): **REACHABLE** (imported by auth.js) |
| src/services/paymentService.js | processPayment(): **REACHABLE** (imported by api.js) |
| src/legacy/deprecatedAdmin.js | All functions: **UNREACHABLE** (file not imported) |
| src/legacy/unusedHelpers.js | All functions: **UNREACHABLE** (file not imported) |
| src/legacy/deadCodeInImportedFile.js | validateCard(): **REACHABLE**, internalSQLHelper(): **UNREACHABLE**, unusedExportedFn(): **UNKNOWN** |
| src/config/database.js | **UNKNOWN** (exported but no route calls getConfig) |

### 9. Broken Sanitization
| Function | File | Issue |
|----------|------|-------|
| sanitizeInput() | utils/sanitizer.js | Only removes `<script>`, bypassable with `<img onerror>` |
| sanitizeSQL() | utils/sanitizer.js | Only escapes single quotes |
| sanitizePath() | utils/sanitizer.js | Only removes `../`, doesn't handle `..\` |
| validateURL() | utils/sanitizer.js | Doesn't check javascript: or data: schemes |

### 10. Other Vulnerabilities
| Vuln | File | Reachable? |
|------|------|------------|
| Prototype Pollution (Object.assign) | routes/admin.js | YES |
| Prototype Pollution (deep merge) | routes/api.js | YES |
| Unsafe Deserialization | routes/users.js (import) | YES |
| Open Redirect | routes/admin.js (redirect) | YES |
| HTTP Response Splitting | routes/admin.js (proxy) | YES |
| ReDoS | routes/admin.js (validate-regex, validate-email) | YES |
| Log Injection | routes/files.js (log), utils/logger.js | YES |
| Information Disclosure | Error handler in app.js | YES |
| Insecure CORS | app.js, config/security.js | YES |
| Missing Security Headers | app.js (no helmet) | YES |
| Mass Assignment | routes/users.js, models/user.js | YES |

## How to Test

1. Add this repository to your Vigilnz platform
2. Run a SAST scan with all categories enabled
3. Check results against this catalog:
   - All 50+ vulnerabilities should be detected
   - Reachable findings should keep original severity
   - Unreachable findings (legacy/*) should have downgraded severity
   - Cross-file taint flows should show data flow paths
   - Dead code functions should be marked as unreachable
