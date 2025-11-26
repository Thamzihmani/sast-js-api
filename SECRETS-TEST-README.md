# Secret Scanning Test Suite

## Overview

This directory contains intentionally vulnerable files for testing the **Secret Scanner** module. These files contain various types of hardcoded credentials, API keys, tokens, and sensitive information that should be detected by secret scanning tools.

## ⚠️ IMPORTANT WARNING

**ALL SECRETS IN THESE FILES ARE FOR TESTING PURPOSES ONLY!**

- ❌ **DO NOT** use any of these credentials in production
- ❌ **DO NOT** commit real secrets to version control
- ❌ These are example patterns only
- ✅ Use these files to validate secret detection capabilities
- ✅ Safe for security testing and development

---

## Test Files

### 1. `secrets-test.js`
**Comprehensive JavaScript file with 79+ different types of secrets**

Contains hardcoded secrets in JavaScript/Node.js format covering:
- Cloud Provider Credentials (AWS, GCP, Azure, DigitalOcean, Heroku, IBM, Alibaba, Oracle)
- Version Control & CI/CD (GitHub, GitLab, Bitbucket, Jenkins, CircleCI, Travis, etc.)
- Payment Services (Stripe, PayPal, Square, Braintree, Plaid, Coinbase)
- Communication Services (Slack, Twilio, SendGrid, Discord, Telegram, etc.)
- Database Credentials (MongoDB, PostgreSQL, MySQL, Redis, Elasticsearch, etc.)
- API Services (OpenAI, Anthropic, Google Maps, Firebase, Auth0, Okta, etc.)
- Encryption Keys (RSA, SSH, PGP, JWT, AES)
- Container & Orchestration (Docker, Kubernetes, Terraform, Ansible)
- Monitoring & Logging (Datadog, New Relic, Sentry, Splunk, etc.)
- And many more...

**Key Features:**
- Realistic credential patterns
- Multiple detection scenarios
- Commented sections for easy navigation
- Export module for testing purposes

---

### 2. `.env.example`
**Environment variables file with 150+ exposed secrets**

Simulates a real `.env` file with:
- Application configuration
- Database connection strings
- Cloud provider credentials
- Authentication secrets
- Third-party API keys
- Service integrations
- Admin credentials (anti-pattern)
- Connection URLs with embedded credentials

**Key Features:**
- Organized by service category
- Realistic environment variable naming
- Common anti-patterns developers make
- Connection strings with embedded credentials
- Multiple formats (URLs, tokens, keys)

---

### 3. `config-secrets.yml`
**YAML configuration file with nested secret structures**

Contains secrets in YAML format covering:
- Hierarchical configuration structure
- Nested secret objects
- Multi-line private keys
- Complex connection strings
- Service account credentials
- OAuth configurations

**Key Features:**
- YAML-specific patterns
- Nested data structures
- Multi-line string secrets (private keys)
- Configuration file patterns
- Real-world config structure

---

### 4. `server.js`
**Existing vulnerable Express API**

Contains:
- Hardcoded credentials in code
- SQL injection vulnerabilities
- Command injection vulnerabilities
- AWS credentials
- JWT secrets
- Database passwords

---

## Secret Categories Covered

### 🌩️ **Cloud Providers (8 providers, 20+ patterns)**
- AWS (Access Keys, Secret Keys, Session Tokens)
- Google Cloud Platform (API Keys, Service Accounts)
- Microsoft Azure (Client Secrets, Connection Strings)
- DigitalOcean (Access Tokens, Spaces Keys)
- Heroku (API Keys, OAuth Tokens)
- IBM Cloud (API Keys, HMAC Keys)
- Alibaba Cloud (Access Keys)
- Oracle Cloud (OCIDs, Private Keys)

### 🔧 **Version Control & CI/CD (8 systems, 15+ patterns)**
- GitHub (Personal Tokens, OAuth, App Tokens, Refresh Tokens)
- GitLab (Personal Tokens, Runner Tokens)
- Bitbucket (App Passwords, Client Secrets)
- Jenkins (API Tokens)
- CircleCI (Tokens)
- Travis CI (Tokens)
- Azure DevOps (Personal Access Tokens)
- TeamCity (Tokens)

### 💳 **Payment & Financial (6 services, 12+ patterns)**
- Stripe (Secret Keys, Live Keys, Restricted Keys, Publishable Keys)
- PayPal (Client ID/Secret, Access Tokens)
- Square (Access Tokens, App Secrets)
- Braintree (Public/Private Keys, Merchant IDs)
- Plaid (Client ID/Secret)
- Coinbase (API Keys/Secrets)

### 📱 **Communication Services (7 systems, 15+ patterns)**
- Slack (Bot Tokens, User Tokens, Webhooks, App Tokens)
- Twilio (Account SID, Auth Tokens, API Keys/Secrets)
- SendGrid (API Keys)
- Mailgun (API Keys, Private Keys)
- MessageBird (API Keys)
- Discord (Bot Tokens, Webhooks, Client Secrets)
- Telegram (Bot Tokens)

### 🗄️ **Databases (7 types, 10+ patterns)**
- MongoDB (Connection URIs, Credentials)
- PostgreSQL (Connection URLs, Passwords)
- MySQL (Connection URIs)
- Redis (URLs with passwords)
- Elasticsearch (URLs with credentials)
- Cassandra (Passwords)
- CouchDB (URLs with credentials)

### 🔑 **API Services (18 services, 25+ patterns)**
- OpenAI (API Keys, Organization Keys)
- Anthropic Claude (API Keys)
- Google Maps (API Keys)
- Firebase (API Keys, Config Objects)
- Auth0 (Client Secrets, Domains)
- Okta (API Tokens, Client Secrets)
- Datadog (API/App Keys)
- New Relic (License Keys, API Keys)
- Sentry (DSN, Auth Tokens)
- PagerDuty (API Keys)
- Algolia (API Keys, App IDs)
- MapBox (Access Tokens)
- Contentful (Access Tokens)
- Cloudflare (API Tokens/Keys)
- Docker Hub (Tokens)
- npm (Tokens)
- PyPI (Tokens)
- NuGet (API Keys)

### 🔐 **Encryption & Keys (6 types, 10+ patterns)**
- RSA Private Keys
- SSH Private Keys
- PGP Private Keys
- JWT Signing Secrets
- AES Encryption Keys
- Master Encryption Keys

### 🐳 **Container & Orchestration (4 systems, 8+ patterns)**
- Docker (Registry Passwords, Tokens)
- Kubernetes (Service Tokens, Secrets)
- Terraform Cloud (Tokens)
- Ansible Vault (Passwords)

### 📊 **Monitoring & Logging (4 systems, 8+ patterns)**
- Splunk (Tokens)
- Loggly (Tokens)
- Papertrail (Tokens)
- LogDNA (Ingestion Keys)

### 📦 **Storage & CDN (2 services, 5+ patterns)**
- Cloudinary (API Keys/Secrets, URLs)
- Amazon S3 (Presigned URLs)

### 📱 **Mobile & Push Notifications (3 services, 6+ patterns)**
- Firebase Cloud Messaging (Server Keys)
- Apple Push Notification Service (Auth Keys)
- OneSignal (API Keys, REST API Keys)

### 🧪 **Testing Services (2 services, 4+ patterns)**
- BrowserStack (Access Keys)
- Sauce Labs (Access Keys)

### 🛒 **E-Commerce (2 platforms, 6+ patterns)**
- Shopify (Access Tokens, API Keys, Passwords)
- WooCommerce (Consumer Keys/Secrets)

### 📈 **Analytics & Marketing (4 services, 8+ patterns)**
- Google Analytics (Measurement IDs, API Secrets)
- Mixpanel (Tokens, API Secrets)
- Segment (Write Keys)
- Amplitude (API Keys)

### 👥 **CRM & Customer Support (4 systems, 8+ patterns)**
- Salesforce (Access Tokens, Client Secrets, Security Tokens)
- HubSpot (API Keys)
- Intercom (Access Tokens)
- Zendesk (API Tokens)

---

## Testing Methodology

### How to Use These Files

1. **Run Secret Scanner on the entire directory:**
   ```bash
   # Scan all files
   npm run secret-scan ./
   ```

2. **Test individual files:**
   ```bash
   # JavaScript secrets
   npm run secret-scan ./secrets-test.js

   # Environment variables
   npm run secret-scan ./.env.example

   # YAML configuration
   npm run secret-scan ./config-secrets.yml
   ```

3. **Expected Results:**
   - Total secrets detected: **200+**
   - Categories covered: **15+**
   - File types: JavaScript, Environment Files, YAML, Config
   - Severity levels: Critical, High, Medium

### Validation Checklist

Your secret scanner should detect:

- ✅ Cloud provider credentials (AWS, GCP, Azure, etc.)
- ✅ Version control tokens (GitHub, GitLab, Bitbucket)
- ✅ Payment service keys (Stripe, PayPal, Square)
- ✅ Communication service tokens (Slack, Twilio, SendGrid)
- ✅ Database connection strings with passwords
- ✅ API keys and tokens (OpenAI, Firebase, Auth0, etc.)
- ✅ Private keys (RSA, SSH, PGP)
- ✅ JWT secrets and signing keys
- ✅ Container registry credentials
- ✅ OAuth client secrets
- ✅ Webhook secrets
- ✅ Admin credentials
- ✅ Connection URLs with embedded credentials
- ✅ Multi-line private keys
- ✅ Environment variables with secrets

---

## Secret Detection Patterns

### High-Entropy Strings
- Random-looking strings with high Shannon entropy
- Base64-encoded credentials
- Hexadecimal keys

### Keyword-Based Detection
- Variables named: `password`, `secret`, `token`, `key`, `credential`
- Connection strings with `://` and `@`
- Common prefixes: `sk_`, `pk_`, `AKIA`, `ghp_`, etc.

### Pattern-Based Detection
- AWS Access Keys: `AKIA[A-Z0-9]{16}`
- GitHub Tokens: `ghp_[a-zA-Z0-9]{36}`
- JWT Tokens: `eyJ[a-zA-Z0-9-_]+\.eyJ[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+`
- Private Keys: `-----BEGIN.*PRIVATE KEY-----`
- Connection Strings: `protocol://user:pass@host`

### Context-Based Detection
- Variable names + value patterns
- Comment indicators
- Configuration file structures

---

## Expected Scanner Output

Your scanner should provide:

1. **Finding Details:**
   - File path and line number
   - Secret type (e.g., "AWS Access Key", "GitHub Token")
   - Severity level (Critical/High/Medium/Low)
   - Masked value preview
   - Confidence score

2. **Risk Analysis:**
   - Shannon entropy calculation
   - Context keywords detected
   - Variable name analysis
   - Potential impact assessment

3. **Remediation Guidance:**
   - Recommended actions
   - Documentation links
   - Key rotation guides
   - Best practices

---

## Statistics

### Total Coverage
- **79+ distinct credential types**
- **200+ individual secrets**
- **15+ major categories**
- **3 file formats** (JS, ENV, YAML)
- **50+ service providers**

### Files Overview
```
secrets-test.js         ~700 lines    79+ secret types
.env.example           ~350 lines    150+ secrets
config-secrets.yml     ~400 lines    100+ secrets
server.js              ~300 lines    10+ secrets
───────────────────────────────────────────────────
TOTAL                  ~1750 lines   339+ secrets
```

---

## Best Practices Demonstrated (Anti-Patterns)

These files demonstrate **what NOT to do:**

❌ Hardcoding credentials in source code
❌ Committing `.env` files to version control
❌ Storing secrets in configuration files
❌ Embedding credentials in URLs
❌ Using weak or predictable secrets
❌ Storing private keys in repositories
❌ Leaving admin credentials in code
❌ Using production secrets in development

## What TO do instead:

✅ Use environment variables (real ones, not committed)
✅ Use secret management services (AWS Secrets Manager, HashiCorp Vault)
✅ Rotate credentials regularly
✅ Use IAM roles and temporary credentials
✅ Implement least privilege access
✅ Scan for secrets before committing
✅ Use `.gitignore` for sensitive files
✅ Encrypt secrets at rest and in transit

---

## Integration Testing

### CI/CD Integration
```yaml
# Example GitHub Actions workflow
- name: Run Secret Scanner
  run: |
    npm run secret-scan ./ --fail-on-findings
```

### Pre-commit Hook
```bash
#!/bin/bash
# Run secret scanner before commit
npm run secret-scan $(git diff --cached --name-only)
```

---

## Compliance & Standards

These test files help validate compliance with:

- **OWASP Top 10** - A02: Cryptographic Failures
- **OWASP ASVS** - V2: Authentication, V6: Cryptography
- **CWE-798** - Use of Hard-coded Credentials
- **PCI DSS** - Requirement 3 (Protect stored data)
- **GDPR** - Data protection requirements
- **SOC 2** - Security controls
- **ISO 27001** - Information security management

---

## Maintenance

### Updating Test Files

When adding new secret patterns:

1. Add to appropriate category in `secrets-test.js`
2. Add environment variable in `.env.example`
3. Add YAML configuration in `config-secrets.yml`
4. Update this README with new counts
5. Add to validation checklist

### Version History

- **v1.0** (2025-01-26) - Initial comprehensive test suite
  - 79+ credential types
  - 200+ individual secrets
  - 15+ categories
  - 3 file formats

---

## Support

For questions or issues with the secret scanner:

1. Check scanner logs and console output
2. Verify all file formats are supported
3. Ensure pattern matching is enabled
4. Review entropy calculation settings
5. Validate confidence thresholds

---

## License

These test files are provided for **security testing purposes only**.
Use responsibly and only in authorized testing environments.

---

**Last Updated:** January 26, 2025
**Test Suite Version:** 1.0
**Total Secrets:** 339+
**Categories:** 15+
**Coverage:** Comprehensive
