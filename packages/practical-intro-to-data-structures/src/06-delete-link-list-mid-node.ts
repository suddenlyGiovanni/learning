/* eslint-disable max-statements */
/**
 * Given a singly linked list, delete middle of the linked list.
 *
 * For example, if given linked list is 1->2->3->4->5 then linked list should be modified to 1->2->4->5
 * If there are even nodes, then there would be two middle nodes, we need to delete the second middle element.
 * For example, if given linked list is 1->2->3->4->5->6 then it should be modified to 1->2->3->5->6.
 * If the input linked list is NULL, then it should remain NULL.
 * If the input linked list has 1 node, then this node should be deleted and new head should be returned.
 */

import { LinkedListNode, LinkedListNodeClass } from './linked-list'

const isEven = (x: number): boolean => x % 2 === 0

/**
 * Deletes a node from the middle of the linked list
 * @param {LinkedListNodeClass} head - the head node of a linked list
 * @return {LinkedListNodeClass} - the deleted node
 */
export const deleteMiddleNode = <T>(
  head: LinkedListNode<T>
): null | LinkedListNode<T> => {
  if (!head) {
    return null
  }
  if (head && head.next === null) {
    return new LinkedListNodeClass<T>(head.value)
  }

  const calculateLength = (): number => {
    let l = 1
    let currentNode = head
    while (currentNode.next !== null) {
      currentNode = currentNode.next
      l += 1
    }
    return l
  }

  const length = calculateLength()
  const middleNode = isEven(length) ? length / 2 + 1 : (length + 1) / 2


  let currentNode = head
  // eslint-disable-next-line init-declarations
  let previousNode: LinkedListNode<T>;
  let i = 1
  while (i < middleNode && currentNode.next !== null) {
    previousNode = currentNode
    currentNode = currentNode.next
    i += 1
  }
  previousNode!.next = currentNode.next
  currentNode.next = null
  return currentNode
}


// Test
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const main = (): void => {
  const a1 = new LinkedListNodeClass(1)
  const a2 = new LinkedListNodeClass(2)
  const a3 = new LinkedListNodeClass(3)
  const a4 = new LinkedListNodeClass(4)
  const a5 = new LinkedListNodeClass(5)
  a1.next = a2
  a2.next = a3
  a3.next = a4
  a4.next = a5

  console.log(deleteMiddleNode(a1))
  console.log(a1)
}
// main()
