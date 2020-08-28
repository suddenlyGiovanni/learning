/*
 * --- Directions
 * Print out the n-th entry in the fibonacci series.
 * The fibonacci series is an ordering of numbers where
 * each number is the sum of the preceeding two.
 * For example, the sequence
 *  [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
 * forms the first ten entries of the fibonacci series.
 * Example:
 *   fib(4) === 3
 */

export const recursiveFib = (number: number): number => {
  return number < 2
    ? number
    : tailRecursiveFib(number - 2) + tailRecursiveFib(number - 1)
}

type NArityFn<Args extends unknown[] = unknown[], Result = unknown> = (
  ...args: [...Args]
) => Result

const memoize = <A extends unknown[], B>(
  fn: NArityFn<A, B>
): NArityFn<A, B> => {
  const hashMap = new Map<A, B>()
  return (...args) => {
    if (hashMap.has(args)) return hashMap.get(args)!
    const computedValue = fn(...args)
    hashMap.set(args, computedValue)
    return computedValue
  }
}

export const tailRecursiveFib = (number: number): number => {
  const go = memoize(
    (n: number, [currentFib, nextFib]: [number, number]): number => {
      if (n === 0) return currentFib
      if (n === 1) return nextFib
      return go(n - 1, [nextFib, currentFib + nextFib])
    }
  )
  return go(number, [0, 1])
}
