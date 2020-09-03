import assert from 'assert'

import { findSumK } from './14-hash-table-two-items-sum'


export const main = (): void => {
  assert.deepStrictEqual(findSumK([1, 3, 7, 2, 5, 9], 8), [1, 7])
}
