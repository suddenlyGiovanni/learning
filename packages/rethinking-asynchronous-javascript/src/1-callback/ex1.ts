// The old-n-busted callback way
import { fakeAjax, output, FileName } from '../fake-ajax'
/*
  # Instructions

  1. This exercise calls for you to write some async flow-control code.
    To start off with, you'll use callbacks only.

  2. Expected behavior:
    - Request all 3 files at the same time (in "parallel").
    - Render them ASAP (don't just blindly wait for all to finish loading)
    - BUT, render them in proper (obvious) order: "file1", "file2", "file3".
    - After all 3 are done, output "Complete!".
*/

function getFile(file: FileName): void {
  fakeAjax(file, (text: string): void => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    fileReceived(file, text)
  })
}

// hold response in whatever order they come back
const response: Map<FileName, { rendered: boolean; value: string }> = new Map()

function fileReceived(fileName: FileName, contents: string): void {
  // haven't received this text yet?
  if (!response.has(fileName)) {
    response.set(fileName, { rendered: false, value: contents })
  }

  const fileNames = ['file1', 'file2', 'file3'] as const

  // loop through responses in order for rendering
  for (const file of fileNames) {
    // response received?
    if (response.has(file)) {
      // response needs to be rendered?
      if (response.get(file).rendered === false) {
        const { value } = response.get(file)
        output(value)
        response.set(file, {
          rendered: true,
          value,
        })
      }
    } else {
      // not complete!
      return
    }
  }
  output('Complete!')
}

// request all files at once in "parallel"
getFile('file1')
getFile('file2')
getFile('file3')
