type isUnique = <A>(xs: A[]) => boolean

/**
 * A function that goes from an `array of A` to a `boolean`
 * it returns true if all elements inside the array are unique
 * else it return false
 *
 * time complexity is O(n)
 * @param {T[]} array
 * @returns boolean
 */
const isUnique = (arr: number[]): boolean => {
  type CacheDictionary = {
    [key: number]: boolean
  }
  const cache: CacheDictionary = {}

  let result = true

  for (let i = 0; i < arr.length; i++) {
    console.log(`~~~~ LOOP ~~~~ i === ${i}`)
    const el = arr[i]
    // Check if the element is already present in the dictionary
    if (cache[el]) {
      // If this is the case, then we can already return a value, without consuming any more elements in the list
      result = false
      break
    } else {
      // Otherwise store a reference to it in the dictionary and move to the next element
      cache[el] = true
    }
  }

  return result
}

console.log(isUnique([1, 2, 3]) === true)
console.log(isUnique([1, 1, 3]) === false)

const _isUnique = <T>(arr: T[]): boolean => {
  const cache = new Map<T, boolean>()
  let result = true

  for (const el of arr) {
    if (cache.has(el)) {
      result = false
      break
    }
    cache.set(el, true)
  }
  return result
}

console.log(isUnique([1, 2, 3]) === _isUnique([1, 2, 3]))
console.log(isUnique([1, 1, 3]) === _isUnique([1, 1, 3]))
