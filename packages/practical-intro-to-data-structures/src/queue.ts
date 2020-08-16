/* eslint-disable no-underscore-dangle, no-undefined, no-inline-comments, @typescript-eslint/ban-ts-comment, no-plusplus, max-statements, max-lines-per-function */

import assert from 'assert'

/**
 * A Queue is a collection of entities that are maintained in a sequence and can be modified by the
 * addition of entities at one end of the sequence and the removal of entities from the
 * other end of the sequence.
 * FIFO: First-In-First-Out
 *
 * Time complexity in big O notation
 *
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
    return JSON.stringify(this, null, 2)
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
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {},
        _headIndex: null,
        _length: 0,
      },
      null,
      2
    )
  )

  testQueue.enqueue('zero')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '0': 'zero',
        },
        _headIndex: 0,
        _length: 1,
      },
      null,
      2
    )
  )

  testQueue.enqueue('one')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '0': 'zero',
          '1': 'one',
        },
        _headIndex: 0,
        _length: 2,
      },
      null,
      2
    )
  )

  testQueue.enqueue('two')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '0': 'zero',
          '1': 'one',
          '2': 'two',
        },
        _headIndex: 0,
        _length: 3,
      },
      null,
      2
    )
  )

  assert.strictEqual(testQueue.peek(), 'zero')
  assert.strictEqual(testQueue.dequeue(), 'zero')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '1': 'one',
          '2': 'two',
        },
        _headIndex: 1,
        _length: 2,
      },
      null,
      2
    )
  )

  assert.strictEqual(testQueue.peek(), 'one')
  assert.strictEqual(testQueue.dequeue(), 'one')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '2': 'two',
        },
        _headIndex: 2,
        _length: 1,
      },
      null,
      2
    )
  )

  assert.strictEqual(testQueue.peek(), 'two')
  assert.strictEqual(testQueue.dequeue(), 'two')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {},
        _headIndex: null,
        _length: 0,
      },
      null,
      2
    )
  )

  testQueue.enqueue('three')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '0': 'three',
        },
        _headIndex: 0,
        _length: 1,
      },
      null,
      2
    )
  )

  testQueue.enqueue('four')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '0': 'three',
          '1': 'four',
        },
        _headIndex: 0,
        _length: 2,
      },
      null,
      2
    )
  )
}
// main()
