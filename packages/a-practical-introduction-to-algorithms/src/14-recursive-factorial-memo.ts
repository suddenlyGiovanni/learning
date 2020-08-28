/*
  eslint-disable
  no-inline-comments,
  no-magic-numbers
*/

import assert from 'assert'

import { memoize } from './06-memoize-3'
/*
 * # Factorial
 * In mathematics, the factorial of a positive integer n, denoted by n!,
 * is the product of all positive integers less than or equal to n:
 *
 * ## Task 1:
 * Without peeking, write your own recursive factorial method
 *
 * ## Task 2:
 * Use your memo function from the previous exercise to memoize your factorial method
 */

export const factorial = memoize((n: number): number => {
  return n === 1
    ? 1 // Base case (fact(1) === 1)
    : n * factorial(n - 1) // Recursive case
})

const tailRecursiveFactorial = (number: number): number => {
  const go = memoize(
    (n: number, acc: number): number =>
      n === 1
        ? acc // Base case
        : go(n - 1, n * acc) // Recursive case
  )
  return go(number, 1)
}

export const main = (): void => {
  /*
   * Ex. fac(1) === 1  =>  1
   * ex. fac(2) === fac(1) * 2 => (1) * 2 => 2
   * ex. fac(3) === fac(2) * 3 => (1 * 2) * 3 => 6
   * ex. fac(4) === fac(3) * 4 => ((1 * 2) * 3) * 4 => 24
   * ex. fac(5) === fac(4) * 5 => (((1 * 2) * 3) * 4) * 5 => 120
   */
  assert.strictEqual(factorial(5) /* ?.$ */, 120)
  assert.strictEqual(tailRecursiveFactorial(5) /* ?.$ */, 120)
  assert.strictEqual(factorial(5), tailRecursiveFactorial(5))
}
