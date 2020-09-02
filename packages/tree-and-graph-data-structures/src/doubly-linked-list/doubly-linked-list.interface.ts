import type {
  ILinkedList,
  ILinkedListNode,
} from '../linked-list/linked-list.interface'

export interface IDoublyLinkedListNode<T> extends ILinkedListNode<T> {
  element: T
  next: undefined | IDoublyLinkedListNode<T>
  prev: undefined | IDoublyLinkedListNode<T>
}

export interface IDoublyLinkedList<T> extends ILinkedList<T> {

  /**
   * Iterator of elements in the DoublyLinkedList
   * @returns {IterableIterator<IDoublyLinkedList<T>>}
   * @memberof IDoublyLinkedList
   */
  [Symbol.iterator](): IterableIterator<IDoublyLinkedListNode<T>>

  /**
   * Clears the list
   * @memberof IDoublyLinkedList
   */
  clear(): void

  /**
   * This method behave similarly to the well known Array.prototype.forEach method
   * @param {(node: IDoublyLinkedListNode<T>) => void} cb
   * @returns {this}
   * @memberof IDoublyLinkedList
   */
  forEach(cb: (node: IDoublyLinkedListNode<T>) => void): this

  /**
   * This method returns the element of a specific position in the list.
   * If the element does not exist in the list, it returns undefined.
   * @param {number} index
   * @returns {(undefined | IDoublyLinkedListNode<T>)}
   * @memberof IDoublyLinkedList
   */
  getElementAt(index: number): undefined | IDoublyLinkedListNode<T>

  /**
   * This method returns the head of the list.
   * @returns {(undefined | IDoublyLinkedListNode<T>)}
   * @memberof IDoublyLinkedList
   */
  getHead(): undefined | IDoublyLinkedListNode<T>


  /**
   * This method returns the tail of the list.
   * @returns {(undefined | IDoublyLinkedListNode<T>)}
   * @memberof IDoublyLinkedList
   */
  getTail(): undefined | IDoublyLinkedListNode<T>



  /**
   * This method returns the index of the element in the list.
   * If the element does not exist in the list, it returns -1.
   * @param {T} element
   * @returns {( -1 | number)} - index of the element in the list
   * @memberof IDoublyLinkedList
   */
  indexOf(element: T): -1 | number

  /**
   * Inserts a new element at a specified index in the list
   * @param {T} element - the element to insert
   * @param {number} index
   * @returns {boolean}
   * @memberof IDoublyLinkedList
   */
  insert(element: T, index: number): boolean

  /**
   * This method returns true if the linked list does not contain any elements,
   * and false if the size of the linked list is bigger than 0
   * @returns {boolean}
   * @memberof IDoublyLinkedList
   */
  isEmpty(): boolean

  /**
   * This method maps over the content of each node in the fashion of A -> B,
   * and returns a brand new IDoublyLinkedList<B>
   * @template U
   * @param {(element: T) => U} cb
   * @returns {IDoublyLinkedList<U>}
   * @memberof IDoublyLinkedList
   */
  map<U>(cb: (element: T) => U): IDoublyLinkedList<U>

  /**
   * This method adds a new element to the end of the list
   * @param {T} element
   * @memberof IDoublyLinkedList
   */
  push(element: T): void

  /**
   * This method removes an element from the list
   * @param {T} element
   * @returns {(undefined | T)}
   * @memberof IDoublyLinkedList
   */
  remove(element: T): undefined | T

  /**
   * This method removes an item from a specified index in the list.
   * @param {number} index
   * @returns {(undefined | T)}
   * @memberof IDoublyLinkedList
   */
  removeAt(index: number): undefined | T

  /**
   * This method returns the number of elements the linked list contains.
   * It is similar to the length property of the array.
   * @returns {number}
   * @memberof IDoublyLinkedList
   */
  size(): number

  /**
   * This method returns a string representation of the linked list.
   * As the list uses a Node class as an element, we need to overwrite the default toString method
   * inherited from the JavaScript Object class to output only the element values
   * @returns {string}
   * @memberof IDoublyLinkedList
   */
  toString(): string
}
