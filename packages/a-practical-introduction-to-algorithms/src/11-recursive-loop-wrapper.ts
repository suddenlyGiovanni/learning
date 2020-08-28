/*
  eslint-disable
  line-comment-position,
  no-console,
  no-inline-comments,
  no-undefined,
  no-magic-numbers,
  max-statements,
*/

import assert from 'assert'

/**
 * An example fn (that only heat up the box) who's purpose is to show how we can write a recursive
 * function. We can use a Wrapper function that holds an inner recursive function.
 * The recursive fn have access to the wrapper fn parameters through Closure
 *
 * @param {number} start
 * @param {number} end
 * @param {(n: number) => void} [cb=console.log]
 * @returns void
 */
export const recursiveFnLoopWrapper = (
  start: number,
  end: number,
  cb: (n: number) => void = console.log
): void => {
  const recurse = (i: number): void => {
    cb(i)
    return i >= end
      ? undefined // Base case
      : recurse(i + 1) // Still more operation need to be performed -> pay attention to what is passed in as argument
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
 * @param {(n: number) => void} [cb=console.log]
 * @returns void
 */
export const recursiveFnLoopClojure = (
  start: number,
  end: number,
  cb: (n: number) => void = console.log
): void => {
  cb(start)
  return start >= end
    ? undefined // Base case
    : recursiveFnLoopClojure(start + 1, end, cb) // Still more operation need to be performed -> pay attention to what is passed in as arguments
}

export const main = (): void => {
  const start = 1
  const end = 6
  const wrapperValue: number[] = []
  const clojureValue: number[] = []

  console.log('\n~~~ recursiveFnLoopWrapper ~~~')
  recursiveFnLoopWrapper(start, end, (n) => {
    wrapperValue.push(n)
    console.log(`looping from ${n} until ${end}`)
    return undefined
  })




  console.log('\n~~~ recursiveFnLoopClojure ~~~')
  recursiveFnLoopClojure(start, end, (n) => {
    clojureValue.push(n)
    console.log(`looping from ${n} until ${end}`)
    return undefined
  })

  assert.deepStrictEqual(wrapperValue, [1, 2, 3, 4, 5, 6])
  assert.deepStrictEqual(clojureValue, [1, 2, 3, 4, 5, 6])
  assert.deepStrictEqual(wrapperValue, clojureValue)
}
