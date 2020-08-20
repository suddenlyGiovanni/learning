import assert from 'assert'

import { INode, Node, makeLinkedList } from '../linked-list/linked-list'

/** # Check if a linked list contains a cycle. */

/**
 * Checks if a linked list contains a cycle / loop.
 * @param {Node} head - the head of the linked list
 * @return {boolean} - true if contains a cycle, otherwise false
 */
export const detectCycle = <T>(head: INode<T>): boolean => {
  const duplicateTable = new Set<INode<T>>()

  let node: null | INode<T> = head
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

// Tests:
export const main = (): void => {
  // eslint-disable-next-line max-statements
  const makeCircularLinkedList = (): INode<number> => {
    const a1 = new Node(1)
    const a2 = new Node(2)
    const a3 = new Node(3)
    const a4 = new Node(4)
    const a5 = new Node(5)
    a1.next = a2
    a2.next = a3
    a3.next = a4
    a4.next = a5
    a5.next = a2
    return a1
  }

  const circularLinkedList = makeCircularLinkedList()
  const nonCircularLinkedList = makeLinkedList([1, 2, 3, 4, 5]).head!

  // eslint-disable-next-line no-console
  assert.strictEqual(detectCycle(circularLinkedList), true)
  assert.strictEqual(detectCycle(nonCircularLinkedList), false)
}
// main()
