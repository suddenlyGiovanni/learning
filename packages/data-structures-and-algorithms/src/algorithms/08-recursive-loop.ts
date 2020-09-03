export const loopNTimes = (n: number): void => {
  console.log(`n === ${n}`)
  if (n <= 1) {
    return undefined
  }
  return loopNTimes(n - 1)
}
