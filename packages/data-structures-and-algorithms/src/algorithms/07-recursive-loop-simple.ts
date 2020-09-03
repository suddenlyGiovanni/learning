/* eslint-disable no-console */

export const loopNTimes = (num: number): string => {
  console.log('num ===', num)

  // Base case
  if (num <= 1) {
    return 'complete'
  }
  // Recursive condition
  return loopNTimes(num - 1)
}

export const main = (): void => {
  console.log(loopNTimes(3))
}
