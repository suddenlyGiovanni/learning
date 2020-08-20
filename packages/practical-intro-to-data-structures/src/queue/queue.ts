/* eslint-disable
  @typescript-eslint/ban-ts-comment,
  max-lines-per-function,
  max-statements,
  no-inline-comments,
  no-plusplus,
  no-undefined,
  no-underscore-dangle,
*/

import { IQueue } from './queue.interface'

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

  public isEmpty(): boolean {
    return this._length > 0
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
