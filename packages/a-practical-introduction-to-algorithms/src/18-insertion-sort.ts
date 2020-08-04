/* eslint-disable no-plusplus, no-unmodified-loop-condition */
/**
 * Insertion sort works similarly as we sort cards in our hand in a card game.
 * We assume that the first card is already sorted then, we select an unsorted card.
 * If the unsorted card is greater than the card in hand, it is placed on the right otherwise, to
 * the left. In the same way, other unsorted cards are taken and put at their right place.
 *
 * A similar approach is used by insertion sort.
 *
 * Insertion sort is a sorting algorithm that places an unsorted element at its suitable place in
 * each iteration.
 */

/**
 * Pseudo code:
 * @example
 *    insertionSort(array)
 *      mark first element as sorted
 *      for each unsorted element X
 *        'extract' the element X
 *        for j <- lastSortedIndex down to 0
 *          if current element j > X
 *            move sorted element to the right by 1
 *        break loop and insert X here
 *    end insertionSort
 */
export const insertionSort = <A>(array: A[]): A[] => {
  const arr = [...array]
  const size = arr.length

  for (let step = 1; step < size; step++) {
    const key = arr[step]
    let j = step - 1

    /*
     * Compare key with each element on the left of it until an element smaller than
     * it is found.
     * For descending order, change key < arr[j] to key > arr[j].
     */
    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j]
      --j
    }
    // Place key at after the element just smaller than it.
    arr[j + 1] = key
  }

  return arr
}

insertionSort([3, 7, 4, 9, 5, 2, 6, 1]) // ?
