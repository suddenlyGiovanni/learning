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
   * Reset the Queue
   * @memberof IQueue
   */
  clear(): void

  /**
   * Removes and returns the most recently added member to the collection
   * @returns {(T | undefined)}
   * @memberof IQueue
   */
  dequeue(): T | undefined

  /**
   * Adds a member to the collection
   * @param {T} x
   * @memberof IQueue
   */
  enqueue(x: T): void

  /**
   * Returns a boolean encoding the if the queue is empty
   * @returns {boolean}
   * @memberof IQueue
   */
  isEmpty(): boolean

  /**
   * Returns the most Head of the Queue without removing it
   * @returns {(T | undefined)}
   * @memberof IQueue
   */
  peek(): T | undefined

  /**
   * Returns the size of the Queue
   * @returns {number}
   * @memberof IQueue
   */
  size(): number

  /**
   * Serialize the content of the Queue and returns it
   * @returns {string}
   * @memberof IQueue
   */
  toString(): string
}
