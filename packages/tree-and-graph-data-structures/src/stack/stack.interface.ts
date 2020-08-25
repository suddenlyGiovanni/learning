/**
 * @export
 * @interface IStack
 * @template T
 */
export interface IStack<T> {
  /**
   * Reset the Stack to
   * @memberof IStack
   */
  clear(): void

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

  /**
   * Returns the size of the Stack
   * @returns {number}
   * @memberof IStack
   */
  size(): number

  /**
   * Serialize the content of the stack and returns it
   * @returns {string}
   * @memberof IStack
   */
  toString(): string
}
