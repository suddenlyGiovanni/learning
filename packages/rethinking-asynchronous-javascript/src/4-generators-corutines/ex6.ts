/*
  # Instructions

  1. You'll do the same thing as the previous exercise(s), but now you should use asynquence and a generator.

  2. Expected behavior:
    - Request all 3 files at the same time (in "parallel").
    - Render them ASAP (don't just blindly wait for all to finish loading)
    - BUT, render them in proper (obvious) order: "file1", "file2", "file3".
    - After all 3 are done, output "Complete!".

*/

import { fakeAjax, FileName, output } from '../fake-ajax'

// **************************************

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???
function getFile(file: FileName): void {
  fakeAjax(file, (content) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    iterator.next(content)
  })
}

function* main(): Generator<string, void, string> {
  const p1 = getFile('file1')
  const p2 = getFile('file2')
  const p3 = getFile('file3')

  const text1 = yield p1
  output(text1)
  const text2 = yield p2
  output(text2)
  const text3 = yield p3
  output(text3)
  output('Complete!')
}

// eslint-disable-next-line no-var
var iterator = main()
iterator.next() // to get it started
