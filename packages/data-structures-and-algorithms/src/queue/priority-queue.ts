/* eslint-disable func-style, no-undef, no-console */
import type { IPriorityQueue } from '../interfaces/priority-queue.interface'
import type { IQueue } from '../interfaces/queue.interface'

import { Queue } from './queue'

export class PriorityQueue<T> implements IPriorityQueue<T> {
  private highPriorityQueue: IQueue<T>

  private lowPriorityQueue: IQueue<T>

  public constructor() {
    this.lowPriorityQueue = new Queue<T>()
    this.highPriorityQueue = new Queue<T>()
  }

  public clear(): void {
    this.lowPriorityQueue.clear()
    this.highPriorityQueue.clear()
  }

  /**
   * `pull_highest_priority_element` or `dequeue`
   *  remove the element from the queue that has the highest priority, and return it.
   */
  public dequeue(): T | undefined {
    if (!this.highPriorityQueue.isEmpty()) {
      return this.highPriorityQueue.dequeue()
    }
    return this.lowPriorityQueue.dequeue()
  }

  /**
   * `insert_with_priority` or `enqueue`:
   * add an element to the queue with an associated priority
   */
  public enqueue(item: T, isHeighPriority = false): void {
    if (isHeighPriority) {
      this.highPriorityQueue.enqueue(item)
    } else {
      this.lowPriorityQueue.enqueue(item)
    }
  }

  /**
   * IsEmpty check whether the queue has no elements
   */
  public isEmpty(): boolean {
    return this.size() === 0
  }

  // Peek
  public peek(): T | undefined {
    if (!this.highPriorityQueue.isEmpty()) {
      return this.highPriorityQueue.peek()
    }
    return this.lowPriorityQueue.peek()
  }

  public size(): number {
    return this.lowPriorityQueue.size() + this.highPriorityQueue.size()
  }

  public toString(): string {
    return `${this.lowPriorityQueue.toString()}\n${this.highPriorityQueue.toString()}`
  }
}

export const main = (): void => {
  const q = new PriorityQueue()

  q.enqueue('A fix here')
  q.enqueue('A bug there')
  q.enqueue('A new feature')
  console.log(q.peek()) // 'A fix here'

  console.log(q.dequeue()) // 'A fix here'
  q.enqueue('Emergency task!', true)
  console.log(q.peek()) // 'Emergency task!'

  console.log(q.dequeue()) // 'Emergency task!'
  console.log(q.peek()) // 'A bug there'
}
