/* eslint-disable func-style, no-undef, no-console */
import { createQueue } from '../index'

/**
 * Priority queue:
 * a priority queue is an abstract data type which is like a regular queue but where additionally
 * each element has a "priority" associated with it.
 * In a priority queue, an element with high priority is served before an element with low priority.
 * A priority queue must at least support the following operations:
 * - `is_empty`: check whether the queue has no elements.
 * - `insert_with_priority`: add an element to the queue with an associated priority.
 * - `pull_highest_priority_element`: remove the element from the queue that has the highest
 *    priority, and return it
 */

interface PriorityQueue<T> {
  readonly dequeue: () => T | undefined
  readonly enqueue: (item: T, isHeighPriority?: boolean) => void
  readonly isEmpty: () => boolean
  readonly length: number
  readonly peek: () => T
}

export function createPriorityQueue<T>(): PriorityQueue<T> {
  const lowPriorityQueue = createQueue<T>()
  const highPriorityQueue = createQueue<T>()
  return {
    /**
     * `insert_with_priority` or `enqueue`:
     * add an element to the queue with an associated priority
     */
    enqueue(item, isHeighPriority = false) {
      isHeighPriority
        ? highPriorityQueue.enqueue(item)
        : lowPriorityQueue.enqueue(item)
    },
    /**
     * `pull_highest_priority_element` or `dequeue`
     *  remove the element from the queue that has the highest priority, and return it.
     */
    dequeue() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.dequeue()
      }
      return lowPriorityQueue.dequeue()
    },

    // Peek
    peek() {
      if (!highPriorityQueue.isEmpty()) {
        return highPriorityQueue.peek()
      }
      return lowPriorityQueue.peek()
    },

    /**
     * Returns the length of the queue
     */
    get length(): number {
      return highPriorityQueue.length + lowPriorityQueue.length
    },

    /**
     * IsEmpty check whether the queue has no elements
     */
    isEmpty() {
      return highPriorityQueue.isEmpty() && lowPriorityQueue.isEmpty()
    },
  }
}

export const main = (): void => {
  const q = createPriorityQueue()

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
// main()
