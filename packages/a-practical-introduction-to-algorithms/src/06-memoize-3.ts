/* eslint-disable no-console */
export type UnaryFn<A, B> = (a: A) => B
export type NArityFn<Args extends unknown[], B> = (...args: [...Args]) => B
type times10 = (x: number) => number
export const times10: times10 = (x) => x * 10

/*
 * Task 4: Make your memo function generic and accept the times10 function as a callback rather than
 * defining the n * 10 logic inside the if/else or pulling it in from the global scope.
 *
 * Protip: Take advantage of the fact that parameters are saved in the closure as well, just like
 * the cache from the previous example.
 */

export const memoize = <A extends unknown[], B>(
  f: NArityFn<A, B>
): NArityFn<A, B> => {
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

// Returned function from memoizedAdd
const memoizedTimes10 = memoize(times10)
const memoizedTimes100 = memoize((x: number): number => x * 100)
const memoizedTimes = memoize((x: number, y: number): number => x * y)
console.log('~~~~~~~~~~~~~~TASK 4~~~~~~~~~~~~~~')
try {
  // Calculated
  console.log('Task 4 calculated value:', memoizedTimes10(9))
  console.log('Task 4 calculated value:', memoizedTimes100(9))
  console.log('Task 4 calculated value:', memoizedTimes(9, 1000))

  // Cached
  console.log('Task 4 cached value:', memoizedTimes10(9))
  console.log('Task 4 cached value:', memoizedTimes100(9))
  console.log('Task 4 cached value:', memoizedTimes(9, 1000))
} catch (err) {
  console.error('Task 4:', err)
}
