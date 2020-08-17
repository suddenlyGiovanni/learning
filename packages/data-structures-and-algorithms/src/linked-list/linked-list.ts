/* eslint-disable no-plusplus, max-statements, no-underscore-dangle, max-lines-per-function, func-style, no-console, no-undef, @typescript-eslint/member-ordering */

/**
 * Linked list
 * |Head| - - - - -  |Tail|
 * | O | -> O -> O ->| O |
 * a Linked list is a linear collection of data elements who each element points to the next
 * It is a data structure consisting of a collection of nodes which together represent a sequence.
 *  In its most basic form, each node contains:
 * - data,
 * - and a reference (in other words, a link) to the next node in the sequence.
 * {value, next -}-> {value, next -}-> {value, next}
 * This structure allows for efficient insertion or removal of elements from any position in the
 * sequence during iteration.
 * More complex variants add additional links, allowing more efficient insertion or removal of
 * nodes at arbitrary positions.
 * A drawback of linked lists is that access time is linear.
 * Linked lists are among the simplest and most common data structures.
 * They can be used to implement several other common abstract data types, including lists, stacks,
 * queues, associative arrays, and S-expressions, though it is not uncommon to implement those data
 * structures directly without using a linked list as the basis.
 *
 * The principal benefit of a linked list over a conventional array is that the list elements can
 * be easily inserted or removed without reallocation or reorganization of the entire structure
 * because the data items need not be stored contiguously in memory or on disk, while restructuring
 * an array at run-time is a much more expensive operation.
 *
 * Linked lists allow insertion and removal of nodes at any point in the list, and allow doing so
 * with a constant number of operations by keeping the link previous to the link being added or
 * removed in memory during list traversal.
 *
 * On the other hand, since simple linked lists by themselves do not allow random access to the
 * data or any form of efficient indexing, many basic operations may require iterating through most
 * or all of the list elements.
 *
 * Linked list are dynamic, so the length of list can increase or decrease as necessary.
 * Each node does not necessarily follow the previous one physically in the memory.
 */

interface INode<T = null> {
  value: T
  next: INode<T> | null
}

interface LinkedList<T> {
  /** The first current element of the linked list */
  readonly head: null | INode<T>

  /** The last current element of the linked list */
  readonly tail: null | INode<T>

  /** The overall length of the linked list */
  readonly length: number

  /** Adds an element to the end of the linked list */
  readonly push: (value: T) => INode<T>

  /** Removes and return the the last element of the linked list if one is available */
  readonly pop: () => null | INode<T>

  /**
   * Retrieves an element at a specified index and then returns it.
   * if the index is out of bounds it will return null
   *
   */
  readonly get: (index: number) => null | INode<T>

  /** Deletes an element at a specified index and returns it. */
  readonly delete: (index: number) => null | INode<T>

  /** Print the linked list to a string representation */
  readonly print: () => string

  readonly isEmpty: () => boolean
}

function createNode<T>(value: T): INode<T> {
  return {
    value,
    next: null,
  }
}

export function createLinkedList<T>(): LinkedList<T> {
  let _head: null | INode<T> = null
  let _tail: null | INode<T> = null
  let _length = 0
  return {
    get head() {
      return _head
    },

    get tail() {
      return _tail
    },

    get length() {
      return _length
    },

    push(value) {
      // Push places an element to the end of the list
      const node = createNode(value)

      // Depending on the length of the list we need to take some different actions

      // if the LL does not have a head and thus is empty...
      if (this.head === null) {
        _head = node
        _tail = node
        _length++
        return node
      }
      /**
       * If the LL does have a length and thus have a head and a tail...
       * a we need to update the tail property to the one just created.
       */

      // set the pointer of the current tail to the next node.
      _tail.next = node
      // Set the old tail to the now current new node.
      _tail = node
      _length++
      return node
      // We need to increment the length property
    },

    pop() {
      /**
       * How to pop an item when:
       * - a list is empty
       * - a list has a length of one
       * - a list has many items
       *
       */

      // SCENARIO: a list is empty
      if (this.isEmpty()) {
        return null
      }

      const node = _tail

      // SCENARIO: a list has one item

      // the list has a length of one when:
      if (_head === _tail) {
        // We need to remove the only element in the list and reset the head and tail back to null
        _head = null
        _tail = null
        _length--
        return node
      }

      // SCENARIO: a list has many items

      /**
       * need to set the penultimate item before tail to the new tail
       * with its next value set to null
       *
       */
      let current = _head
      let penultimate: INode<T>
      while (current) {
        if (current.next === _tail) {
          penultimate = current
          break
        }
        current = current.next
      }

      penultimate.next = null
      _tail = penultimate
      _length--
      return node
    },

    get(index) {
      if (index < 0 || index > _length) {
        return null
      }

      if (index === 0) {
        return _head
      }

      let current = _head
      let i = 0
      while (i < index) {
        i++
        current = current.next
      }

      return current
    },

    delete(index) {
      if (index < 0 || index > _length) {
        return null
      }

      if (index === 0) {
        const deleted = _head
        _head = _head.next
        _length--
        return deleted
      }

      let current = _head
      let previous: null | INode<T>
      let i = 0

      while (i < index) {
        i++
        previous = current
        current = current.next
      }
      const deleted = current
      previous.next = current.next
      _length--
      return deleted
    },

    print() {
      const values: T[] = []
      let current = _head

      while (current) {
        values.push(current.value)
        current = current.next
      }

      return values.join(' => ')
    },
    isEmpty() {
      return this.length === 0
    },
  }
}

export const main = (): void => {
  const list = createLinkedList()
  const values = ['a', 'b', 'c', 'd', 'e']
  const nodes = values.map((val) => list.push(val))

  console.log(list.isEmpty()) // => 'false';

  // remove the last element of the list. expect it to be 'e';
  list.pop() // ?
  console.log(list.tail && list.tail.value) // => 'd'

  console.log(JSON.stringify(list.get(1), undefined, 4))
  /**
   * {
   *  "value": "b",
   *   "next": {
   *      "value": "c",
   *      "next": {
   *        "value": "d",
   *        "next": null
   *        }
   *    }
   * }
   */

  console.log(list.delete(1))
  console.log(list.print()) // => 'a => c => d'
}
// main()
