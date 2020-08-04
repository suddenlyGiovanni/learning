/**
 * An effectfull fn that logs to the console all the natural number included in the bound
 * internally it uses a loop to iterate through the numbers
 * @param {number} start
 * @param {number} end
 * @returns void
 */
export const logNumbers = (start: number, end: number): void => {
  console.log(`iteratively looping from ${start} until ${end}`)

  for (let i = start; i <= end; i++) {
    console.log('hitting index', i)
  }
}

console.log('~~~ logNumbers ~~~')
logNumbers(1, 2)

/**
 * An effectfull fn that logs to the console all the natural number included in the bound
 * internally it uses recursion to iterate through the numbers
 * @param {number} start
 * @param {number} end
 * @returns void
 */
export const logNumbersRecursively = (start: number, end: number): void => {
  console.log(`recursively looping from ${start} until ${end}`)

  // eslint-disable-next-line func-style
  const recurse = (i: number): void => {
    console.log('hitting index', i)
    return i < end ? recurse(i + 1) : undefined
  }

  recurse(start)
}

console.log('~~~ logNumbersRecursively ~~~')
logNumbersRecursively(1, 3)
