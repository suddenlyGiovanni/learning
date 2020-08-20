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
 * @export
 * @interface IQueue
 * @template T
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
   * @returns {boolean}
   * @memberof IQueue
   */
  isEmpty(): boolean

  /**
   * Returns the most Head of the stack without removing it
   * @throws `stack underflow` if the stack is empty
   * @returns {T}
   */
  peek(): T | undefined


}
