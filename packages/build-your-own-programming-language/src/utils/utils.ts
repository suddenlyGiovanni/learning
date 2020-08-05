import pipe from 'lodash.flow'
/**
 * This method invokes `interceptor` and returns `value`. The interceptor
 * is invoked with one argument; (value). The purpose of this method is to
 * "tap into" a method chain sequence in order to modify intermediate results.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Seq
 * @param {*} value The value to provide to `interceptor`.
 * @param {Function} interceptor The function to invoke.
 * @returns {*} Returns `value`.
 * @example
 *
 * _([1, 2, 3])
 *  .tap(function(array) {
 *    // Mutate input array.
 *    array.pop();
 *  })
 *  .reverse()
 *  .value();
 * // => [2, 1]
 */
function tap<T>(value: T, interceptor: (value: T) => void): T {
  interceptor(value)
  return value
}

/**
 * returns the head of the array
 * it does not
 */
function peek<T>(array: T[]): T {
  return array[0]
}

/**
 * NOT A PURE FUNCTION!!!
 * removes the head of the array and returns it.
 * In doing so it modify the original array ( IT MUTATE THE ORIGINAL ARRAY!!! )
 */
function pop<T>(array: T[]): T | undefined {
  return array.shift()
}

function log<T>(value: T): T {
  return tap(value, console.log)
}

export { peek, pop, tap, log, pipe }
