/* eslint-disable no-magic-numbers */

import assert from 'assert'

const NOT_FOUND = -1

/*
 * # TASK:
 * Implement linear search.
 */

/**
 * A linear search fn that works for collection of string and number
 * ISSUE: this elegant implementation cleverly uses reduce/fold to accomplish the search.
 * reduce iterate through out the all collection. it does not stop when it encounters the matching
 * condition. (for a collection of length n, it has to iterate till n => time complexity O(n))
 * @param {A[]} xs
 * @param {A} item
 * @returns {number | -1} the position of the last item match in the collection
 */
export const linearSearchFold = <A extends string | number>(
  xs: A[],
  item: A
): number | -1 =>
  xs.reduce((acc, x, i) => {
    return x === item ? i : acc
  }, NOT_FOUND)

/**
 * @template A
 * @param {A[]} xs
 * @param {A} item
 * @returns {number | -1} the position of the first item match in the collection
 */
export const linearSearch = <A extends string | number>(
  xs: A[],
  item: A
): number | -1 => {
  let index = NOT_FOUND

  for (let i = 0; i < xs.length; i++) {
    if (xs[i] === item) {
      index = i
      break
    }
  }
  return index
}

export const main = (): void => {
  assert.strictEqual(linearSearchFold([2, 6, 7, 90, 103, 90], 90), 5)
  assert.strictEqual(linearSearch([2, 6, 7, 90, 103, 90], 90), 3)
}
