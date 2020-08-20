import assert from 'assert'

import { merge } from './19-array-merge-sorted-arrays'

// Example

export const main = (): void => {
  const listA1 = [1, 3, 4, 5]
  const listA2 = [2, 4, 6, 8]
  const expectedListOutputA = [1, 2, 3, 4, 4, 5, 6, 8]
  assert.deepStrictEqual(merge(listA1, listA2), expectedListOutputA)

  const listB1 = [5, 8, 9]
  const listB2 = [4, 7, 8]
  const expectedListOutputB = [4, 5, 7, 8, 8, 9]
  assert.deepStrictEqual(merge(listB1, listB2), expectedListOutputB)
}
