/*
  eslint-disable
  no-console,
  no-magic-numbers
*/

type times10 = (x: number) => number
export const times10: times10 = (x) => x * 10

/*
 * Task 3:
 * Clean up your global scope by moving your cache inside your function.
 * - pro-tip:
 *   Use a closure to return a function that you can call later.
 */

export const memoizedClosureTimes10 = (): ((x: number) => number) => {
  const cache = new Map<number, number>()
  return (x: number): number => {
    if (cache.has(x)) {
      return cache.get(x) as number
    }

    const value = times10(x)
    cache.set(x, value)
    return value
  }
}

export const main = (): void => {
  const memoClosureTimes10 = memoizedClosureTimes10()
  try {
    // Calculated
    console.log('Task 3 calculated value:', memoClosureTimes10(9))
    // Cached
    console.log('Task 3 cached value:', memoClosureTimes10(9))
  } catch (error: unknown) {
    console.error('Task 3:', error)
  }
}
