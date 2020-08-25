/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { LinkedList } from '../linked-list/linked-list'

import type { ILinkedList } from '../linked-list/linked-list.interface'

import type { IQueue } from './queue.interface'

export class Queue<T> implements IQueue<T> {
  private readonly items: ILinkedList<T>

  public constructor() {
    this.items = new LinkedList<T>()
  }

  public clear(): void {
    this.items.clear()
  }

  public dequeue(): T | undefined {
    if(this.isEmpty()) {
      return undefined
    }
    return this.items.removeAt(0)
  }

  public enqueue(x: T): void {
    this.items.push(x)
  }

  public isEmpty(): boolean {
    return this.items.isEmpty()
  }

  public peek(): T | undefined {
    if(this.isEmpty()) {
      return undefined
    }
    return this.items.getHead()!.element
  }

  public size(): number {
    return this.items.size()
  }

  public toString(): string {
    return this.items.toString()
  }
}
