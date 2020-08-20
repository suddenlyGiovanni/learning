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

import { INode, Node } from '../linked-list/linked-list'

const isEven = (x: number): boolean => x % 2 === 0
const calculateLength = <T>(head: INode<T>): number => {
  let length = 1
  let node = head
  while (node.next !== null) {
    node = node.next
    length += 1
  }
  return length
}
/**
 * Deletes a node from the middle of the linked list
 * @param {Node} head - the head node of a linked list
 * @return {Node} - the deleted node
 */
export const deleteMiddleNode = <T>(head: INode<T>): null | INode<T> => {
  if (!head) {
    return null
  }
  if (head && head.next === null) {
    return new Node<T>(head.value)
  }

  const length = calculateLength(head)
  const middleNode = isEven(length) ? length / 2 + 1 : (length + 1) / 2

  let node = head
  // eslint-disable-next-line init-declarations
  let previous: INode<T>
  let i = 1
  while (i < middleNode && node.next !== null) {
    previous = node
    node = node.next
    i += 1
  }
  previous!.next = node.next
  node.next = null
  return node
}
