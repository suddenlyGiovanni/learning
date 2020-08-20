import assert from 'assert'

import { replaceSpaces } from './18-string-urlify'

// Examples:

export const main = (): void => {
  assert.strictEqual(replaceSpaces('Mr John Smith'), 'Mr%20John%20Smith')
  assert.strictEqual(replaceSpaces('Mr John Smith   '), 'Mr%20John%20Smith')
}
