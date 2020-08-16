/* eslint-disable no-inline-comments */
import assert from 'assert'

/**
 * Write a function that removes duplicates characters from a string
 */

/**
 * Removes duplicates characters from a string
 * @param {string} str - the string
 * @return {string} - a string without duplicates
 */
export const removeDuplicates = (str: string): string => {
  const duplicates = new Set<string>()
  return str.split('').reduce((acc, chr) => {
    return duplicates.has(chr)
      ? acc // There is already a chr, so drop the current one
      : (duplicates.add(chr), acc + chr) // add the chr to the duplicate map and also to the output
  }, '')
}

export const main = (): void => {
  assert.strictEqual(removeDuplicates('mississippi'), 'misp')
}
// main()
