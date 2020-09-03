/**
 * @export
 * @interface IStack
 * @template T
 */
export interface IStack<T> {
  /**
   * Reset the Stack
   * @memberof IStack
   */
  clear(): void

  /**
   * Returns if the stack is empty or not
   * @returns {boolean} - whether or not the stack is empty
   * @memberof IStack
   */
  isEmpty(): boolean

  /**
   * Returns the most Head of the stack without removing it
   * @returns {(undefined | T)}
   * @memberof IStack
   */
  peek(): undefined | T

  /**
   * Removes and returns the most recently added member to the collection
   * @returns {(undefined | T)}
   * @memberof IStack
   */
  pop(): undefined | T

  /**
   * Adds a member to the collection
   * @param {T} x - value to add to the Stack
   * @memberof IStack
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
