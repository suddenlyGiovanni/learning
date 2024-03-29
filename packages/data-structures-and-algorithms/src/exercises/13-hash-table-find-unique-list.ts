/*
 * Write a function that returns the unique, non-repeated value in a list
 */


/**
 * Returns the unique, non-repeated value
 * @template T
 * @param {Array<T>} list - a list with only 1 non-repeated character
 * @return {undefined | T} - the unique value
 */
export const unique = <T>(list: T[]): undefined | T => {
  const duplicateTable = new Map<T, number>()

  for (const el of list) {
    if (duplicateTable.has(el)) {
      // We have a repetition
      const occurrence = duplicateTable.get(el)!
      duplicateTable.set(el, occurrence + 1)
    } else {
      duplicateTable.set(el, 1)
    }
  }

  for (const [el, occurrences] of duplicateTable) {
    if (occurrences === 1) {
      return el
    }
  }
  return undefined
}
