/**
 * Is image source
 */
export function isSrc(url) {
  return /^(https?:)?\/\/|data:image/.test(url);
}