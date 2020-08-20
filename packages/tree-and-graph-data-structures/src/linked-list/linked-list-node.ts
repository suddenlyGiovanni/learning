import type { ILinkedListNode } from './linked-list.interface'

export class Node<T> implements ILinkedListNode<T> {
  #element: T

  #next: undefined | ILinkedListNode<T>

  public constructor(
    element: T,
    next: undefined | ILinkedListNode<T> = undefined
  ) {
    this.#element = element
    this.#next = next
  }

  public get element(): T {
    return this.#element
  }

  public set element(data: T) {
    this.#element = data
  }

  public get next(): undefined | ILinkedListNode<T> {
    return this.#next
  }

  public set next(next: undefined | ILinkedListNode<T>) {
    this.#next = next
  }
}
