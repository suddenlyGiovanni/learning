import assert from 'assert'

import { unique } from './13-hash-table-find-unique-list'


export const main = (): void => {
  const listWithUniqueElement = ['c', 'b', 'c', 'a', 'b', 'b', 'd', 'c', 'd']
  const listWithOutUniqueElement = [
    'c',
    'b',
    'c',
    'a',
    'b',
    'b',
    'd',
    'c',
    'd',
    'a',
  ]
  assert.strictEqual(unique(listWithUniqueElement), 'a')
  assert.strictEqual(unique(listWithOutUniqueElement), undefined)
}
