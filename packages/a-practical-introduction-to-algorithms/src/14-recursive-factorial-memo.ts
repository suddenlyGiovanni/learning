/*
 * Task 1: Without peeking, write your own recursive factorial method
 * Task 2: Use your memo function from the previous exercise to memoize your factorial method
 */

/*
 * TODO:
 * - identify base case
 * - identify recursive case
 * - return value where appropriate
 * - write a procedure that will bring you closer to your base case
 */

/*
 * In mathematics, the factorial of a positive integer n, denoted by n!,
 * is the product of all positive integers less than or equal to n:
 */

/*
 * Ex. fac(1) === 1  =>  1
 * ex. fac(2) === fac(1) * 2 => (1) * 2 => 2
 * ex. fac(3) === fac(2) * 3 => (1 * 2) * 3 => 6
 * ex. fac(4) === fac(3) * 4 => ((1 * 2) * 3) * 4 => 24
 * ex. fac(5) === fac(4) * 5 => (((1 * 2) * 3) * 4) * 5 => 120
 */
import { memoize } from './06-memoize-3'
export const factorial = memoize((n: number): number => {
  return n === 1
    ? 1 // Base case (fact(1) === 1)
    : n * factorial(n - 1) // Recursive case
})

console.log(factorial(5) === 120)
