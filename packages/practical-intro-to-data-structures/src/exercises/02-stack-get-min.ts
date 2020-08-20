/*
  eslint-disable
  dot-notation,
  max-lines-per-function,
  max-statements,
  no-underscore-dangle,
  no-unused-expressions,
  spaced-comment,
*/

import assert from 'assert'

import { IStack, Stack } from '../stack/stack'

/**
 * # Exercise:
 * Implement the a min method for the Stack class below.
 */

interface Min<T> {
  /*
   * Returns the min in the stack without removing it
   * @return {undefined | T} the minimum value in the stack
   */
  min(): undefined | T
}

interface Max<T> {
  /*
   * Returns the `max` in the stack without removing it
   * @return {undefined | T} the maximum value in the stack
   */
  max(): undefined | T
}

/**
 * Stack class
 * Time: push O(1), pop O(1), peek O(1), min O(1)
 * @constructor
 * @template T
 */
export default class MinMaxStack<T> implements IStack<T>, Min<T>, Max<T> {
  private readonly _maxStack: IStack<{ value: T }>

  private readonly _minStack: IStack<{ value: T }>

  private readonly _storage: { value: T }[]

  public constructor() {
    this._storage = []
    this._minStack = new Stack<{ value: T }>()
    this._maxStack = new Stack<{ value: T }>()
  }

  /*
   * Returns the `max` in the stack without removing it
   * @return {undefined | T} the maximum value in the stack
   */
  public max(): T | undefined {
    return this._maxStack.peek()?.value
  }

  /*
   * Returns the min in the stack without removing it
   * @return {undefined | T} the minimum value in the stack
   */
  public min(): undefined | T {
    return this._minStack.peek()?.value
  }

  /*
   * Returns the value at the end of the stack without removing it
   * @return {undefined | T} the last and newest value in the stack
   */
  public peek(): undefined | T {
    if (!this.isEmpty()) {
      const item = this._storage[this._storage.length - 1]
      return item.value
    }
    return undefined
  }

  /*
   * Removes the value at the end of the stack and returns it
   * @return {undefined | T} the last and newest value in the stack
   */
  public pop(): undefined | T {
    if (!this.isEmpty()) {
      const minFrame = this._minStack.peek()
      const maxFrame = this._maxStack.peek()
      const frame = this._storage.pop()
      if (minFrame === frame) {
        this._minStack.pop()
      }
      if (maxFrame === frame) {
        this._maxStack.pop()
      }
      return frame?.value
    }
    return undefined
  }

  /*
   * Adds a new value at the end of the stack
   * @param {T} value - the value to push
   */
  public push(value: T): void {
    const frame = { value }
    const min = this._minStack.peek()
    const max = this._maxStack.peek()

    if (this._storage.length === 0) {
      // We are setting the head!
      this._minStack.push(frame)
      this._maxStack.push(frame)
    }

    // We need to check if the current frame is smaller than the one on the min stack
    if (min && value < min.value) {
      this._minStack.push(frame)
    }

    if (max && value > max.value) {
      this._maxStack.push(frame)
    }

    /*
     * FIXME: max and min checks are performed on non inclusive values;
     * this can lead to set a frame in a previous operation on one of the accessory stacks and then
     * not be able to clear on this operation coz of a different reference of the obj.
     */

    this._storage.push(frame)
  }

  /*
   * Returns if the stack is empty or not
   * @return {boolean} - whether or not the stack is empty
   */
  private isEmpty(): boolean {
    return this._storage.length === 0
  }
}

// Examples:
export const main = (): void => {
  const testMinStack = new MinMaxStack<number>()

  testMinStack.push(10)

  assert.strictEqual(testMinStack.min(), 10)
  assert.strictEqual(testMinStack.max(), 10)

  testMinStack.push(9)
  assert.strictEqual(testMinStack.min(), 9)
  assert.strictEqual(testMinStack.max(), 10)

  testMinStack.push(11)
  assert.strictEqual(testMinStack.min(), 9)
  assert.strictEqual(testMinStack.max(), 11)

  testMinStack['_storage'] //?
  testMinStack['_minStack'] //?
  testMinStack['_maxStack'] //?

  assert.strictEqual(testMinStack.pop(), 11)
  assert.strictEqual(testMinStack.min(), 9)
  assert.strictEqual(testMinStack.max(), 10)

  assert.strictEqual(testMinStack.pop(), 9)
  assert.strictEqual(testMinStack.min(), 10)
  assert.strictEqual(testMinStack.max(), 10)

  testMinStack['_storage'] //?
  testMinStack['_minStack'] //?
  testMinStack['_maxStack'] //?

  testMinStack.push(8)
  assert.strictEqual(testMinStack.min(), 8)
  assert.strictEqual(testMinStack.max(), 10)

  testMinStack['_storage'] //?
  testMinStack['_minStack'] //?
  testMinStack['_maxStack'] //?

  assert.strictEqual(testMinStack.pop(), 8)
  assert.strictEqual(testMinStack.pop(), 10)
  assert.strictEqual(testMinStack.pop(), undefined)

  testMinStack['_storage'] //?
  testMinStack['_minStack'] //?
  testMinStack['_maxStack'] //?
}
// main()
