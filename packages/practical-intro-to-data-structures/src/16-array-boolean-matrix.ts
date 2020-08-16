/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements, no-underscore-dangle, max-lines-per-function */
import assert from 'assert'

/**
 * Given a boolean matrix, modify it such that if a matrix cell matrix[i][j] is 1 (true) then
 * make all the cells of ith row and jth column as 1.
 * More here: https://www.geeksforgeeks.org/a-boolean-matrix-question/
 */

/**
 * Mark one on both row and colum
 * @template T
 * @param {Array<Array<T>>} matrix - the matrix
 * @return {Array<Array<T>>} - the transformed matrix
 */
export const markOnes = (matrix: Array<Array<1 | 0>>): Array<Array<1 | 0>> => {
  const _matrix = matrix.slice()
  const row = Array(_matrix.length).fill(0) as (0 | 1)[]
  const column = Array(_matrix[0].length).fill(0) as (0 | 1)[]
  const rowsNumber = _matrix.length
  const columnNumber = _matrix[0].length

  /* Store the rows and columns to be marked as 1 in row[] and col[] arrays respectively */
  for (let i = 0; i < rowsNumber; i++) {
    for (let j = 0; j < columnNumber; j++) {
      if (_matrix[i][j] === 1) {
        row[i] = 1
        column[j] = 1
      }
    }
  }
  /* Modify the input matrix mat[] using the above constructed row[] and col[] arrays */
  for (let i = 0; i < rowsNumber; i++) {
    for (let j = 0; j < columnNumber; j++) {
      if (row[i] === 1 || column[j] === 1) {
        _matrix[i][j] = 1
      }
    }
  }

  return _matrix
}

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
// main()
