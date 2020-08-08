/* eslint-disable @typescript-eslint/ban-ts-comment */
export interface StackInterface<T> {
  /**
   * Adds a member to the collection
   * @throws `stack overflow` if the stack has grown over the bounded size
   * @param {T} x
   */
  push(x: T): void

  /**
   * Removes and returns the most recently added member to the collection
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  pop(): T

  /**
   * Returns the most Head of the stack without removing it
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  peek(): T
}

/** Class representing a Stack. */
export class Stack<T> implements StackInterface<T> {
  private readonly stack: T[]

  private get size(): number {
    return this.stack.length
  }

  public constructor() {
    this.stack = []
  }

  public push(x: T): void {
    this.stack.push(x)
  }

  public pop(): T {
    if (this.size > 0) {
      return this.stack.pop() as T
    }
    throw new Error('stack underflow')
  }

  public peek(): T {
    if (this.size > 0) {
      return this.stack[this.size - 1]
    }
    throw new Error('stack underflow')
  }
}

// Examples

const testStack = new Stack<number>()
try {
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
} catch (error) {
  console.log(error) // [Error: stack underflow]
}
