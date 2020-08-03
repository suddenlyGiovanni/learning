/*
 * Task 1: Write a function, times10, that takes an argument, n, and multiples n times 10
 * a simple multiplication fn
 */
type times10 = (a: number) => number
const times10: times10 = (x) => x * 10

console.log('~~~~~~~~~~~~~~TASK 1~~~~~~~~~~~~~~')
console.log('times10 returns:', times10(9))

/*
 * Task 2: Use an object to cache the results of your times10 function.
 * protip 1: Create a function that checks if the value for n has been calculated before.
 * protip 2: If the value for n has not been calculated, calculate and then save the result in the cache object.
 */

const cache = new Map<number, number>()

const memoTimes10: times10 = (x) => {
  // Check if the the operation has happen already
  if (cache.has(x)) {
    return cache.get(x) as number
  }
  const value = times10(x)
  cache.set(x, value)
  return value
}

console.log('~~~~~~~~~~~~~~TASK 2~~~~~~~~~~~~~~')
// Calculated
console.log('Task 2 calculated value:', memoTimes10(9))
// Cached
console.log('Task 2 cached value:', memoTimes10(9))
