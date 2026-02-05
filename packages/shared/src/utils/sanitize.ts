/**
 * Recursively removes undefined values from an object or array.
 * Useful for sanitizing payloads before Firestore writes (which reject undefined).
 */
export const deepSanitize = <T>(obj: T): T => {
  // Base case: undefined returns undefined (to be filtered out by parent)
  if (obj === undefined) return undefined as unknown as T;

  // Base case: null is valid JSON/Firestore
  if (obj === null) return obj;

  // Base case: Check for primitives (string, number, boolean, symbol, function)
  if (typeof obj !== 'object') return obj;

  // Arrays: Map and filter undefineds
  if (Array.isArray(obj)) {
    return obj.map((item) => deepSanitize(item)).filter((v) => v !== undefined) as unknown as T;
  }

  // Objects: Recursively clean keys
  const cleaned: Record<string, unknown> = {};
  Object.keys(obj).forEach((key) => {
    // Assert key access is safe since we verified it's an object
    const value = deepSanitize((obj as Record<string, unknown>)[key]);
    if (value !== undefined) {
      cleaned[key] = value;
    }
  });

  return cleaned as unknown as T;
};
