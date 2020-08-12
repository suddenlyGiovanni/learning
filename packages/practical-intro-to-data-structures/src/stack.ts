/* eslint-disable no-undefined, no-underscore-dangle, @typescript-eslint/ban-ts-comment, no-plusplus */

export interface Stack<T> {
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
export class StackClass<T> implements Stack<T> {
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



type feedStack = <T>(stack: Stack<T>) => (elements: T[]) => Stack<T>
export const feedStack: feedStack = (stack) => (elements) =>
  elements.reduce((_stack, element) => {
    _stack.push(element)
    return _stack
  }, stack)

/*
 * Examples
 * const testStack = new StackClass<string>()
 * testStack.peek() // undefined
 * testStack.push('first')
 * testStack.peek() // 'first'
 * testStack.toString() // '{ length: 1, stack: { 0: "first" } }'
 * testStack.push('second')
 * testStack.peek() // 'second
 * testStack.toString() // '{ length: 3, stack: { 0: "first", 1: "second", 2: "third" } }'
 * testStack.push('third')
 * testStack.toString() // '{ "length": 3, "stack": { "0": "first", "1": "second", "2": "third" } }'
 * testStack.peek() // 'third
 * testStack.pop() // 'third
 * testStack.toString() // '{ "length": 2, "stack": { "0": "first", "1": "second" } }'
 */
