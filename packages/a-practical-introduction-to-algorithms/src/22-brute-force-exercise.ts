/**
 * Write a function, makeChange, that returns an integer that represents the least number of coins
 *  that add up to the amount, n.
 */

export const makeChange = (coins: number[], amount: number): number => {
  const canSubtract = (x: number, y: number): boolean => x - y >= 0
  const subtract = (x: number, y: number): number => x - y
  // Base case
  if (amount === 0) {
    return 0
  }
  let acc: number

  coins.forEach((coin) => {
    if (canSubtract(amount, coin)) {
      const currentMinCoins = makeChange(coins, subtract(amount, coin))
      if (acc === undefined || currentMinCoins < acc) {
        acc = currentMinCoins
      }
    }
  })

  return acc + 1
}

makeChange([1, 6, 10], 12) //?
