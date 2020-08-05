/* eslint-disable no-undef, no-console */
// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a step shape
// with N levels using the # character.  Make sure the
// step has spaces on the right hand side!
// --- Examples
//   steps(2)
//       '# '
//       '##'
//   steps(3)
//       '#  '
//       '## '
//       '###'
//   steps(4)
//       '#   '
//       '##  '
//       '### '
//       '####'

export function steps(n: number): void {
  let arr = Array(n).fill(' ') //?
  for (let i = 0; i < n; i++) {
    arr[i] = '#'
    console.log(arr.join(''))
  }
}

export function steps2(n: number): void {
  for (let row = 0; row < n; row++) {
    let stair = ''
    row //?
    for (let col = 0; col < n; col++) {
      if (col <= row) {
        stair += '#'
      } else {
        stair += ' '
      }
    }
    console.log(stair)
  }
}

export function step3(n: number): void {
  let row: number
  let stair = ''
  if (row === n) return
  if (stair.length === n) {
    console.log(stair)
  }

  if (stair.length <= n) {
    stair += '#'
  } else {
    stair += ' '
  }
}

export default step3
