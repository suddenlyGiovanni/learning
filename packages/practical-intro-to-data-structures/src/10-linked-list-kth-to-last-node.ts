import assert from 'assert'
/*
 * Given a linked list and a number k, write a function that
 * returns the value at the k’th node from end of the linked list.
 */

import { INode, makeLinkedList } from './linked-list'

/**
 * Returns the k-to-the-last node in a singly-linked list
 * @param {number} k - positive integer that counts from the end of a linked list to a node.
 * @param {Node} head - the head of a singly-link-list
 * @return {Node} - the kth node from the end of the linked list
 */
export const kthToLastNode = <T>(k: number, head: INode<T>): INode<T> => {
  let node = head
  let kNode: null | INode<T> = node
  for (let i = 1; i <= k; i++) {
    if (node.next === null) {
      throw new Error('`k` is out of bound')
    }
    kNode = kNode.next
  }

  while (kNode) {
    node = node.next
    kNode = kNode.next
  }
  return node
}

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
// main()
