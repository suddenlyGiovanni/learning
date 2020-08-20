import assert from 'assert'
import { makeLinkedList } from '../linked-list/linked-list'
import { removeDuplicates } from './07-linked-list-delete-dupe-node'

// Tests:

export const main = (): void => {
  const linkedListWithDuplicates = makeLinkedList([12, 11, 12, 21, 41, 43, 21])

  // Should convert the list to 12 -> 11 -> 21 -> 41 -> 43.
  const dedupeLinkedList = removeDuplicates(linkedListWithDuplicates.head!)

  assert.deepStrictEqual(dedupeLinkedList, makeLinkedList([12, 11, 21, 41, 43]).head)
}
