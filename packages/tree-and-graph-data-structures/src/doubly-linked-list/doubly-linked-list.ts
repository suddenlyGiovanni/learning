/*
  eslint-disable
  @typescript-eslint/no-unused-vars,
  class-methods-use-this,
  no-unused-vars,
*/

import type {
  IDoublyLinkedList,
  IDoublyLinkedListNode,
} from './doubly-linked-list.interface'

export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
  #head: IDoublyLinkedListNode<T> | undefined

  #size: number

  #tail: IDoublyLinkedListNode<T> | undefined

  public constructor() {
    this.#head = undefined
    this.#tail = undefined
    this.#size = 0
  }

  public [Symbol.iterator](): IterableIterator<IDoublyLinkedListNode<T>> {
    throw new Error('Method not implemented.')
  }

  public clear(): void {
    throw new Error('Method not implemented.')
  }

  public forEach(cb: (node: IDoublyLinkedListNode<T>) => void): this {
    throw new Error('Method not implemented.')
  }

  public getElementAt(index: number): IDoublyLinkedListNode<T> | undefined {
    throw new Error('Method not implemented.')
  }

  public getHead(): IDoublyLinkedListNode<T> | undefined {
    throw new Error('Method not implemented.')
  }

  public getTail(): IDoublyLinkedListNode<T> | undefined {
    throw new Error('Method not implemented.')
  }

  public indexOf(element: T): number {
    throw new Error('Method not implemented.')
  }

  public insert(element: T, index: number): boolean {
    throw new Error('Method not implemented.')
  }

  public isEmpty(): boolean {
    throw new Error('Method not implemented.')
  }

  public map<U>(cb: (element: T) => U): IDoublyLinkedList<U> {
    throw new Error('Method not implemented.')
  }

  public push(element: T): void {
    throw new Error('Method not implemented.')
  }

  public remove(element: T): T | undefined {
    throw new Error('Method not implemented.')
  }

  public removeAt(index: number): T | undefined {
    throw new Error('Method not implemented.')
  }

  public size(): number {
    throw new Error('Method not implemented.')
  }

  public toString(): string {
    throw new Error('Method not implemented.')
  }
}
