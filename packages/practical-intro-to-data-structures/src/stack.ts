/* eslint-disable no-undefined, no-underscore-dangle, @typescript-eslint/ban-ts-comment */
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
  private readonly _stack: T[]

  private get size(): number {
    return this._stack.length
  }

  public constructor() {
    this._stack = []
  }

  public push(x: T): void {
    this._stack.push(x)
  }

  public pop(): undefined | T {
    if (this.size > 0) {
      return this._stack.pop() as T
    }
    return undefined
  }

  public peek(): undefined | T {
    if (this.size > 0) {
      return this._stack[this.size - 1]
    }
    return undefined
  }
}

// Examples

const testStack = new Stack<number>()

testStack.push(1)
testStack.push(2)
testStack.push(3)
testStack.peek() // => 3
testStack.pop() // => 3
testStack.peek() // => 2
testStack.pop() // => 2s
testStack.pop() // => 1
testStack.peek() // => Error('stack underflow')
testStack.pop() // => Error('stack underflow')
