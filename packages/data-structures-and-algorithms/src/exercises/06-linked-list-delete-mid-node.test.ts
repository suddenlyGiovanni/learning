import assert from 'assert'

import { Node, makeLinkedList } from '../linked-list/linked-list-old'

import { deleteMiddleNode } from './06-linked-list-delete-mid-node'

// Test

export const main = (): void => {
  const { head } = makeLinkedList([1, 2, 3, 4, 5])
  assert.deepStrictEqual(deleteMiddleNode(head!), new Node(3, null))
  assert.deepStrictEqual(head, makeLinkedList([1, 2, 4, 5]).head)
}
