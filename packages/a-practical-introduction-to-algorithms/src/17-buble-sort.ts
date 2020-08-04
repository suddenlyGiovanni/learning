/* eslint-disable no-underscore-dangle, max-statements, spaced-comment */
/*
 * # Bubble sort pseudo code
 *
 * procedure bubbleSort(A : list of sortable items)
 *  n := length(A)
 *  repeat
 *    swapped := false
 *    for i := 1 to n-1 inclusive do
 *      / if this pair is out of order /
 *      if A[i-1] > A[i] then
 *        / swap them and remember something changed /
 *        swap(A[i-1], A[i])
 *        swapped := true
 *      end if
 *    end for
 *  until not swapped
 * end procedure
 */

export const bubbleSort = <T>(list: T[]): T[] => {
  const _list = list.slice()
  const size = _list.length
  const swap = (leftIndex: number, rightIndex: number): void => {
    const temp: T = _list[leftIndex]
    _list[leftIndex] = _list[rightIndex]
    _list[rightIndex] = temp
  }
  /*
   * Run loops two times: one for walking through the array
   * and the other for comparison
   */
  for (let i = 0; i < size - 1; i++) {
    // Swapped keeps track of swapping
    let swapped = true

    for (let j = 0; j < size - 1 - i; j++) {
      const left = _list[j]
      const right = _list[j + 1]

      // Swap if greater is at the rear position
      if (left > right) {
        // Swap it
        swap(j, j + 1)
        swapped = false
      }
    }
    // If there is not swapping in the last swap, then the array is already sorted.
    if (swapped === true) {
      break
    }
  }

  return _list
}

// [1, 2, 4, 5, 8]
bubbleSort([5, 1, 4, 2, 8]) //?
