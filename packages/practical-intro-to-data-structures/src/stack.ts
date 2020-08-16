/* eslint-disable no-undefined, no-underscore-dangle, @typescript-eslint/ban-ts-comment, no-plusplus, max-statements, max-lines-per-function */

import assert from 'assert'

export interface IStack<T> {
  /**
   * Returns if the stack is empty or not
   * @return {boolean} - whether or not the stack is empty
   */
  isEmpty(): boolean

  /**
   * Returns the most Head of the stack without removing it
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  peek(): undefined | T

  /**
   * Removes and returns the most recently added member to the collection
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  pop(): undefined | T

  /**
   * Adds a member to the collection
   * @throws `stack overflow` if the stack has grown over the bounded size
   * @param {T} x - value to add to the Stack
   */
  push(x: T): void
}

/** Class representing a Stack. */
export class Stack<T> implements IStack<T> {
  private _length: number

  private readonly _stack: Record<number, T>

  public constructor() {
    this._stack = {}
    this._length = 0
  }

  /**
   * Returns if the stack is empty or not
   * @return {boolean} - whether or not the stack is empty
   */
  public isEmpty(): boolean {
    return this._length === 0
  }

  /**
   * Returns the most Head of the stack without removing it
   */
  public peek(): undefined | T {
    if (this._length > 0) {
      const lastIdx = this._length - 1
      return this._stack[lastIdx]
    }
    return undefined
  }

  /**
   * Removes and returns the most recently added member to the collection
   */
  public pop(): undefined | T {
    if (this._length > 0) {
      const lastIdx = this._length - 1
      const last = this._stack[lastIdx]
      delete this._stack[lastIdx]
      this.decrementLength()
      return last
    }
    return undefined
  }

  /**
   * Adds a member to the collection
   */
  public push(value: T): void {
    this._stack[this._length] = value
    this.incrementLength()
  }

  public toString(): string {
    return JSON.stringify(this, null, 2)
  }

  private decrementLength(): void {
    this._length--
  }

  private incrementLength(): void {
    this._length++
  }
}

type feedStack = <T>(stack: IStack<T>) => (elements: T[]) => IStack<T>
export const feedStack: feedStack = (stack) => (elements) =>
  elements.reduce((_stack, element) => {
    _stack.push(element)
    return _stack
  }, stack)

// Examples
export const main = (): void => {
  const testStack = new Stack<string>()

  assert.strictEqual(testStack.peek(), undefined)

  testStack.push('first')
  assert.strictEqual(testStack.peek(), 'first')
  assert.deepStrictEqual(
    testStack.toString(),
    JSON.stringify({ _stack: { 0: 'first' }, _length: 1 }, null, 2)
  )

  testStack.push('second')
  assert.strictEqual(testStack.peek(), 'second')
  assert.deepStrictEqual(
    testStack.toString(),
    JSON.stringify(
      {
        _stack: {
          '0': 'first',
          '1': 'second',
        },
        _length: 2,
      },
      null,
      2
    )
  )

  testStack.push('third')
  assert.strictEqual(
    testStack.toString(),
    JSON.stringify(
      {
        _stack: {
          '0': 'first',
          '1': 'second',
          '2': 'third',
        },
        _length: 3,
      },
      null,
      2
    )
  )

  assert.strictEqual(testStack.peek(), 'third')
  assert.strictEqual(testStack.pop(), 'third')
  assert.strictEqual(
    testStack.toString(),
    JSON.stringify(
      { _stack: { '0': 'first', '1': 'second' }, _length: 2 },
      null,
      2
    )
  )
}
// main()
