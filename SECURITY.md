# Security Policy

## About This Repository

This repository (`sast-js-api`) is an **intentionally vulnerable application** used for testing security scanning tools, including SAST (Static Application Security Testing) and Secret Scanning.

## ⚠️ Important Notice

### Intentional Vulnerabilities

This repository contains:

1. **Intentional security vulnerabilities** in `server.js`
2. **Fake/Example credentials** in test files:
   - `secrets-test.js` - JavaScript test file with 79+ credential types
   - `.env.example` - Environment file with 150+ example secrets
   - `config-secrets.yml` - YAML config with 100+ example secrets

### These Are NOT Real Secrets

**All credentials in this repository are:**
- ✅ Fake/Example values
- ✅ Non-functional patterns
- ✅ For testing purposes only
- ✅ Safe to commit
- ❌ NOT real production credentials
- ❌ NOT connected to any actual services
- ❌ NOT usable for accessing any systems

## Purpose

These files are used to:
1. Test our Secret Scanner detection capabilities
2. Validate pattern matching algorithms
3. Ensure comprehensive coverage of credential types
4. Train security teams on secret detection

## GitHub Push Protection

GitHub's push protection may flag these files. This is **expected behavior** and demonstrates that:
1. The secret patterns are realistic enough to trigger detection
2. GitHub's security features are working correctly
3. Our test data is comprehensive

### If You're a Repository Maintainer

To push these test files, you can:

1. **Use the GitHub web interface** to allow the specific secrets (one-time)
2. **Configure `.github/secret_scanning.yml`** to exclude test files (already done)
3. **Contact repository admins** for push permission bypass

## Real Security Concerns

If you discover **actual security issues** not related to intentional test files:
- Email: security@example.com
- Or open a private security advisory

## Safe Usage

✅ **Safe to use for:**
- Local development testing
- Security tool validation
- Training and education
- CI/CD pipeline testing

❌ **Do NOT:**
- Use any credentials from this repo in production
- Copy patterns without understanding they're fake
- Assume any credential is functional
- Deploy this code to production environments

## Testing Guidelines

When testing with this repository:

1. **Isolated Environment**: Always test in isolated/sandboxed environments
2. **No Real Data**: Never use with real customer/production data
3. **Network Isolation**: Block external network access when testing
4. **Documentation**: Document that tests use intentional vulnerabilities
5. **Cleanup**: Ensure test credentials don't leak to other systems

## Responsible Disclosure

This repository is **intentionally insecure by design**. However, if you find:

- Real credentials accidentally committed
- Unintended security issues
- Vulnerabilities in testing infrastructure

Please report them via our security disclosure process.

## Compliance

This repository complies with security testing best practices:

- All secrets are clearly marked as test data
- Comprehensive warnings in file headers
- Documentation of intentional nature
- Separation from production code
- Regular review of contents

## Contact

For questions about this security testing repository:
- Open an issue with the `security-testing` label
- Contact the Security Testing Team

---

**Last Updated:** January 26, 2025
**Repository Purpose:** Security Testing & Validation
**Status:** Intentionally Vulnerable for Testing
