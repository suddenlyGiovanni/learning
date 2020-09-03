/* eslint-disable max-statements, max-lines-per-function, no-undef, no-console*/

/**
 * Queues:
 * queue is a collection in which the entities in the collection are kept in order and the
 * principal (or only) operations on the collection are the addition of entities to the rear
 * terminal position, known as `enqueue`, and removal of entities from the front terminal position,
 * known as `dequeue`
 * This makes the queue a First-In-First-Out (FIFO) data structure
 * In a FIFO data structure, the first element added to the queue will be the first one to be
 * removed
 */

interface Queue<T> {
  readonly dequeue: () => T | undefined
  readonly enqueue: (item: T) => void
  readonly isEmpty: () => boolean
  readonly length: number
  readonly peek: () => T
}

// eslint-disable-next-line func-style
export function createQueue<T>(): Queue<T> {
  const queue: T[] = []
  /*
   *[
   *  (enqueue)
   *  0: d (back)
   *  1: c
   *  2: b
   *  3: a (front)
   *  (dequeue)
   *]
   */
  return {
    /**
     * Add or enqueue items to the `back of the queue` === `to the head of the array`
     */
    enqueue(item) {
      queue.unshift(item)
    },

    /**
     * Remove or dequeue `the item in front of the queue` === `the last element of the array`
     * and returns it
     *
     */
    dequeue() {
      return queue.pop()
    },

    /**
     * Peek returns the value of the top ("front") of the collection without removing the element
     * from the collection. It thus returns the same value as operations such as "pop" or "dequeue",
     * but does not modify the data.
     */
    peek() {
      const nextIdx = queue.length - 1
      return queue[nextIdx]
    },

    /**
     * Returns the length of the queue
     */
    get length() {
      return queue.length
    },

    /**
     * Returns a boolean indicating if the queue is empty.
     */
    isEmpty() {
      return queue.length === 0
    },
  }
}

export const main = (): void => {
  const q = createQueue()
  console.log(q.isEmpty()) // `true`

  q.enqueue('Make an egghead')
  q.enqueue('Help others to learn')
  q.enqueue('Be happy')
  console.log(q.peek()) // `Make an egghead`

  q.dequeue()
  console.log(q.peek()) // Help others to learn`

  q.dequeue()
  console.log(q.peek()) // `Be happy`

  q.dequeue()
  console.log(q.isEmpty()) // `true`

  console.log(q.length) // `0`
}
// main()
