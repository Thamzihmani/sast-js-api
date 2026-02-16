/**
 * Template Engine Utility
 * SAST Test: Cross-file taint sink — receives tainted templates from routes
 * Categories: Server-Side Template Injection (SSTI), Code Injection
 */

/**
 * Render a user-provided template string
 * VULNERABILITY: SSTI — user-controlled template with eval-like execution
 * Taint sink: template parameter comes from user input (req.body.template)
 *
 * @param {string} template - Template string (TAINTED)
 * @param {Object} context - Template context variables
 * @returns {string} Rendered template
 */
function renderTemplate(template, context) {
  if (!template || typeof template !== "string") {
    return "";
  }

  // VULNERABILITY: Code injection via Function constructor
  // User can inject arbitrary JavaScript in the template
  let rendered = template;
  for (const [key, value] of Object.entries(context)) {
    rendered = rendered.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
  }

  // VULNERABILITY: eval-based template expressions like ${...}
  rendered = rendered.replace(/\$\{([^}]+)\}/g, (match, expr) => {
    try {
      return eval(expr);
    } catch {
      return match;
    }
  });

  return rendered;
}

/**
 * Compile a template to a function
 * VULNERABILITY: Function constructor used with user-controlled template
 */
function compileTemplate(templateSource) {
  // VULNERABILITY: new Function() with user-controlled code
  return new Function("data", `
    with (data) {
      return \`${templateSource}\`;
    }
  `);
}

module.exports = { renderTemplate, compileTemplate };
