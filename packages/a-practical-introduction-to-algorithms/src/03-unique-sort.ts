/*
 * Task: Transform this simple sorting algorithm into a unique sort.
 * It should not return any duplicate values in the sorted array.
 */

/*
 * Input: [1,5,2,1] => output: [1,2,5]
 * input: [4,2,2,3,2,2,2] => output: [2,3,4]
 */

type uniqSort = <A>(xs: A[]) => A[]
/**
 * UniqueSort is an `endomorphic` function that goes from ( A[] ) -> A[]
 * in the process it
 * - removes duplicate
 * - sorts the elements
 * @param {*} array
 * @returns array
 */
export const uniqSort = <A>(xs: A[]): A[] => {
  const cache = new Map<A, boolean>()
  const arr = []

  for (const x of xs) {
    if (!cache.has(x)) {
      /*
       * Then it is not a duplicate
       * add it to the cache
       */
      cache.set(x, true)
      // Push it to a new structure
      arr.push(x)
    }
    // Else move to the next element in the list
  }

  const compareFunction = <T>(firstEl: T, secondEl: T): -1 | 0 | 1 => {
    if (firstEl < secondEl) {
      return -1
    }
    if (firstEl > secondEl) {
      return 1
    }
    return 0
  }

  return arr.sort(compareFunction)
}

// => [2,3,4]
console.log(uniqSort([4, 2, 2, 3, 2, 2, 2]))
