/* eslint-disable no-inline-comments */
/* eslint-disable no-undefined, no-underscore-dangle, @typescript-eslint/ban-ts-comment, no-plusplus */

export interface StackInterface<T> {
  /**
   * Adds a member to the collection
   * @throws `stack overflow` if the stack has grown over the bounded size
   * @param {T} x - value to add to the Stack
   */
  push(x: T): void

  /**
   * Removes and returns the most recently added member to the collection
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  pop(): undefined | T

  /**
   * Returns the most Head of the stack without removing it
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  peek(): undefined | T
}

/** Class representing a Stack. */
export class Stack<T> implements StackInterface<T> {
  private readonly _stack: Record<number, T>

  private _length: number

  public constructor() {
    this._stack = {}
    this._length = 0
  }

  private incrementLength(): void {
    this._length++
  }

  private decrementLength(): void {
    this._length--
  }

  /**
   * Adds a member to the collection
   */
  public push(value: T): void {
    this._stack[this._length] = value
    this.incrementLength()
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
   * Returns the most Head of the stack without removing it
   */
  public peek(): undefined | T {
    if (this._length > 0) {
      const lastIdx = this._length - 1
      return this._stack[lastIdx]
    }
    return undefined
  }

  public toString(): string {
    return JSON.stringify({ length: this._length, stack: this._stack }, null, 2)
  }
}

// Examples

const testStack = new Stack<string>()
testStack.peek() // undefined

testStack.push('first')
testStack.peek() // 'first'
testStack.toString() // '{ length: 1, stack: { 0: "first" } }'

testStack.push('second')
testStack.peek() // 'second
testStack.toString() // '{ length: 3, stack: { 0: "first", 1: "second", 2: "third" } }'

testStack.push('third')
testStack.toString() // '{ "length": 3, "stack": { "0": "first", "1": "second", "2": "third" } }'
testStack.peek() // 'third
testStack.pop() // 'third
testStack.toString() // '{ "length": 2, "stack": { "0": "first", "1": "second" } }'
