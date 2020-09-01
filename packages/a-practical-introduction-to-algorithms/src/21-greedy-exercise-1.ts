/* eslint-disable max-statements, id-length */

import assert from 'assert'

type int = number
export const makeChange = (coins: readonly int[], amount: int): int[] => {
  const coinSet = coins.slice().sort((x, y) => y - x)
  const canSubtract = (a: int, b: int): boolean => a - b >= 0
  const subtract = (a: int, b: int): int => a - b
  const accumulator: int[] = []
  let remainder = amount

  while (remainder > 0) {
    const [head, ...tail] = coinSet

    // There are still coins to be used
    if (head) {
      // Can subtract the bigger cut available from the reminder
      if (canSubtract(remainder, head)) {
        // Subtract
        remainder = subtract(remainder, head)
        // Add the coin to the list of used coins
        accumulator.push(head)
      } else {
        // If the bigger cut could not be use then remove it from the available coin set
        coinSet.shift()
      }
    }
  }

  return accumulator
}

export const main = (): void => {
  /**
   * Write a function, makeChange, that returns an integer that represents the least number of coins
   * that add up to an amount where the amount is always divisible by 5.
   *
   * Coin values: 5, 10, 25
   *
   * Input amount: 40 , output # of coins: 3 (25, 10, 5)
   *
   * Input amount: 35, output # of coins: 2 (25, 10)
   */

  assert.deepStrictEqual(makeChange([5, 10, 25], 50), [25, 25])
  assert.deepStrictEqual(makeChange([5, 10, 25], 40), [25, 10, 5])
  assert.deepStrictEqual(makeChange([5, 10, 25], 35), [25, 10])
}
