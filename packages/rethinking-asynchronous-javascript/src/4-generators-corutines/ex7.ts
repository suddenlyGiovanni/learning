/* eslint-disable @typescript-eslint/no-unsafe-return */
/*
 *# Instructions
 *
 *1. You'll do the same thing as the previous exercise(s), but now you should use asynquence and a generator.
 *
 *2. Expected behavior:
 *  - Request all 3 files at the same time (in "parallel").
 *  - Render them ASAP (don't just blindly wait for all to finish loading)
 *  - BUT, render them in proper (obvious) order: "file1", "file2", "file3".
 *  - After all 3 are done, output "Complete!".
 *
 */

import { FileName, fakeAjax, output } from '../fake-ajax'

function getFile(file: FileName): Promise<string> {
  return new Promise((resolve) => {
    fakeAjax(file, resolve)
  })
}

// **************************************

/*
 * Request all files at once in
 * "parallel" via `getFile(..)`.
 *
 * Render as each one finishes,
 * but only once previous rendering
 * is done.
 */

function* main(): Generator<Promise<string>, void> {
  const p1 = getFile('file1')
  const p2 = getFile('file2')
  const p3 = getFile('file3')

  output(yield p1)
  output(yield p2)
  output(yield p3)
  output('Complete!')
}


export function runner<P = unknown, T = Promise<P>, TReturn = any, TNext = unknown>(
  generator: () => Generator<T, TReturn, TNext>
): Promise<void> {
  const iterator = generator() // ?
  // starts the generator
  return Promise.resolve().then(function handleNext(value) {
    // Run to the next yielded value
    const next = iterator.next(value)

    return (function handleResult(next) {
      // Generator has completed running?
      if (next.done) {
        return next.value
      }
      // Otherwise keep going

        return Promise.resolve(next.value).then(
          // Resume the async loop on success, sending the resolved value back into the generator
          handleNext,
          // If `value` is a rejected promise, propagate the error back into the generator for its onw error handling
          function handleError(err) {
            return Promise.resolve(iterator.throw(err)).then(handleResult)
          }
        )

    })(next)
  })
}

// runner(main)
