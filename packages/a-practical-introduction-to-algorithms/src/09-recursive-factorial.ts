/*
  eslint-disable
  no-console,
  no-inline-comments,
  no-magic-numbers,
*/

import assert from 'assert'
/*
 * In mathematics, the factorial of a positive integer n, denoted by n!,
 * is the product of all positive integers less than or equal to n:
 */

export const iterativeFactorial = (num: number): number => {
  // Result = ( ( ( (1 * 2) * 3) * 4) * 5)
  let result = 1
  for (let index = 2; index <= num; index++) {
    console.log(`result = ${result} * ${index} (${result * index})`)
    result *= index
  }
  return result
}

export const factorial = (num: number): number => {
  if (num === 1) {
    // Base case
    console.log('factorial(1) === 1')
    return 1
  }

  console.log(` factorial(${num}) === ${num} * factorial(${num - 1})`)

  return num * factorial(num - 1)
}

export const tailRecursiveFactorial = (num: number): number => {
  const go = (n: number, acc: number): number =>
    n === 1
      ? acc // Base case
      : go(n - 1, acc * n) // Recursive case

  return go(num, 1)
}

export const main = (): void => {
  assert.strictEqual(
    iterativeFactorial(5) /* ?.$*/,
    120,
    'iterative factorial(5) === 120'
  )

  assert.strictEqual(factorial(5) /* ?.$*/, 120, 'recursive factorial(5) === 120')

  assert.strictEqual(
    tailRecursiveFactorial(5) /* ?.$*/,
    120,
    'tail recursive factorial(5) === 120'
  )
}
