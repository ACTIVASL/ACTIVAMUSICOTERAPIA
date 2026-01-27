/**
 * Recursively removes undefined values from an object or array.
 * Useful for sanitizing payloads before Firestore writes (which reject undefined).
 */
export const deepSanitize = <T>(obj: T): T => {
    // Base case: undefined returns undefined (to be filtered out by parent)
    if (obj === undefined) return undefined as any;
    // Base case: null or primitives return as is
    if (obj === null || typeof obj !== 'object') return obj;

    // Arrays: Map and filter undefineds
    if (Array.isArray(obj)) {
        return obj.map(deepSanitize).filter(v => v !== undefined) as any;
    }

    // Objects: Recursively clean keys
    const cleaned: any = {};
    Object.keys(obj).forEach(key => {
        const value = deepSanitize((obj as any)[key]);
        if (value !== undefined) {
            cleaned[key] = value;
        }
    });
    return cleaned as T;
};
