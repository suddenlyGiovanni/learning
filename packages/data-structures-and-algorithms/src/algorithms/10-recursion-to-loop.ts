/*
  eslint-disable
  no-console,
  no-magic-numbers,
  no-inline-comments,
*/

/**
 * An effectfull fn that logs to the console all the natural number included in the bound
 * internally it uses a loop to iterate through the numbers
 * @param {number} start
 * @param {number} end
 * @param {(str: string) => void} [cb=console.log]
 */
export const logNumbers = (
  start: number,
  end: number,
  cb: (str: string) => void = console.log
): void => {
  cb(`iteratively looping from ${start} until ${end}`)

  for (let i = start; i <= end; i++) {
    cb(`hitting index: ${i}`)
  }
}

/**
 * An effectfull fn that logs to the console all the natural number included in the bound
 * internally it uses recursion to iterate through the numbers
 * @param {number} start
 * @param {number} end
 * @param {(str: string) => void} [cb=console.log]
 */
export const logNumbersRecursively = (
  start: number,
  end: number,
  cb: (str: string) => void = console.log
): void => {
  cb(`recursively looping from ${start} until ${end}`)

  const recurse = (i: number): void => {
    cb(`hitting index: ${i}`)
    return i >= end
      ? undefined // Base case
      : recurse(i + 1) // Recursive case (tail recursion)
  }

  recurse(start)
}

export const main = (): void => {
  console.log('~~~ logNumbers ~~~')
  logNumbers(1, 3, console.log)

  console.log('~~~ logNumbersRecursively ~~~')
  logNumbersRecursively(1, 3, console.log)
}
