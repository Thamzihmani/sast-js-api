/**
 * Security Configuration
 * SAST Categories: Insecure Defaults, Weak Crypto Config, Information Disclosure
 */
const crypto = require("crypto");

// VULNERABILITY: Hardcoded encryption keys
// vigilnz-ignore-start
const ENCRYPTION_KEY = "aes256-key-1234567890abcdef";
const SIGNING_KEY = "hmac-signing-secret-key-12345";
// vigilnz-ignore-end

// VULNERABILITY: Weak session configuration
const SESSION_CONFIG = {
  secret: "keyboard-cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,       // VULNERABILITY: Cookies sent over HTTP
    httpOnly: false,     // VULNERABILITY: Cookies accessible via JavaScript
    sameSite: "none",    // VULNERABILITY: No CSRF protection
    maxAge: 365 * 24 * 60 * 60 * 1000, // VULNERABILITY: 1-year session
  },
};

// VULNERABILITY: Permissive CORS configuration
const CORS_CONFIG = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["*"],
};

/**
 * Encrypt data with hardcoded key
 * VULNERABILITY: Hardcoded key, weak IV generation
 */
function encrypt(data) {
  // VULNERABILITY: Static IV
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY.padEnd(32)), iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

/**
 * Generate a token
 * VULNERABILITY: Uses Math.random() instead of crypto.randomBytes()
 */
function generateToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

module.exports = { ENCRYPTION_KEY, SIGNING_KEY, SESSION_CONFIG, CORS_CONFIG, encrypt, generateToken };
