/* eslint-disable spaced-comment, no-inline-comments, no-plusplus, max-classes-per-file, class-methods-use-this, no-underscore-dangle, max-statements, no-console */

export interface ILinkedListNode<T> {
  value: T
  next: null | ILinkedListNode<T>
  toString(): string
}

export interface ILinkedList<T> {
  /*
   * Inserts a new value to the end of the linked list
   * @param {T} value - the value to insert
   */
  insert(value: T): void

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

  /*
   * Searches the linked list and returns true if it contains the value passed
   * @param {T} value - the value to search for
   * @return {boolean} - true if value is found, otherwise false
   */
  contains(value: T): boolean

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
}

export class Node<T> implements ILinkedListNode<T> {
  private _value: T

  private _next: null | ILinkedListNode<T>

  public constructor(value: T, next?: null | ILinkedListNode<T>) {
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

  public set next(node: null | ILinkedListNode<T>) {
    this._next = node
  }

  public get next(): null | ILinkedListNode<T> {
    return this._next
  }

  public toString(): string {
    return JSON.stringify({ value: this._value, next: this._next })
  }
}

/** Class representing a Linked List */
export class LinkedList<T> implements ILinkedList<T> {
  private _head: null | ILinkedListNode<T> = null

  private _tail: null | ILinkedListNode<T> = null

  private _length = 0

  public constructor(value: T) {
    const node = new Node(value, null)
    this._head = node
    this._tail = node
    this._length++
  }

  public get head(): null | ILinkedListNode<T> {
    return this._head
  }

  public get tail(): null | ILinkedListNode<T> {
    return this._tail
  }

  public get length(): number {
    return this._length
  }

  /*
   * Inserts a new value to the end of the linked list
   */
  public insert(value: T): this {
    const node = new Node(value)
    const prevTail = this._tail
    prevTail!.next = node
    this._tail = node
    this._length++
    return this
  }

  /*
   * Deletes a node and returns the deleted node value
   */
  public remove(node: ILinkedListNode<T>): null | T {
    let previousNode: null | ILinkedListNode<T> = null
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
        this._length--
        return currentNode.value
      }
      previousNode!.next = currentNode.next
      this._length--
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

    let currentNode: null | ILinkedListNode<T> = this._head
    while (currentNode?.next !== this._tail && currentNode?.next !== null) {
      currentNode = currentNode.next
    }

    currentNode.next = null
    const tail = this._tail
    this._tail = currentNode
    this._length--
    return tail!.value
  }

  /*
   * Searches the linked list and returns true if it contains the value passed
   */
  public contains(value: T): boolean {
    // head and tail look up are in constant time, better check up
    if (this._tail?.value === value) {
      return true
    }
    let currentNode = this._head
    while (currentNode?.value !== value && currentNode?.next !== null) {
      currentNode = currentNode!.next
    }
    return currentNode?.value === value
  }

  /*
   * Checks if a node is the head of the linked list
   */
  public isHead(node: ILinkedListNode<T>): boolean {
    return this._head === node
  }

  /*
   * Checks if a node is the tail of the linked list
   */
  public isTail(node: ILinkedListNode<T>): boolean {
    return this._tail === node
  }
}

// ------------------ examples-----------------

// construct LinkedList
const testLinkedList = new LinkedList<number>(10)

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
