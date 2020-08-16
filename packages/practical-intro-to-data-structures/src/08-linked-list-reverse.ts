/* eslint-disable prefer-destructuring */
import assert from 'assert'

import { INode, makeLinkedList } from './linked-list'

/*
 * Given pointer to the head node of a linked list, reverse the linked list.
 */

/**
 * Reverses the linked list
 * @template T
 * @param {Node} head - the head of the linked list
 * @return {Node} - the head of the linked list, reversed
 */
export const reverse = <T>(head: INode<T>): INode<T> => {
  let previous: null | INode<T> = null
  let current: null | INode<T> = head
  let next: null | INode<T> = null

  while (current) {
    // Assign current.next to next variable
    next = current.next
    // Assign previous to current.next
    current.next = previous
    // Assign current to previous
    previous = current
    // Assign next to current
    current = next
  }

  return previous!
}

// Test
export const main = (): void => {
  const { head } = makeLinkedList([1, 2, 3, 4, 5])
  const reversed = reverse(head!)
  assert.deepStrictEqual(reversed, makeLinkedList([5, 4, 3, 2, 1]).head)
}
// main()
