import assert from 'assert'

import { rotateArr } from './15-array-rotate'


export const main = (): void => {
  assert.deepStrictEqual(rotateArr([1, 2, 3, 4, 5, 6], 2), [3, 4, 5, 6, 1, 2])
}
