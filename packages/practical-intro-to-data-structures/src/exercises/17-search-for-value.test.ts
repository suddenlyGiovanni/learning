import assert from 'assert'

import { find } from './17-search-for-value'


export const main = (): void => {
  const testList = [1, 3, 4, 6, 7, 9, 10, 12]
  assert.strictEqual(find(testList, 9), true)
  assert.strictEqual(find(testList, 8), false)
}
