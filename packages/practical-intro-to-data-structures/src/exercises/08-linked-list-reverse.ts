/* eslint-disable prefer-destructuring */

import { ILinkedListNode } from '../linked-list/linked-list.interface'

/*
 * Given pointer to the head node of a linked list, reverse the linked list.
 */

/**
 * Reverses the linked list
 * @template T
 * @param {Node} head - the head of the linked list
 * @return {Node} - the head of the linked list, reversed
 */
export const reverse = <T>(head: ILinkedListNode<T>): ILinkedListNode<T> => {
  let previous: null | ILinkedListNode<T> = null
  let current: null | ILinkedListNode<T> = head
  let next: null | ILinkedListNode<T> = null

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
