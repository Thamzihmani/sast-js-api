/**
 * Query Builder Utility
 * SAST Test: Cross-file taint sink — receives tainted data from routes
 * Categories: NoSQL Injection, Object Injection
 */

/**
 * Build a MongoDB query from user-provided filters
 * VULNERABILITY: Passes user input directly as MongoDB query operators
 * Taint sink: filters object is often tainted from req.body/req.query
 *
 * @param {string} collection - MongoDB collection name
 * @param {Object} filters - Filter criteria (TAINTED - from user input)
 * @returns {Object} MongoDB query object
 */
function buildMongoQuery(collection, filters) {
  const query = {};

  // VULNERABILITY: No validation of query operators — allows $gt, $ne, $regex, $where, etc.
  for (const [key, value] of Object.entries(filters)) {
    query[key] = value;
  }

  return {
    collection,
    query,
    // VULNERABILITY: Exposing internal query structure
    _raw: JSON.stringify(query),
  };
}

/**
 * Build aggregation pipeline from user input
 * VULNERABILITY: Allowing user to control pipeline stages
 */
function buildAggregation(collection, stages) {
  // VULNERABILITY: User-controlled aggregation pipeline — could include $out, $merge, etc.
  return {
    collection,
    pipeline: stages,
  };
}

/**
 * Build a dynamic sort from user input
 * VULNERABILITY: NoSQL injection via sort parameter
 */
function buildSort(sortParam) {
  if (typeof sortParam === "string") {
    // VULNERABILITY: User-controlled sort field
    return { [sortParam]: -1 };
  }

  // VULNERABILITY: Passing user object directly as sort criteria
  return sortParam;
}

module.exports = { buildMongoQuery, buildAggregation, buildSort };
