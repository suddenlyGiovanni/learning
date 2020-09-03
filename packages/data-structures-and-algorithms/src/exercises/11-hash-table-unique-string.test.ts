import assert from 'assert'

import { unique } from './11-hash-table-unique-string'


export const main = (): void => {
  assert.strictEqual(unique('abcdefghijk'), true)
  assert.strictEqual(unique('mississippi'), false)
}
