/**
 * Email Service
 * SAST Test: Cross-file taint sink — receives tainted data from routes
 * Categories: Email Header Injection, Command Injection, Information Disclosure
 */
const { exec } = require("child_process");

/**
 * Send an email
 * VULNERABILITIES:
 * - Email header injection (CRLF in to/subject)
 * - Command injection via sendmail
 * - Taint sink: all parameters are user-controlled from api.js
 *
 * @param {string} to - Recipient email (TAINTED)
 * @param {string} subject - Email subject (TAINTED)
 * @param {string} body - Email body (TAINTED)
 * @param {string} cc - CC recipients (TAINTED)
 */
function sendEmail(to, subject, body, cc) {
  // VULNERABILITY: Email header injection — CRLF characters in headers
  const headers = [
    `To: ${to}`,
    `Subject: ${subject}`,
    `CC: ${cc || ""}`,
    `Content-Type: text/html`,
    `X-Mailer: VulnerableApp/1.0`,
  ].join("\r\n");

  // VULNERABILITY: Command injection via sendmail
  const command = `echo "${body}" | sendmail -t ${to}`;

  try {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Email send error:", error.message);
      }
    });
  } catch (err) {
    console.error("Email error:", err);
  }

  return { sent: true, to, subject };
}

/**
 * Send email with template
 * VULNERABILITY: SSTI via template rendering
 */
function sendTemplatedEmail(to, templateName, data) {
  const { renderTemplate } = require("../utils/templateEngine");

  // VULNERABILITY: Cross-file taint — data flows to template engine
  const body = renderTemplate(`Hello {{username}}, ${data.customMessage}`, data);

  return sendEmail(to, data.subject || "Notification", body);
}

module.exports = { sendEmail, sendTemplatedEmail };
