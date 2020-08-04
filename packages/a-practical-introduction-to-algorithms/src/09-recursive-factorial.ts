/*
 * In mathematics, the factorial of a positive integer n, denoted by n!,
 * is the product of all positive integers less than or equal to n:
 */

export const iterativeFactorial = (num: number): number => {
  // result = ( ( ( (1 * 2) * 3) * 4) * 5)
  let result = 1
  for (let index = 2; index <= num; index++) {
    // console.log(`result = ${result} * ${index} (${result * index})`)
    result *= index
  }
  return result
}
// console.log(iterativeFactorial(5))

export const factorial = (num: number): number => {
  if (num === 1) {
    // Base case
    console.log('factorial(1) === 1')
    return 1
  }

  console.log(` factorial(${num}) === ${num} * factorial(${num - 1})`)

  return num * factorial(num - 1)
}

console.log(factorial(5))
