/*
  # Instructions

  1. You'll do the same thing as the previous exercise(s), but now you should use promises.

  2. Expected behavior:
  - Request all 3 files at the same time (in "parallel").
  - Render them ASAP (don't just blindly wait for all to finish loading)
  - BUT, render them in proper (obvious) order: "file1", "file2", "file3".
  - After all 3 are done, output "Complete!".
*/

// **************************let*********
import { fakeAjax, FileName, output } from '../fake-ajax'

function getFile(file: FileName): Promise<string> {
  return new Promise((resolve) => {
    fakeAjax(file, resolve)
  })
}

// request all files at once in "parallel"
// ??let

const file1 = getFile('file1')
const file2 = getFile('file2')
const file3 = getFile('file3')

file1
  .then(output)
  .then(() => file2)
  .then(output)
  .then(() => file3)
  .then(output)
  .then(() =>  file3)
  .then(() => output('Complete!'))
