import { makeFromBoard, storageHelper } from '@agoric/client-utils';

const boardCtx = makeFromBoard();

export const bigIntReplacer = (_key, val) =>
  typeof val === 'bigint' ? Number(val) : val;

// XXX all this unmarshalling should be abstracted by client-utils
/**
 * Normalize response from fetchData
 *
 * @param {string[]} values
 * @returns {object} Pretty response
 */
export const decodeValues = (values) => {
  try {
    // XXX unserializeTxt expects vstorage responses, not just any CapData
    const unmarshalledValues = storageHelper.unserializeTxt(
      JSON.stringify({ value: JSON.stringify({ values }) }, bigIntReplacer),
      boardCtx,
    );
    return JSON.parse(JSON.stringify(unmarshalledValues, bigIntReplacer));
  } catch (e) {
    // It's not CapData, fall back to plain JSON
    return values.map(JSON.parse);
  }
};
