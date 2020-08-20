import assert from 'assert'

/**
 * Write a function that returns whether a string has only unique characters or not
 */

/**
 * Checks if string has unique characters
 * @param {string} str - the string
 * @return {boolean} - if is unique returns true
 */
export const unique = (str: string): boolean => {
  const hashTable = new Set<string>()
  for (const chr of str) {
    if (hashTable.has(chr)) {
      // There is a repiting chr
      return false
    }
    hashTable.add(chr)
  }

  return true
}

export const main = (): void => {
  assert.strictEqual(unique('abcdefghijk'), true)
  assert.strictEqual(unique('mississippi'), false)
}
// main()
