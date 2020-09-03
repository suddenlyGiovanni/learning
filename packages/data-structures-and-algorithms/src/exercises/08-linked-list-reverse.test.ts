import assert from 'assert'

import { makeLinkedList } from '../linked-list/linked-list-old'

import { reverse } from './08-linked-list-reverse'

// Test

export const main = (): void => {
  const { head } = makeLinkedList([1, 2, 3, 4, 5])
  const reversed = reverse(head!)
  assert.deepStrictEqual(reversed, makeLinkedList([5, 4, 3, 2, 1]).head)
}
