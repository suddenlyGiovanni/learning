import assert from 'assert'

/**
 * Write a function to rotate an array by n places
 * Input: [1,2,3,4,5,6] n = 2
 * Output: [ 3, 4, 5, 6, 1, 2 ]
 */


const rotateByOne = <T>([head, ...tail]: T[]): T[] => [...tail, head]

/**
 * Rotate an array by n places
 * @template T
 * @param {T[]} list - the array to rotate
 * @param {number} n - number of places to rotate by
 * @return {T[]} - the rotated list
 */
export const rotateArr = <T>(list: T[], n: number): T[] => {
  let array = list.slice()
  for (let i = 0; i < n; i++) {
    array = rotateByOne(array)
  }
  return array
}

export const main = (): void => {
  assert.deepStrictEqual(rotateArr([1, 2, 3, 4, 5, 6], 2), [ 3, 4, 5, 6, 1, 2 ])
}
// main()
