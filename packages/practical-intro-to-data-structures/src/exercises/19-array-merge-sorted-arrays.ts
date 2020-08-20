/* eslint-disable max-statements */
/**
 * # Merge two sorted arrays
 * Given two sorted arrays, the task is to merge them in a sorted manner.
 *
 * Input: arr1[] = {1, 3, 4, 5}, arr2[] = {2, 4, 6, 8}
 * Output: arr3[] = {1, 2, 3, 4, 4, 5, 6, 8}
 *
 * Input: arr1[] = { 5, 8, 9}, arr2[] = {4, 7, 8}
 * Output: arr3[] = {4, 5, 7, 8, 8, 9}
 */


/**
 * Returns a sorted, merged list
 * @template T
 * @param {T[]} left - first sorted array
 * @param {T[]} right - second sorted array
 * @return {T[]} - the merged array
 */
export const merge = <T>(left: T[], right: T[]): T[] => {
  const accumulator: T[] = []
  let leftIndex = 0
  let rightIndex = 0

  while (leftIndex < left.length && rightIndex < right.length) {
    const leftValue = left[leftIndex]
    const rightValue = right[rightIndex]
    if (leftValue < rightValue) {
      accumulator.push(leftValue)
      leftIndex += 1
    } else {
      accumulator.push(rightValue)
      rightIndex += 1
    }
  }

  while (leftIndex < left.length) {
    const leftValue = left[leftIndex]
    accumulator.push(leftValue)
    leftIndex += 1
  }

  while (rightIndex < right.length) {
    const rightValue = right[rightIndex]
    accumulator.push(rightValue)
    rightIndex += 1
  }

  return accumulator
}
