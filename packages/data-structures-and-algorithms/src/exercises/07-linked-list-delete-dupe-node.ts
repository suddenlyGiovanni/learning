/* eslint-disable max-statements */

import { ILinkedListNode } from '../interfaces/linked-list-old.interface'

/**
 * Write a removeDuplicates() function which takes a `list` and deletes any duplicate nodes
 * from the list. The list is not sorted.
 *
 * For example if the linked list is 12 -> 11 -> 12 -> 21 -> 41 -> 43 -> 21 then removeDuplicates()
 * should convert the list to 12 -> 11 -> 21 -> 41 -> 43.
 * Questions to Consider:
 * Is there more than one duplicate?
 * - For this case, it can have multiple duplicates.
 * - Consider the case where there is only duplicates. What difference does that make?
 */

/**
 * Deletes a duplicated node from a linked list
 * @template T
 * @param {INode<T>} head - the head of the linked list
 * @return {LinkedListNodeT>} - the head of the linked list without any duplicates
 */
export const removeDuplicates = <T>(head: ILinkedListNode<T>): ILinkedListNode<T> => {
  if (!head.next) {
    return head
  }
  const duplicateSet = new Set<T>()
  duplicateSet.add(head.value)

  let previousNode = head
  let currentNode = head.next

  while (currentNode) {
    if (duplicateSet.has(currentNode.value)) {
      /*
       * Remove this from the list
       * A: {value: 11, next: B} B: {value: 12, next: C} C: {value: 21, next: D}
       * A: {value: 11, next: C} C: {value: 21, next: D} | B: {value: 12, next: C}
       */
      previousNode.next = currentNode.next
      currentNode = currentNode.next
    } else {
      duplicateSet.add(currentNode.value)
      previousNode = currentNode
      currentNode = currentNode.next
    }
  }

  return head
}
