/*
  eslint-disable
  @typescript-eslint/no-unused-vars,
  class-methods-use-this,
  no-unused-vars,
*/

import type { IDoublyLinkedListNode } from '../interfaces/doubly-linked-list.interface'

export class Node<T> implements IDoublyLinkedListNode<T> {
  private _element: T

  private _next: undefined | IDoublyLinkedListNode<T>

  private _prev: IDoublyLinkedListNode<T> | undefined

  public constructor(
    element: T,
    next: undefined | IDoublyLinkedListNode<T> = undefined,
    prev: undefined | IDoublyLinkedListNode<T> = undefined
  ) {
    this._element = element
    this._next = next
    this._prev = prev
  }

  public get element(): T {
    return this._element
  }

  public set element(data: T) {
    this._element = data
  }

  public get next(): undefined | IDoublyLinkedListNode<T> {
    return this._next
  }

  public set next(next: undefined | IDoublyLinkedListNode<T>) {
    this._next = next
  }

  public get prev(): undefined | IDoublyLinkedListNode<T> {
    return this._prev
  }

  public set prev(prev: undefined | IDoublyLinkedListNode<T>) {
    this._prev = prev
  }
}
