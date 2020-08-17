import { FileName, fakeAjax, output } from '../fake-ajax'

// **************************************
/*
 *# Instructions
 *
 *1. You'll do the same thing as the previous exercise(s), but now you should use thunks.
 *
 *2. Expected behavior:
 *  - Request all 3 files at the same time (in "parallel").
 *  - Render them ASAP (don't just blindly wait for all to finish loading)
 *  - BUT, render them in proper (obvious) order: "file1", "file2", "file3".
 *  - After all 3 are done, output "Complete!".
 */

/*
 *this is an eager thunk: it will trigger the async action at the time of creation and hold to the response in it's enclosing scope.
 *once provided with a call back, it will un-wrap the value.
 */
function getFile(file: FileName): (cb: (text: string) => void) => void {
  // What do we do here?
  // eslint-disable-next-line init-declarations
  let text: string
  // eslint-disable-next-line init-declarations
  let fn: (text: string) => void
  fakeAjax(file, (response) => {
    if (fn) {
      fn(response)
    } else {
      text = response
    }
  })

  return (cb) => {
    if (text) {
      cb(text)
    } else {
      fn = cb
    }
  }
}

export const main = (): void => {
  // Request all files at once in "parallel"
  const thunk1 = getFile('file1')
  const thunk2 = getFile('file2')
  const thunk3 = getFile('file3')

  thunk1((text1: string) => {
    output(text1)
    thunk2((text2: string) => {
      output(text2)
      thunk3((text3: string) => {
        output(text3)
        output('Complete !')
      })
    })
  })
}
// main()
