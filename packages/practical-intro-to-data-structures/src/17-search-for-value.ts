/* eslint-disable no-underscore-dangle */
import assert from 'assert'

/**
 * Write a function to search for a value in an array. Returns true if value is found.
 */

/**
 * @template T
 * @param {T[]} list - the array to search
 * @param {T} val - number of places to rotate by
 * @return {boolean} - if value found, return true, else false
 */
export const find = <T>(list: T[], val: T): boolean => {
  /*
   * Use binary search
   * To sort the array use merge sort or quick sort
   * (v8 should do this under the hood for sort native array methods)
   */
  const _list = list.slice().sort((a, b) => a - b)

  const binarySearch = (min: number, max: number): boolean => {
    const index = Math.floor((min + max) / 2)
    if (min > max) {
      return false
    }
    if (val === _list[index]) {
      return true
    } else if (val < _list[index]) {
      // Item has to be located in the left part of the sub-list
      return binarySearch(min, index - 1)
    }
    return binarySearch(index + 1, max)
  }

  return binarySearch(0, _list.length - 1)
}

export const main = (): void => {
  const testList = [1, 3, 4, 6, 7, 9, 10, 12]
  assert.strictEqual(find(testList, 9), true)
  assert.strictEqual(find(testList, 8), false)
}
// main()
