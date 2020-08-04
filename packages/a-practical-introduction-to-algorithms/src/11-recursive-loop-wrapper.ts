/* eslint-disable line-comment-position, no-inline-comments, no-undefined, no-console */

/**
 * An example fn (that only heat up the box) who's purpose is to show how we can write a recursive
 * function. We can use a Wrapper function that holds an inner recursive function.
 * The recursive fn have access to the wrapper fn parameters through Closure
 *
 * @param {number} start
 * @param {number} end
 * @returns void
 */
export const wrapperFnLoop = (start: number, end: number): void => {
  const recurse = (i: number): void => {
    console.log(`looping from ${start} until ${end}`)
    return i < end
      ? recurse(i + 1) // Still more operation need to be performed -> pay attention to what is passed in as argument
      : undefined // Base case
  }

  recurse(start)
}

/**
 * An example fn (that only heat up the box) who's purpose is to show how we can write a recursive
 * function. In this case the recursive fn does not make use of the function closure to handle the
 * the storing of the data, but instead it passes it along as argument on each recursive call.
 *
 * @param {number} start
 * @param {number} end
 * @returns void
 */
export const memoFnLoop = (start: number, end: number): void => {
  console.log(`looping from ${start} until ${end}`)
  return start < end
    ? memoFnLoop(start + 1, end) // Still more operation need to be performed -> pay attention to what is passed in as arguments
    : undefined // Base case
}

console.log('~~~ wrapperFnLoop ~~~')
wrapperFnLoop(1, 6)
console.log('~~~ MemoFnLoop ~~~')
memoFnLoop(1, 6)
