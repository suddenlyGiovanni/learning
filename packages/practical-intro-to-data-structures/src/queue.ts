/* eslint-disable no-underscore-dangle, no-undefined, no-inline-comments, @typescript-eslint/ban-ts-comment, no-plusplus, max-statements, max-lines-per-function */

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
export interface IQueue<T> {
  /**
   * Removes and returns the most recently added member to the collection
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  dequeue(): T | undefined

  /**
   * Adds a member to the collection
   * @throws `queue overflow` if the queue has grown over the bounded size
   * @param {T} x
   */
  enqueue(x: T): void

  /**
   * Returns the most Head of the stack without removing it
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  peek(): T | undefined
}

export class Queue<T> implements IQueue<T> {
  // Zero base index
  private _headIndex: null | number

  // 1,2,3,4
  private _length: number

  private readonly _queue: Record<number, T>

  public constructor() {
    this._queue = {}
    this._headIndex = null
    this._length = 0
  }

  public dequeue(): T | undefined {
    if (this._headIndex === null || this._length === 0) {
      return undefined
    }

    if (this._length === 1) {
      const head = this._queue[this._headIndex]
      this.deleteElementFromQueue(this._headIndex)
      this.decrementLength()
      this._headIndex = null
      return head
    }

    const head = this._queue[this._headIndex]
    this.deleteElementFromQueue(this._headIndex)
    this.decrementLength()
    this._headIndex++
    return head
  }

  public enqueue(value: T): void {
    if (this._headIndex === null) {
      /*
       * Head has not been set yet.
       * manually set the head to the start!
       */
      this._headIndex = 0
      const tail = this._headIndex
      this._queue[tail] = value
      this.incrementLength()
    } else {
      // We just have to add to the tail
      const tail = this._length
      this._queue[tail] = value
      this.incrementLength()
    }
  }

  public peek(): T | undefined {
    if (this._headIndex === null) {
      return undefined
    }
    return this._queue[this._headIndex]
  }

  public toString(): string {
    return JSON.stringify(this)
  }

  private decrementLength(): void {
    this._length--
  }

  private deleteElementFromQueue(index: number): void {
    delete this._queue[index]
  }

  private incrementLength(): void {
    this._length++
  }
}

// Example
const main = (): void => {
  const testQueue = new Queue<string>()
  testQueue.toString() // ?

  /*
   * {
   *   "head": null,
   *   "queue": {},
   *   "length": 0
   * }
   */

  testQueue.enqueue('zero')
  testQueue.toString() // ?

  /*
   * {
   *   "head": 0
   *   "queue": {"0": "zero"},
   *   "length": 1
   * }
   */

  testQueue.enqueue('one')
  testQueue.toString() // ?

  /*
   * {
   *   "head": 0
   *   "queue": {"0": "zero", "1": "one"},
   *   "length": 2
   * }
   */

  testQueue.enqueue('two')
  testQueue.toString() // ?

  /*
   * {
   *   "head": 0
   *   "queue": {"0": "zero", "1": "one", "2": "two"},
   *   "length": 3
   * }
   */

  testQueue.peek() // 'zero'
  testQueue.dequeue() // 'zero'
  testQueue.toString() // ?

  /*
   * {
   *   "head": 1
   *   "queue": {"1": "one", "2": "two"},
   *   "length": 2
   * }
   */

  testQueue.peek() // 'one'
  testQueue.dequeue() // 'one'
  testQueue.toString() // ?

  /*
   * {
   *   "head": 2
   *   "queue": {"2": "two"},
   *   "length": 1
   * }
   */

  testQueue.peek() // 'two'
  testQueue.dequeue() // 'two'
  testQueue.toString() // ?

  /*
   * {
   *   "head": null
   *   "queue": {},
   *   "length": 0
   * }
   */

  testQueue.enqueue('three')
  testQueue.toString() // ?

  /*
   * {
   *   "head": 0
   *   "queue": {"0": "three"},
   *   "length": 1
   * }
   */

  testQueue.enqueue('four')
  testQueue.toString() // ?

  /*
   * {
   *   "head": 0
   *   "queue": {"0": "three", "1": "four"},
   *   "length": 2
   * }
   */
}
