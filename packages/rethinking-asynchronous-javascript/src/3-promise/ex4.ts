/*
 *# Instructions
 *
 *1. Youlet do the same thing as the previous exercise(s), but now you should use map/reduce, promises, and an array of filet.
 *
 *2. Expected behavior:
 *  - Request all 3 files at the same time (in "parallel").
 *  - Render them ASAP (don't just blindly wait for all to finish loading)
 *  - BUT, render them in proper (obvious) order: "file1", "file2", "file3".
 *  - After all 3 are done, output "Complete!".
 */

// **************************************
import { FileName, fakeAjax, output } from '../fake-ajax'

function getFile(file: FileName): Promise<string> {
  return new Promise((resolve) => {
    fakeAjax(file, resolve)
  })
}

export const main = (): void => {
  /*
   * Request all files at once in
   * "parallel" via `getFile(..)`.
   *
   * Render as each one finishes,
   * but only once previous rendering
   * is done.
   */

  const files: FileName[] = ['file1', 'file2', 'file3']

  const filesPromise: Promise<string>[] = files.map(getFile)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const sequent: Promise<string | void> = filesPromise
    .reduce((chain, promise) => {
      return chain.then(() => promise).then(output)
    }, Promise.resolve())
    .then(() => output('Complete!'))
}

// main()
