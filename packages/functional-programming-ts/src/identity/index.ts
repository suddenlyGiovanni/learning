/**
 * A function that returns the parameter supplied to it.
 * Good as a default or placeholder function.
 * @param value {any}
 */
export function identity<T = any>(value: T): T {
  return value;
}
