type isUnique = <a>(xs: a[]) => boolean

/**
 * A function that goes from an `array of A` to a `boolean`
 * it returns true if all elements inside the array are unique
 * else it return false
 *
 * time complexity is O(n^2)
 * @param {T[]} array
 * @returns boolean
 */
export const isUnique: isUnique = (arr) => {
  let result = true

  for (let i = 0; i < arr.length; i++) {
    console.log(`~~~~ OUTER LOOP ~~~~ i === ${i}`)

    for (let j = 0; j < arr.length; j++) {
      console.log(`~~~~ INNER LOOP ~~~~ j === ${j}`)
      if (i !== j && arr[i] === arr[j]) {
        result = false
      }
    }
  }

  return result
}

console.log(isUnique([1, 2, 3]) === true)
console.log(isUnique([1, 1, 3]) === false)
