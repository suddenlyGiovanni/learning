// Write a function returns the first two items in a list whose value add up exactly to k

/**
 * Returns the first two items in a list whose value add up exactly to k
 * @param {number[]} list - the list of items
 * @param {number} k - the summation goal
 * @return {undefined | [number, number]} - two items that add up to k
 */
export const findSumK = (
  list: number[],
  k: number
): undefined | [number, number] => {
  const sumTable = new Map<number, number>()

  for (const x of list) {
    const y = k - x
    // If the number is present multiple times in the list we can drop it
    if (!sumTable.has(y)) {
      sumTable.set(y, x)
    }
  }

  for (const x of list) {
    if (sumTable.has(x)) {
      const y = sumTable.get(x)!
      return [x, y]
    }
  }
  return undefined
}

export const main = (): void => {
  console.log(findSumK([1, 3, 7, 2, 5, 9], 8))
}
// main()
