/**
 * General API Routes
 * SAST Categories: Crypto vulnerabilities, Race conditions, Integer overflow,
 *                  Timing attacks, Unsafe regex, Buffer issues, Insecure TLS
 */
const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const https = require("https");
const { processPayment } = require("../services/paymentService");
const { sendEmail } = require("../services/emailService");

/**
 * POST /api/encrypt
 * VULNERABILITIES:
 * - Weak encryption (DES, ECB mode)
 * - Hardcoded encryption key
 * - Hardcoded IV
 */
router.post("/encrypt", (req, res) => {
  const { data } = req.body;

  // VULNERABILITY: Weak cipher (DES), hardcoded key and IV
  const key = Buffer.from("12345678");
  const iv = Buffer.from("12345678");
  const cipher = crypto.createCipheriv("des-ecb", key, "");

  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");

  res.json({ encrypted });
});

/**
 * POST /api/hash
 * VULNERABILITY: Weak hash algorithms
 */
router.post("/hash", (req, res) => {
  const { data, algorithm } = req.body;

  // VULNERABILITY: Allowing user to choose hash algorithm (could pick weak ones)
  // Also: MD5/SHA1 should not be used for security-sensitive hashing
  const hash = crypto.createHash(algorithm || "md5").update(data).digest("hex");

  res.json({ hash, algorithm: algorithm || "md5" });
});

/**
 * POST /api/verify-signature
 * VULNERABILITY: Timing attack in signature comparison
 */
router.post("/verify-signature", (req, res) => {
  const { message, signature, secret } = req.body;

  const expected = crypto.createHmac("sha256", secret || "default-secret").update(message).digest("hex");

  // VULNERABILITY: Timing attack - using === for crypto comparison
  if (signature === expected) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

/**
 * POST /api/payment
 * VULNERABILITIES:
 * - Cross-file taint: req.body flows to paymentService
 * - No input validation on amounts
 * - Race condition potential (double-spend)
 */
router.post("/payment", async (req, res) => {
  const { amount, cardNumber, cvv, recipient } = req.body;

  // VULNERABILITY: Logging sensitive payment data
  console.log(`Payment request: card=${cardNumber}, cvv=${cvv}, amount=${amount}`);

  // Cross-file taint: user input flows to payment service
  const result = await processPayment(amount, cardNumber, cvv, recipient);

  res.json(result);
});

/**
 * POST /api/send-email
 * VULNERABILITIES:
 * - Email header injection
 * - Cross-file taint to email service
 */
router.post("/send-email", (req, res) => {
  const { to, subject, body, cc } = req.body;

  // Cross-file taint: user input flows to email service
  const result = sendEmail(to, subject, body, cc);

  res.json(result);
});

/**
 * GET /api/fetch-url
 * VULNERABILITY: SSRF with TLS verification disabled
 */
router.get("/fetch-url", (req, res) => {
  const { url } = req.query;

  // VULNERABILITY: Disabling TLS certificate verification
  const options = {
    rejectUnauthorized: false,
    // VULNERABILITY: Allowing weak TLS protocols
    secureProtocol: "TLSv1_method",
  };

  https.get(url, options, (response) => {
    let data = "";
    response.on("data", (chunk) => { data += chunk; });
    response.on("end", () => {
      res.json({ content: data, headers: response.headers });
    });
  }).on("error", (err) => {
    res.status(500).json({ error: err.message });
  });
});

/**
 * POST /api/parse-json
 * VULNERABILITY: Prototype pollution via JSON.parse with reviver
 */
router.post("/parse-json", (req, res) => {
  const { jsonString } = req.body;

  try {
    // VULNERABILITY: Parsing untrusted JSON that could contain __proto__
    const parsed = JSON.parse(jsonString);

    // VULNERABILITY: Deep merge with user-controlled object
    const defaults = { theme: "light", lang: "en" };
    const merged = deepMerge(defaults, parsed);

    res.json({ merged });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * VULNERABILITY: Unsafe deep merge function
 */
function deepMerge(target, source) {
  for (const key in source) {
    if (typeof source[key] === "object" && source[key] !== null) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

/**
 * POST /api/generate-token
 * VULNERABILITY: Insecure random number generation
 */
router.post("/generate-token", (req, res) => {
  const { length } = req.body;

  // VULNERABILITY: Math.random() is not cryptographically secure
  let token = "";
  for (let i = 0; i < (length || 32); i++) {
    token += Math.floor(Math.random() * 16).toString(16);
  }

  res.json({ token });
});

/**
 * POST /api/process-template
 * VULNERABILITY: Template injection via string interpolation
 */
router.post("/process-template", (req, res) => {
  const { template, data } = req.body;

  // VULNERABILITY: Using Function constructor (equivalent to eval)
  const render = new Function("data", `return \`${template}\``);
  const result = render(data);

  res.json({ rendered: result });
});

module.exports = router;
