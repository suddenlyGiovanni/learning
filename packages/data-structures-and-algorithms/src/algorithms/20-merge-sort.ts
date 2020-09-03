/*
  eslint-disable
  id-length,
  max-statements,
*/

import assert from 'assert'

/**
 * @template A
 * @template XS
 * @param {...[...XS]} xs
 */
export const concat = <A extends unknown[], XS extends A[]>(...xs: [...XS]) =>
  xs.flat()

/**
 * @template A
 * @param {((x: A, y: A) => -1 | 0 | 1)} compareFunction
 *  if x is less than y by some ordering criterion, returns -1
 *  if x is greater than y by the ordering criterion, returns 1
 *  else x must be equal to y, returns 0
 * @returns {(xs: A[], ys: A[]) => A[]}
 */
function mergeStrategy<A>(
  compareFunction: (x: A, y: A) => -1 | 0 | 1 = (x, y) => {
    return x < y // x is less than y by some ordering criterion
      ? -1
      : x > y //  x is greater than y by the ordering criterion
      ? 1
      : 0 // x must be equal to y
  }
): (xs: A[], ys: A[]) => A[] {
  return function merge(xs: A[], ys: A[]): A[] {
    const zs: A[] = []
    let xsIdx = 0
    let ysIdx = 0

    while (xsIdx < xs.length && ysIdx < ys.length) {
      const x = xs[xsIdx]
      const y = ys[ysIdx]

      if (compareFunction(x, y) === -1) {
        zs.push(x)
        xsIdx += 1
      } else if (compareFunction(x, y) >= 0) {
        zs.push(y)
        ysIdx += 1
      }
    }

    const xsRemainder = xs.slice(xsIdx)
    const ysRemainder = ys.slice(ysIdx)
    return concat(zs, xsRemainder, ysRemainder)
  }
}

/**
 * # Merge Sort
 * @template A
 * @param {((x: A, y: A) => -1 | 0 | 1)} [compareFunction]
 * @returns {(xs: A[]) => A[]}
 * @example
 *  mergeSort(list)
 *    base case: if list.length < 2, return
 *    break the list into halves L & R
 *    Lsorted = mergeSort(L)
 *    Rsorted = mergeSort(R)
 *    return merge(Lsorted, Rsorted)
 */
export function mergeSortStrategy<A>(
  compareFunction?: (x: A, y: A) => -1 | 0 | 1
): (xs: A[]) => A[] {
  const merge = mergeStrategy(compareFunction)
  return function mergeSort(xs: A[]): A[] {
    // Base case:
    if (xs.length < 2) {
      return xs
    }
    const midIdx = Math.floor(xs.length / 2)
    // Break the list into halves L & R
    const left = xs.slice(0, midIdx)
    const right = xs.slice(midIdx)
    // recursive cases:
    const sortedLeft = mergeSort(left)
    const sortedRight = mergeSort(right)
    return merge(sortedLeft, sortedRight)
  }
}

export const main = (): void => {
  /*
   * ## TASK:
   * implement mergesort!
   *
   * - pro-tip:
   *   Split the array into halves and merge them recursively
   *
   * - pro-tip:
   *   return once we hit an array with a single item. That is a sorted array of size 1!
   *
   * - pro- tip:
   *   compare the arrays item by item and return the concatenated result
   */

  const mergeSort = mergeSortStrategy<number>()

  assert.deepStrictEqual(mergeSort([38, 27, 43]) /*?.$*/, [27, 38, 43])
  assert.deepStrictEqual(mergeSort([2, 5, 1, 3, 7, 2, 3, 8, 6, 3]) /*?.$*/, [
    1,
    2,
    2,
    3,
    3,
    3,
    5,
    6,
    7,
    8,
  ])
  assert.deepStrictEqual(mergeSort([38, 27, 43, 3, 9, 82, 10]) /*?.$*/, [
    3,
    9,
    10,
    27,
    38,
    43,
    82,
  ])
}
