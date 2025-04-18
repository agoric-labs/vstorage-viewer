import { makeFromBoard, storageHelper } from '@agoric/client-utils';

// Using 'any' for boardCtx as the exact type from makeFromBoard might be complex
// or not readily available without deeper library inspection.
const boardCtx: any = makeFromBoard();

// Type the replacer function
export const bigIntReplacer = (_key: string, val: unknown): unknown =>
  typeof val === 'bigint' ? Number(val) : val;

// XXX all this unmarshalling should be abstracted by client-utils
/**
 * Normalize response from fetchData
 *
 * @param {string[]} values - Array of stringified JSON or CapData values.
 * @returns {object | unknown[]} Pretty response - Either the unmarshalled object or an array of parsed JSON values.
 */
export const decodeValues = (values: string[]): object | unknown[] => {
  try {
    // XXX unserializeTxt expects vstorage responses, not just any CapData
    // Using 'any' for storageHelper methods if specific types aren't easily available.
    const unmarshalledValues = (storageHelper as any).unserializeTxt(
      JSON.stringify({ value: JSON.stringify({ values }) }, bigIntReplacer),
      boardCtx,
    );
    // The result after stringify/parse is likely a plain JS object/array, but 'unknown' is safer.
    return JSON.parse(
      JSON.stringify(unmarshalledValues, bigIntReplacer),
    ) as object; // Assume the primary goal is an object structure
  } catch (e) {
    console.warn('Failed to unserialize CapData, falling back to JSON.parse:', e);
    // Fallback returns an array of parsed values. Use 'unknown[]' for safety.
    return values.map((v) => {
      try {
        return JSON.parse(v);
      } catch (parseError) {
        console.error('Failed to parse value as JSON:', v, parseError);
        return v; // Return original string if JSON parsing fails
      }
    });
  }
};
