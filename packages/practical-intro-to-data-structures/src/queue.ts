/* eslint-disable no-underscore-dangle, no-undefined, no-inline-comments, @typescript-eslint/ban-ts-comment */

/**
 * A Queue is a collection of entities that are maintained in a sequence and can be modified by the
 * addition of entities at one end of the sequence and the removal of entities from the
 * other end of the sequence.
 * FIFO: First-In-First-Out
 *
 * Time complexity in big O notation
 * Algorithm | Average| Worst case
 * ---------|----------|---------
 * Space  | O(n)  | O(n)
 * Search | O(n)  | O(n)
 * Insert | O(1)  | O(1)
 * Delete | O(1)  | O(1)
 *
 */
export interface QueueInterface<T> {
  /**
   * Adds a member to the collection
   * @throws `queue overflow` if the queue has grown over the bounded size
   * @param {T} x
   */
  enqueue(x: T): void

  /**
   * Removes and returns the most recently added member to the collection
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  dequeue(): T | undefined

  /**
   * Returns the most Head of the stack without removing it
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  peek(): T | undefined
}

export class Queue<T> implements QueueInterface<T> {
  private readonly _queue: T[]

  public constructor() {
    this._queue = []
  }

  public enqueue(x: T): void {
    this._queue.push(x)
  }

  public dequeue(): T | undefined {
    if (this._queue.length > 0) {
      return this._queue.shift() as T
    }
    return undefined
  }

  public peek(): T | undefined {
    if (this._queue.length > 0) {
      return this._queue[0]
    }
    return undefined
  }
}

// Example

const testQueue = new Queue<string>()
testQueue.enqueue('first')
testQueue.enqueue('second')
testQueue.enqueue('third')
testQueue.enqueue('forth')
testQueue.peek() // => 'first'
testQueue.dequeue() // => 'first'
testQueue.dequeue() // => 'second'
testQueue.dequeue() // => 'third'
testQueue.dequeue() // => 'forth'
testQueue.peek() // => Error('Queue underflow')
testQueue.dequeue() // => Error('Queue underflow')
