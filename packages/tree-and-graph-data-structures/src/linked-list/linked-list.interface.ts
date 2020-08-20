
export interface ILinkedListNode<T> {
  data: T
  next: null | ILinkedListNode<T>
}


export interface ILinkedList<T> {
  head: null | ILinkedListNode<T>

  length: number

  /*
   * Searches the linked list and returns true if it contains the value passed
   * @param {T} value - the value to search for
   * @return {boolean} - true if value is found, otherwise false
   */
  contains(value: T): boolean

  /*
   * Inserts a new value to the end of the linked list
   * @param {T} value - the value to insert
   */
  insert(value: T): void

  /*
   * Checks if a node is the head of the linked list
   * @param {ILinkedListNode<T>} node - the node to check
   * @return {boolean} - true if node is the head, otherwise false
   */
  isHead(node: ILinkedListNode<T>): boolean

  /*
   * Checks if a node is the tail of the linked list
   * @param {ILinkedListNode<T>} node - the node to check
   * @return {boolean} - true if node is the tail, otherwise false
   */
  isTail(node: ILinkedListNode<T>): boolean

  /*
   * Deletes a node
   * @param {ILinkedListNode<T>} node - the node to remove
   * @return {null | T} value - the deleted node's value
   */
  remove(node: ILinkedListNode<T>): null | T

  /*
   * Removes the value at the end of the linked list
   * @return {T} - the removed value
   */
  removeTail(): null | T
}
