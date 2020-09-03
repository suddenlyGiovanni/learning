import type { IQueue } from './queue.interface'
/**
 * Priority queue:
 * a priority queue is an abstract data type which is like a regular queue but where additionally
 * each element has a "priority" associated with it.
 * In a priority queue, an element with high priority is served before an element with low priority.
 * A priority queue must at least support the following operations:
 * - `is_empty`: check whether the queue has no elements.
 * - `insert_with_priority`: add an element to the queue with an associated priority.
 * - `pull_highest_priority_element`: remove the element from the queue that has the highest
 *    priority, and return it
 */
export interface IPriorityQueue<T> extends IQueue<T> {
  enqueue: (item: T, isHeighPriority?: boolean) => void
}
