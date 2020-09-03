import type { ILinkedListNode } from '../interfaces/linked-list.interface'

export class Node<T> implements ILinkedListNode<T> {
  private _element: T

  private _next: undefined | ILinkedListNode<T>

  public constructor(
    element: T,
    next: undefined | ILinkedListNode<T> = undefined
  ) {
    this._element = element
    this._next = next
  }

  public get element(): T {
    return this._element
  }

  public set element(data: T) {
    this._element = data
  }

  public get next(): undefined | ILinkedListNode<T> {
    return this._next
  }

  public set next(next: undefined | ILinkedListNode<T>) {
    this._next = next
  }
}
