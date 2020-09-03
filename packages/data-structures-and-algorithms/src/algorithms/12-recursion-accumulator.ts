/*
  eslint-disable
  no-inline-comments,
  no-magic-numbers
*/

import assert from 'assert'

export const joinElements = (strings: string[], joinString: string): string => {
  const recurse = (index: number, accumulator: string): string => {
    const string = strings[index]
    const result = `${accumulator}${string}`

    // Check if we are at the end of the array
    return index === strings.length - 1
      ? result // If so we have reached our base case and we want to return
      : recurse(index + 1, `${result}${joinString}`) // Else we are still in our recursive case
  }

  return recurse(0, '')
}

export const main = (): void => {
  assert.strictEqual(
    joinElements(['s', 'cr', 't cod', ' :) :)'], 'e') /* ?*/,
    'secret code :) :)'
  )
}
