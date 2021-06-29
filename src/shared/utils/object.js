

const _hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwnProperty(object, key) {
  return _hasOwnProperty.call(object, key);
}
