/* eslint-disable spaced-comment, no-inline-comments, no-plusplus, max-classes-per-file, class-methods-use-this, no-underscore-dangle, max-statements, no-console, max-lines-per-function */

export interface INode<T> {
  next: null | INode<T>
  value: T
  toString(): string
}

export interface ILinkedList<T> {
  head: null | INode<T>

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
  isHead(node: INode<T>): boolean

  /*
   * Checks if a node is the tail of the linked list
   * @param {ILinkedListNode<T>} node - the node to check
   * @return {boolean} - true if node is the tail, otherwise false
   */
  isTail(node: INode<T>): boolean

  /*
   * Deletes a node
   * @param {ILinkedListNode<T>} node - the node to remove
   * @return {null | T} value - the deleted node's value
   */
  remove(node: INode<T>): null | T

  /*
   * Removes the value at the end of the linked list
   * @return {T} - the removed value
   */
  removeTail(): null | T
}

export class Node<T> implements INode<T> {
  private _next: null | INode<T>

  private _value: T

  public constructor(value: T, next?: null | INode<T>) {
    this._value = value
    if (next) {
      this._next = next
    }
    this._next = null
  }

  public get value(): T {
    return this._value
  }

  public set value(value: T) {
    this._value = value
  }

  public set next(node: null | INode<T>) {
    this._next = node
  }

  public get next(): null | INode<T> {
    return this._next
  }

  public toString(): string {
    return JSON.stringify(this)
  }
}

/** Class representing a Linked List */
export class LinkedList<T> implements ILinkedList<T> {
  private _head: null | INode<T>

  private _length: number

  private _tail: null | INode<T>

  public constructor() {
    this._head = null
    this._tail = null
    this._length = 0
  }

  /** Implementing the iterable protocol!! */

  *[Symbol.iterator]() {
    let node = this._head
    while (node) {
      yield node?.value
      node = node?.next
    }
  }

  public get head(): null | INode<T> {
    return this._head
  }

  public get tail(): null | INode<T> {
    return this._tail
  }

  public get length(): number {
    return this._length
  }

  /**
   * Searches the linked list and returns true if it contains the value passed
   */
  public contains(value: T): boolean {
    // Head and tail look up are in constant time, better check up
    if (this._tail?.value === value) {
      return true
    }
    let node = this._head
    while (node?.value !== value && node?.next !== null) {
      node = node!.next
    }
    return node?.value === value
  }

  /**
   * Inserts a new value to the end of the linked list
   */
  public insert(value: T): this {
    const node = new Node(value)
    if (this._head === null && this._tail === null) {
      // We are to insert the first node in the list.
      this._head = node
      this._tail = this._head
      this.incrementLength()
      return this
    }

    const prevTail = this._tail
    prevTail!.next = node
    this._tail = node
    this.incrementLength()
    return this
  }

  /**
   * Checks if a node is the head of the linked list
   */
  public isHead(node: INode<T>): boolean {
    return this._head === node
  }

  /**
   * Checks if a node is the tail of the linked list
   */
  public isTail(node: INode<T>): boolean {
    return this._tail === node
  }

  /*
   * Deletes a node and returns the deleted node value
   */
  public remove(node: INode<T>): null | T {
    let previousNode: null | INode<T> = null
    let currentNode = this._head
    while (currentNode && currentNode !== node && currentNode.next !== null) {
      previousNode = currentNode
      currentNode = currentNode?.next
    }
    // Either we have found the matching node or we are at the end of the list
    if (currentNode === node) {
      if (this.isTail(currentNode)) {
        previousNode!.next = null
        this._tail = previousNode
        this.decrementLength()
        return currentNode.value
      }
      previousNode!.next = currentNode.next
      this.decrementLength()
      return currentNode.value
    }
    return null
  }

  /*
   * Removes the value at the end of the linked list and returns it
   */
  public removeTail(): null | T {
    if (!this._head) {
      return null
    }

    let node: null | INode<T> = this._head
    while (node?.next !== this._tail && node?.next !== null) {
      node = node.next
    }

    node.next = null
    const tail = this._tail
    this._tail = node
    this.decrementLength()
    return tail!.value
  }

  private decrementLength(): void {
    this._length--
  }

  private incrementLength(): void {
    this._length++
  }
}

export const populateLinkedList = <T>(values: T[]): ILinkedList<T> => {
  return values.reduce((list, value) => list.insert(value), new LinkedList<T>())
}

// ------------------ examples-----------------
const main = (): void => {
  // construct LinkedList
  const testLinkedList = new LinkedList<number>()
  testLinkedList.insert(10)

  // isHead()
  const { head } = testLinkedList
  console.log(testLinkedList.isHead(head!)) // =>  true

  console.log(testLinkedList.head) // => Node { value: 10, next: null }
  console.log(testLinkedList.tail) // => Node { value: 10, next: null }
  console.log(testLinkedList.length) // => 1

  // insert(value)
  testLinkedList.insert(11)
  console.log(testLinkedList.head) // => Node { value: 10, next: { value: 11, next: null } }
  const node11 = testLinkedList.tail
  console.log(node11) // => Node { value:11, next :null }
  console.log(testLinkedList.length) // => 2

  testLinkedList.insert(12)
  console.log(testLinkedList.length) // => 3

  // removeTail()
  console.log(testLinkedList.removeTail()) // => 12
  console.log(testLinkedList.tail) // => Node { value: 11, next: null }
  console.log(testLinkedList.length) // => 2

  // contains(value)
  console.log(testLinkedList.contains(10)) // => true
  console.log(testLinkedList.contains(87)) // => false
  console.log(testLinkedList.contains(11)) // => true

  // remove(value)
  testLinkedList.insert(13) // {[10] -> [11] -> [13]}
  console.log(testLinkedList.tail) // =>  Node { _value: 13, _next: null }

  testLinkedList.insert(14) // {[10] -> [11] -> [13] -> [14]}
  const node14 = testLinkedList.tail // =>  Node { _value: 14, _next: null }
  testLinkedList.remove(node14!) // => 14
  console.log(testLinkedList.tail) // => Node { _value: 13, _next: null }

  // {[10] -> [11] -> [13]}
  console.log(testLinkedList) // => 14
  testLinkedList.remove(node11!) // => 11
  console.log(JSON.stringify(testLinkedList, null, 2)) // => 14 {[10] -> [13]}

  for (const el of testLinkedList) {
    console.log(el)
  }
}
