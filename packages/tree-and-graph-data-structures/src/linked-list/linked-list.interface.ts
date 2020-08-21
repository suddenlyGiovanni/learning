export interface ILinkedListNode<T> {
  element: T
  next: undefined | ILinkedListNode<T>
}

export interface ILinkedList<T> {
  // head: undefined | ILinkedListNode<T>

  /**
   * Iterator of elements in the LinkedList
   * @returns {IterableIterator<T>}
   * @memberof ILinkedList
   */
  [Symbol.iterator](): IterableIterator<T>

  /**
   * Clears the list
   * @memberof ILinkedList
   */
  clear(): void

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
