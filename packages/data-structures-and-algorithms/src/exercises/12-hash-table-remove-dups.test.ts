import assert from 'assert'

import { removeDuplicates } from './12-hash-table-remove-dups'


export const main = (): void => {
  assert.strictEqual(removeDuplicates('mississippi'), 'misp')
}
