export interface ILinkedListNode<T> {
  element: T
  next: undefined | ILinkedListNode<T>
}

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
export interface ILinkedList<T> {
  // head: undefined | ILinkedListNode<T>

  /**
   * Iterator of elements in the LinkedList
   * @returns {IterableIterator<T>}
   * @memberof ILinkedList
   */
  [Symbol.iterator](): IterableIterator<ILinkedListNode<T>>

  /**
   * Clears the list
   * @memberof ILinkedList
   */
  clear(): void

  /**
   * This method behave similarly to the well known Array.prototype.forEach method
   * @param {(node: ILinkedListNode<T>) => void} cb
   * @returns {this}
   * @memberof ILinkedList
   */
  forEach(cb: (node: ILinkedListNode<T>) => void): this

  /**
   * This method returns the element of a specific position in the list.
   * If the element does not exist in the list, it returns undefined.
   * @param {number} index
   * @memberof ILinkedList
   */
  getElementAt(index: number): undefined | ILinkedListNode<T>

  /**
   * This method returns the head of the list.
   * @returns {(undefined | ILinkedListNode<T>)}
   * @memberof ILinkedList
   */
  getHead(): undefined | ILinkedListNode<T>

  /**
   * This method returns the index of the element in the list.
   * If the element does not exist in the list, it returns -1.
   * @param {T} element
   * @returns { -1 | number} - index of the element in the list
   * @memberof ILinkedList
   */
  indexOf(element: T): -1 | number

  /**
   * Inserts a new element at a specified index in the list
   * @param {T} element - the element to insert
   * @memberof ILinkedList
   */
  insert(element: T, index: number): boolean

  /**
   * This method returns true if the linked list does not contain any elements,
   * and false if the size of the linked list is bigger than 0
   * @returns {boolean}
   * @memberof ILinkedList
   */
  isEmpty(): boolean

  /**
   * This method maps over the content of each node in the fashion of A -> B,
   * and returns a brand new LinkedList<B>
   * @template U
   * @param {(element: T) => U} cb
   * @returns {ILinkedList<U>}
   * @memberof ILinkedList
   */
  map<U>(cb: (element: T) => U): ILinkedList<U>

  /**
   * This method adds a new element to the end of the list
   * @param {T} element
   * @memberof ILinkedList
   */
  push(element: T): void

  /**
   * This method removes an element from the list
   * @param {T} element
   * @returns {(undefined | T)}
   * @memberof ILinkedList
   */
  remove(element: T): undefined | T

  /**
   * This method removes an item from a specified index in the list.
   * @param {number} index
   * @returns {(undefined | T)}
   * @memberof ILinkedList
   */
  removeAt(index: number): undefined | T

  /**
   * This method returns the number of elements the linked list contains.
   * It is similar to the length property of the array.
   * @returns {number}
   * @memberof ILinkedList
   */
  size(): number

  /**
   * This method returns a string representation of the linked list.
   * As the list uses a Node class as an element, we need to overwrite the default toString method
   * inherited from the JavaScript Object class to output only the element values
   * @returns {string}
   * @memberof ILinkedList
   */
  toString(): string
}
