import assert from 'assert'

import { markOnes } from './16-array-boolean-matrix'


export const main = (): void => {
  assert.deepStrictEqual(
    markOnes([
      [1, 0],
      [0, 0],
    ]),
    [
      [1, 1],
      [1, 0],
    ]
  )

  assert.deepStrictEqual(
    markOnes([
      [0, 0, 0],
      [0, 0, 1],
    ]),
    [
      [0, 0, 1],
      [1, 1, 1],
    ]
  )

  assert.deepStrictEqual(
    markOnes([
      [1, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ]),
    [
      [1, 1, 1, 1],
      [1, 1, 1, 1],
      [1, 0, 1, 1],
    ]
  )
}
