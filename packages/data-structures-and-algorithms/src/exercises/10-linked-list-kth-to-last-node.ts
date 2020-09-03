/*
 * Given a linked list and a number k, write a function that
 * returns the value at the k’th node from end of the linked list.
 */

import { ILinkedListNode } from '../interfaces/linked-list-old.interface'

/**
 * Returns the k-to-the-last node in a singly-linked list
 * @param {number} k - positive integer that counts from the end of a linked list to a node.
 * @param {Node} head - the head of a singly-link-list
 * @return {Node} - the kth node from the end of the linked list
 */
export const kthToLastNode = <T>(
  k: number,
  head: ILinkedListNode<T>
): ILinkedListNode<T> => {
  let node = head
  let kNode: null | ILinkedListNode<T> = node
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
