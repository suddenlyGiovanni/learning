import assert from 'assert'

import { makeLinkedList } from '../linked-list/linked-list-old'

import { kthToLastNode } from './10-linked-list-kth-to-last-node'


export const main = (): void => {
  const linkedList = makeLinkedList<number>([
    15,
    10,
    13,
    9,
    6,
    1,
    7,
    12,
    5,
    2,
    3,
    4,
    8,
    14,
    11,
  ])
  const head = linkedList.head!
  // Expected output {value:3 next: ...}
  assert.deepStrictEqual(
    kthToLastNode(5, head),
    makeLinkedList([3, 4, 8, 14, 11]).head
  )
}
