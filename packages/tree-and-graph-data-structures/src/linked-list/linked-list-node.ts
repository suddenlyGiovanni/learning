import type { ILinkedListNode } from './linked-list.interface'

export class Node<T> implements ILinkedListNode<T> {
  #data: T

  #next: null | ILinkedListNode<T>

  public constructor(data: T, next: null | ILinkedListNode<T> = null) {
    this.#data = data
    this.#next = next
  }

  public get data(): T {
    return this.#data
  }

  public set data(data: T) {
    this.#data = data
  }

  public get next(): null | ILinkedListNode<T> {
    return this.#next
  }

  public set next(next: null | ILinkedListNode<T>) {
    this.#next = next
  }
}
