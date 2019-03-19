/* eslint-disable no-empty */

/* eslint-disable getter-return */

/* eslint-disable import/no-mutable-exports */
import { noop, isServer } from '.';
export var supportsPassive = false;

if (!isServer) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', {
      get: function get() {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    });
    window.addEventListener('test-passive', noop, opts);
  } catch (e) {}
}

export function on(target, event, handler, passive) {
  if (passive === void 0) {
    passive = false;
  }

  if (!isServer) {
    target.addEventListener(event, handler, supportsPassive ? {
      capture: false,
      passive: passive
    } : false);
  }
}
export function off(target, event, handler) {
  !isServer && target.removeEventListener(event, handler);
}
export function stop(event) {
  event.stopPropagation();
}
export function prevent(event) {
  event.preventDefault();
}