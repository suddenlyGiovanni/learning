export const loopNTimes = (num: number): string => {
  console.log('num ===', num)

  // Base case
  if (num <= 1) {
    return 'complete'
  }
  // Recursive condition
  return loopNTimes(num - 1)
}

console.log( loopNTimes(3))
