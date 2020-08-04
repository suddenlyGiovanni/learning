/* eslint-disable init-declarations, max-statements */
// TASK: Implement binary search.

export const binarySearch = <A>(list: A[], item: A): -1 | number => {
  // Set up the bounds
  let min = 0
  let max = list.length - 1
  let guess: number

  while (min <= max) {
    // Pick an element in the middle
    guess = Math.floor((max + min) / 2)
    if (list[guess] === item) {
      // Jackpot
      return guess
    }
    if (item < list[guess]) {
      // Left side
      max = guess - 1
    } else {
      // Right side
      min = guess + 1
    }
  }

  return -1
}

binarySearch([2, 6, 7, 90, 103], 90) //?
