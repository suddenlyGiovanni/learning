/*
  eslint-disable
  class-methods-use-this,
  max-classes-per-file,
  max-lines,
  max-lines-per-function,
  max-statements,
  no-console,
  no-inline-comments,
  no-plusplus,
  no-underscore-dangle,
  spaced-comment,
*/


import { ILinkedList, ILinkedListNode } from './linked-list.interface'



export class Node<T> implements ILinkedListNode<T> {
  private _next: null | ILinkedListNode<T>

  private _value: T

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

  public setNext(node: null | ILinkedListNode<T>): this {
    this._next = node
    return this
  }

  public setValue(value: T): this {
    this._value = value
    return this
  }

  public set next(node: null | ILinkedListNode<T>) {
    this._next = node
  }

  public get next(): null | ILinkedListNode<T> {
    return this._next
  }

  public toString(): string {
    return JSON.stringify(this)
  }
}

/** Class representing a Linked List */
export class LinkedList<T> implements ILinkedList<T> {
  private _head: null | ILinkedListNode<T>

  private _length: number

  private _tail: null | ILinkedListNode<T>

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

  public get head(): null | ILinkedListNode<T> {
    return this._head
  }

  public get tail(): null | ILinkedListNode<T> {
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
  public isHead(node: ILinkedListNode<T>): boolean {
    return this._head === node
  }

  /**
   * Checks if a node is the tail of the linked list
   */
  public isTail(node: ILinkedListNode<T>): boolean {
    return this._tail === node
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

    let node: null | ILinkedListNode<T> = this._head
    while (node?.next !== this._tail && node?.next !== null) {
      node = node.next
    }

    node.next = null
    const tail = this._tail
    this._tail = node
    this.decrementLength()
    return tail!.value
  }

  public toString(): string {
    return JSON.stringify(this, null, 2)
  }

  private decrementLength(): void {
    this._length--
  }

  private incrementLength(): void {
    this._length++
  }
}

export const makeLinkedList = <T>(values: T[]): ILinkedList<T> => {
  return values.reduce((list, value) => list.insert(value), new LinkedList<T>())
}
