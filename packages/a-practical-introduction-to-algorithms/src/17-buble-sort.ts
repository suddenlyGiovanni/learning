/* eslint-disable no-underscore-dangle, max-statements, spaced-comment */
/**
 * # Bubble sort
 *
 * Bubble sort is an algorithm that compares the adjacent elements and swaps their positions if
 * they are not in the intended order. The order can be ascending or descending.
 * 1 - Starting from the first index, compare the first and the second elements.
 *     If the first element is greater than the second element, they are swapped.
 *     Now, compare the second and the third elements. Swap them if they are not in order.
 *     The above process goes on until the last element.
 * 2 - The same process goes on for the remaining iterations.
 *     After each iteration, the largest element among the unsorted elements is placed at the end.
 *     In each iteration, the comparison takes place up to the last unsorted element.
 *     The array is sorted when all the unsorted elements are placed at their correct positions.
 */

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

export const recursiveBubbleSort = <A>(xs: readonly A[]): A[] => {
  const _xs = xs.slice()
  const swap = <T>(leftIdx: number, rightIdx: number, array: T[]): T[] => {
    const left = array[leftIdx]
    array[leftIdx] = array[rightIdx]
    array[rightIdx] = left
    return array
  }

  type sort = <A>(ys: readonly A[], n: number) => A[]
  const sort: sort = (ys, n) => {
    const _ys = ys.slice()
    _ys.forEach((left, leftIdx, __ys) => {
      const rightIdx = leftIdx + 1
      const right = __ys[rightIdx]
      // If left is grater then right then swap them

      if (left > right) {
        swap(leftIdx, rightIdx, __ys)
      }
      // Else do nothing
    })

    return n - 1 > 1 ? sort(_ys, n - 1) : _ys
  }

  return sort(_xs, _xs.length - 1)
}

// [1, 2, 4, 5, 8]
bubbleSort([5, 1, 4, 2, 8]) //?
recursiveBubbleSort([5, 1, 4, 2, 8]) //?
