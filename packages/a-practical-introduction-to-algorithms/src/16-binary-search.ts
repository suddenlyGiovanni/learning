/* eslint-disable init-declarations, max-statements, spaced-comment */
// TASK: Implement binary search.

export const binarySearch = <A>(list: A[], item: A): -1 | number => {
  // Set up the bounds
  let min = 0
  let max = list.length - 1
  let index: number

  while (min <= max) {
    // Pick an element in the middle
    index = Math.floor((max + min) / 2)
    if (list[index] === item) {
      // Jackpot
      return index
    }
    if (item < list[index]) {
      // Left side
      max = index - 1
    } else {
      // Right side
      min = index + 1
    }
  }

  return -1
}

export const recursiveBinarySearch = <A>(list: A[], item: A): -1 | number => {
  const recurse = (min: number, max: number): -1 | number => {
    // Pick an index at the middle
    const index = Math.floor((min + max) / 2) //?
    // Verify if the item is smaller or bigger than the element at the center
    if (min > max) {
      //  Bottom case the item is not present in the list
      return -1
    }
    if (item === list[index]) {
      // Jackpot! we have found the item
      return index
    } else if (item < list[index]) {
      // Item has to be located in the left part of the sub-list
      return recurse(min, index - 1)
    }
    // Item has to be located in the right part of the sub-list
    return recurse(index + 1, max)
  }

  return recurse(0, list.length - 1) //?
}

binarySearch([2, 6, 7, 90, 103, 120], 90) //?
recursiveBinarySearch([2, 6, 7, 90, 103, 120], 90) //?
