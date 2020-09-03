/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { ILinkedList } from '../interfaces/linked-list.interface'

import type { IStack } from '../interfaces/stack.interface'
import { LinkedList } from '../linked-list/linked-list'

export class Stack<T> implements IStack<T> {
  private readonly items: ILinkedList<T>

  public constructor() {
    this.items = new LinkedList<T>()
  }

  public clear(): void {
    this.items.clear()
  }

  public isEmpty(): boolean {
    return this.items.isEmpty()
  }

  public peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items.getElementAt(this.items.size() - 1)!.element
  }

  public pop(): T | undefined {
    if (this.isEmpty()) {
      return undefined
    }
    const tailIndex = this.items.size() - 1
    return this.items.removeAt(tailIndex)
  }

  public push(x: T): void {
    this.items.push(x)
  }

  public size(): number {
    return this.items.size()
  }

  public toString(): string {
    return this.items.toString()
  }
}
