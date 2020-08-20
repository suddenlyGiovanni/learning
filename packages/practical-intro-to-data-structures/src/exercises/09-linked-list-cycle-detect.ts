
import { ILinkedListNode } from '../linked-list/linked-list.interface'

/** # Check if a linked list contains a cycle. */

/**
 * Checks if a linked list contains a cycle / loop.
 * @param {Node} head - the head of the linked list
 * @return {boolean} - true if contains a cycle, otherwise false
 */
export const detectCycle = <T>(head: ILinkedListNode<T>): boolean => {
  const duplicateTable = new Set<ILinkedListNode<T>>()

  let node: null | ILinkedListNode<T> = head
  while (node) {
    if (duplicateTable.has(node)) {
      return true
    }
    duplicateTable.add(node)
    node = node.next
  }
  duplicateTable.clear()
  return false
}
