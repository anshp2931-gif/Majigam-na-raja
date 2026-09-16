// worker/src/services/idGenerator.js
// Generates unique membership IDs in the format: {PREFIX}-YYYY-XXXXXX

const CHARSET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I, O, 0, 1 to avoid confusion

/**
 * Generates a cryptographically random alphanumeric suffix.
 */
function randomSuffix(length = 6) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => CHARSET[b % CHARSET.length])
    .join('');
}

/**
 * Generates a candidate ID: PREFIX-YYYY-XXXXXX
 */
export function generateCandidateId(prefix = 'MNR') {
  const year = new Date().getFullYear();
  const suffix = randomSuffix(6);
  return `${prefix}-${year}-${suffix}`;
}

/**
 * Generates a unique membership ID by checking MongoDB / D1 for collisions.
 * Retries up to maxAttempts times.
 */
export async function generateUniqueId(collection, maxAttempts = 10, prefix = 'MNR') {
  for (let i = 0; i < maxAttempts; i++) {
    const candidateId = generateCandidateId(prefix);
    const existing = await collection.findOne({ uniqueId: candidateId });
    if (!existing) {
      return candidateId;
    }
  }
  throw new Error('Failed to generate a unique ID after maximum attempts. Please try again.');
}
