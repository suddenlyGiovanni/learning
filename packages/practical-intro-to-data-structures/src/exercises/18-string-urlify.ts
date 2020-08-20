import assert from 'assert'

/**
 * # URLify a given string (Replace spaces is %20)
 * Write a method to replace all the spaces in a string with ‘%20’.
 * You may assume that the string has sufficient space at the end to hold the additional
 * characters, and that you are given the “true” length of the string.
 *
 * @example
 * Input : "Mr John Smith", 13
 * Output : Mr%20John%20Smith
 *
 * Input : "Mr John Smith   ", 13
 * Output : Mr%20John%20Smith
 */


export const replaceSpaces = (str: string): string =>
  str
    .trim()
    .split('')
    .reduce((acc, chr) => {
      return chr === ' ' ? `${acc}%20` : acc + chr
    }, '')

// Examples:
export const main = (): void => {
  assert.strictEqual(replaceSpaces('Mr John Smith'), 'Mr%20John%20Smith')
  assert.strictEqual(replaceSpaces('Mr John Smith   '),  'Mr%20John%20Smith')
}
// main()
