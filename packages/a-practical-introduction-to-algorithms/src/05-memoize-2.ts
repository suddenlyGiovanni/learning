type times10 = (x: number) => number
export const times10: times10 = (x) => x * 10

/*
 * Task 3: Clean up your global scope by moving your cache inside your function.
 * protip: Use a closure to return a function that you can call later.
 */

const memoizedClosureTimes10 = () => {
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

const memoClosureTimes10 = memoizedClosureTimes10()
console.log('~~~~~~~~~~~~~~TASK 3~~~~~~~~~~~~~~')
try {
  // Calculated
  console.log('Task 3 calculated value:', memoClosureTimes10(9))
  // Cached
  console.log('Task 3 cached value:', memoClosureTimes10(9))
} catch (e) {
  console.error('Task 3:', e)
}
