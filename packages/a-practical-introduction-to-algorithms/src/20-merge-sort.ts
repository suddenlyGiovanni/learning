/* eslint-disable id-length, max-statements, no-plusplus */
/**
 * # Merge Sort
 * @example
 *  mergeSort(list)
 *    base case: if list.length < 2, return
 *    break the list into halves L & R
 *    Lsorted = mergeSort(L)
 *    Rsorted = mergeSort(R)
 *    return merge(Lsorted, Rsorted)
 *
 *
 */

/*
 * ## TASK: implement mergesort!
 * protip: Split the array into halves and merge them recursively
 * protip: return once we hit an array with a single item. That is a sorted array of size 1!
 * protip: compare the arrays item by item and return the concatenated result
 */

export const concat = <A extends unknown[]>(...xs: [...A]) => xs.flat()

export const merge = <A>(xs: A[], ys: A[]): A[] => {
  const zs: A[] = []
  let indexXs = 0
  let indexYs = 0
  while (indexXs < xs.length && indexYs < ys.length) {
    const x = xs[indexXs]
    const y = ys[indexYs]
    if (x < y) {
      zs.push(x)
      indexXs++
    } else {
      zs.push(y)
      indexYs++
    }
  }

  return concat(zs, xs.slice(indexXs), ys.slice(indexYs))
}

export const mergeSort = <A>(xs: A[]): A[] => {
  // Base case:
  if (xs.length < 2) {
    return xs
  }
  // Break the list into halves L & R
  const mid = Math.round(xs.length / 2)
  const left = xs.slice(0, mid)
  const right = xs.slice(mid)
  const sortedLeft = mergeSort(left)
  const sortedRight = mergeSort(right)
  return merge(sortedLeft, sortedRight)
}

mergeSort([38, 27, 43]) // ?
mergeSort([38, 27, 43, 3, 9, 82, 10]) // ?
