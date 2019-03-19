/* eslint-disable no-use-before-define */
import { isDef, isObj } from '.';
var hasOwnProperty = Object.prototype.hasOwnProperty;

function assignKey(to, from, key) {
  var val = from[key];

  if (!isDef(val) || hasOwnProperty.call(to, key) && !isDef(to[key])) {
    return;
  }

  if (!hasOwnProperty.call(to, key) || !isObj(val)) {
    to[key] = val;
  } else {
    to[key] = deepAssign(Object(to[key]), from[key]);
  }
}

export function deepAssign(to, from) {
  Object.keys(from).forEach(function (key) {
    assignKey(to, from, key);
  });
  return to;
}