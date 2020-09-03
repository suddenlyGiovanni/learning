/*
  eslint-disable
  max-statements,
  no-console,
  no-magic-numbers,
*/

import assert from 'assert'

import { NArityFn } from '../types'

/*
 * # Task 4:
 * Make your memo function generic and accept the times10 function as a callback rather than
 * defining the n * 10 logic inside the if/else or pulling it in from the global scope.
 *
 * - Pro-tip:
 *   Take advantage of the fact that parameters are saved in the closure as well, just like
 *   the cache from the previous example.
 */

export function memoize<A extends unknown[], B>(
  f: NArityFn<A, B>
): NArityFn<A, B> {
  const cache = new Map<A, B>()
  return (...args) => {
    if (cache.has(args)) {
      return cache.get(args) as B
    }
    const value = f(...args)
    cache.set(args, value)
    return value
  }
}

export const main = (): void => {
  type times10 = (x: number) => number
  const times10: times10 = (x) => x * 10

  // Returned function from memoizedAdd
  const memoizedTimes10 = memoize(times10)
  const memoizedTimes100 = memoize((x: number): number => x * 100)
  const memoizedTimes = memoize((x: number, y: number): number => x * y)
  try {
    // Calculated
    assert.strictEqual(memoizedTimes10(9), 90, 'Task 4 calculated value: 90')
    assert.strictEqual(memoizedTimes100(9), 900, 'Task 4 calculated value: 900')
    assert.strictEqual(
      memoizedTimes(9, 1000),
      9000,
      'Task 4 calculated value: 9000'
    )

    // Cached
    assert.strictEqual(memoizedTimes10(9), 90, 'Task 4 cached value: 90')
    assert.strictEqual(memoizedTimes100(9), 900, 'Task 4 cached value: 900')
    assert.strictEqual(
      memoizedTimes(9, 1000),
      9000,
      'Task 4 cached value: 9000'
    )
  } catch (err) {
    console.error('Task 4:', err)
  }
}
