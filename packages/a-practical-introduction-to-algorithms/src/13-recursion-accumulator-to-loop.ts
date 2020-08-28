/*
  eslint-disable
  no-inline-comments,
  no-magic-numbers,
*/

import assert from 'assert'

import { NArityFn } from './types'

/*
 * # Task:
 * rewrite this function so that it uses a loop rather than recursion
 */

export const concatStrings: NArityFn<string[], string> = (...strings) => {
  return strings.reduce((acc, curr) => acc + curr, '')
}

/**
 * @param {string[]} strings
 * @param {string} joinString
 * @returns {string}
 */
export const joinElements = (strings: string[], joinString: string): string => {
  let acc = ''

  for (let i = 0; i < strings.length - 1; i++) {
    const x = strings[i]
    acc = concatStrings(acc, x, joinString)
  }
  return acc + strings[strings.length - 1]
}

export const main = (): void => {
  assert.strictEqual(
    joinElements(['s', 'cr', 't cod', ' :) :)'], 'e') /* ?*/,
    'secret code :) :)'
  )
}
