/**
 * Authentication Middleware
 * SAST Categories: Broken Authentication, JWT Misuse, Hardcoded Secrets
 */
const jwt = require("jsonwebtoken");

// VULNERABILITY: Hardcoded JWT secret (same as in routes/auth.js)
const JWT_SECRET = "super-secret-key-never-change";

/**
 * Verify JWT token middleware
 * VULNERABILITIES:
 * - Hardcoded secret
 * - No algorithm restriction
 * - Token from multiple sources without priority
 */
function verifyToken(req, res, next) {
  // VULNERABILITY: Token accepted from multiple sources (query, header, cookie)
  const token =
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers.authorization?.replace("Bearer ", "") ||
    req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // VULNERABILITY: No algorithm specification — allows alg:none attack
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token", details: err.message });
  }
}

/**
 * Check admin role
 * VULNERABILITY: Role check based on JWT claims without server-side verification
 */
function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

/**
 * API key authentication
 * VULNERABILITY: Timing attack in string comparison
 */
function verifyApiKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  const validKey = "sk-live-1234567890abcdef";

  // VULNERABILITY: Timing attack — non-constant-time comparison
  if (apiKey === validKey) {
    next();
  } else {
    res.status(401).json({ error: "Invalid API key" });
  }
}

module.exports = { verifyToken, requireAdmin, verifyApiKey };
