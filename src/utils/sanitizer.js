/**
 * Sanitizer Utility
 * SAST Test: Incomplete/broken sanitization — these functions look like they
 * sanitize input but actually have bypasses, testing whether the scanner
 * detects that sanitization is insufficient.
 */

/**
 * "Sanitize" user input
 * VULNERABILITY: Incomplete sanitization — only removes <script>, can be bypassed
 * with <img onerror>, <svg onload>, etc.
 */
function sanitizeInput(input) {
  if (typeof input !== "string") return input;

  // VULNERABILITY: Blacklist-based XSS prevention (easily bypassed)
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

/**
 * "Sanitize" SQL input
 * VULNERABILITY: Only escapes single quotes — doesn't handle backslash escapes,
 * double quotes, or other injection vectors
 */
function sanitizeSQL(input) {
  if (typeof input !== "string") return input;

  // VULNERABILITY: Incomplete SQL escaping
  return input.replace(/'/g, "''");
}

/**
 * "Sanitize" file path
 * VULNERABILITY: Only removes ../ but doesn't handle ..\ or encoded paths
 */
function sanitizePath(filePath) {
  if (typeof filePath !== "string") return filePath;

  // VULNERABILITY: Incomplete path sanitization
  return filePath.replace(/\.\.\//g, "");
}

/**
 * "Validate" URL
 * VULNERABILITY: Incomplete URL validation — doesn't check for javascript: or data: schemes
 */
function validateURL(url) {
  if (typeof url !== "string") return false;

  // VULNERABILITY: Only checks for http/https prefix, doesn't validate properly
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * "Sanitize" HTML
 * VULNERABILITY: Only strips certain tags, doesn't handle attribute-based XSS
 */
function sanitizeHTML(input) {
  if (typeof input !== "string") return input;

  // VULNERABILITY: Incomplete HTML sanitization — event handlers not removed
  return input
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "");
}

module.exports = { sanitizeInput, sanitizeSQL, sanitizePath, validateURL, sanitizeHTML };
