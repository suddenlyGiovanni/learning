/* eslint-disable max-statements */
import assert from 'assert'

/**
 * # Selection Sort Algorithm
 *
 * Selection sort is an algorithm that selects the smallest element from an unsorted list in each
 * iteration and places that element at the beginning of the unsorted list.
 *
 * How it works:
 * 1 - Set the first element as `minimum`.
 * 2 - Compare minimum with the second element. If the second element is smaller than minimum,
 *     assign the second element as minimum. The process goes on until the last element.
 * 3 - After each iteration, minimum is placed in the front of the unsorted list.
 * 4 - For each iteration, indexing starts from the first unsorted element.
 *     Step 1 to 3 are repeated until all the elements are placed at their correct positions.
 */
export const selectionSort = <A>(array: A[]): A[] => {
  const arr: A[] = array.slice()
  const size = arr.length

  const swap = (leftIdx: number, rightIdx: number): void => {
    const temp = arr[leftIdx]
    arr[leftIdx] = arr[rightIdx]
    arr[rightIdx] = temp
  }

  // Repeat (size - 1) times
  for (let step = 0; step < size - 1; step++) {
    let minIdx = step

    for (let i = step + 1; i < size; i++) {
      const element = arr[i]
      // Select the minimum element in each loop.
      if (element < arr[minIdx]) {
        minIdx = i
      }
      // Else do nothing
    }

    // Put min at the correct position
    swap(step, minIdx)
  }

  return arr
}

export const main = (): void => {
  assert.deepStrictEqual(selectionSort([20, 12, 10, 15, 2]), [
    2,
    10,
    12,
    15,
    20,
  ])
  assert.deepStrictEqual(selectionSort([20]), [20])
}
