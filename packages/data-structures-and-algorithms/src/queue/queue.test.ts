/*
  eslint-disable
  jest/prefer-expect-assertions,
  jest/no-hooks,
  init-declarations,
  max-lines-per-function,
  max-statements,
*/

import type { IQueue } from '../interfaces/queue.interface'

import { Queue } from './queue'

class MyObj<T> {
  // eslint-disable-next-line no-useless-constructor
  public constructor(
    public el1: T & { toString(): string },
    public el2: T & { toString(): string }
  ) {}

  public toString() {
    return `${this.el1.toString()}|${this.el2.toString()}`
  }
}

describe('queue', () => {
  let queue: IQueue<number>

  beforeEach(() => {
    queue = new Queue<number>()
  })

  it('starts empty', () => {
    expect(queue.size()).toBe(0)
    expect(queue.isEmpty()).toBe(true)
  })

  it('enqueues elements', () => {
    queue.enqueue(1)
    expect(queue.size()).toBe(1)
    queue.enqueue(2)
    expect(queue.size()).toBe(2)
    queue.enqueue(3)
    expect(queue.size()).toBe(3)

    expect(queue.isEmpty()).toBe(false)
  })

  it('dequeue elements', () => {
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)

    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBeUndefined()
  })

  it('implements FIFO logic', () => {
    queue.enqueue(1)
    expect(queue.peek()).toBe(1)
    queue.enqueue(2)
    expect(queue.peek()).toBe(1)
    queue.enqueue(3)
    expect(queue.peek()).toBe(1)

    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBeUndefined()
  })

  it('allows to peek at the front element in the queue without dequeuing it', () => {
    expect(queue.peek()).toBeUndefined()

    queue.enqueue(1)
    expect(queue.peek()).toBe(1)

    queue.enqueue(2)
    expect(queue.peek()).toBe(1)

    queue.dequeue()
    expect(queue.peek()).toBe(2)
  })

  it('returns the correct size', () => {
    expect(queue.size()).toBe(0)
    queue.enqueue(1)
    expect(queue.size()).toBe(1)
    queue.enqueue(2)
    expect(queue.size()).toBe(2)
    queue.enqueue(3)
    expect(queue.size()).toBe(3)

    queue.clear()
    expect(queue.isEmpty()).toBe(true)

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.size()).toBe(3)

    queue.dequeue()
    expect(queue.size()).toBe(2)
    queue.dequeue()
    expect(queue.size()).toBe(1)
    queue.dequeue()
    expect(queue.size()).toBe(0)
    queue.dequeue()
    expect(queue.size()).toBe(0)
  })

  it('returns if it is empty', () => {
    expect(queue.isEmpty()).toBe(true)
    queue.enqueue(1)
    expect(queue.isEmpty()).toBe(false)
    queue.enqueue(2)
    expect(queue.isEmpty()).toBe(false)
    queue.enqueue(3)
    expect(queue.isEmpty()).toBe(false)

    queue.clear()
    expect(queue.isEmpty()).toBe(true)

    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.isEmpty()).toBe(false)

    queue.dequeue()
    expect(queue.isEmpty()).toBe(false)
    queue.dequeue()
    expect(queue.isEmpty()).toBe(false)
    queue.dequeue()
    expect(queue.isEmpty()).toBe(true)
    queue.dequeue()
    expect(queue.isEmpty()).toBe(true)
  })

  it('clears the queue', () => {
    queue.clear()
    expect(queue.isEmpty()).toBe(true)

    queue.enqueue(1)
    queue.enqueue(2)
    expect(queue.isEmpty()).toBe(false)

    queue.clear()
    expect(queue.isEmpty()).toBe(true)
  })

  it('returns toString primitive types', () => {
    expect(queue.toString()).toBe('')

    queue.enqueue(1)
    expect(queue.toString()).toBe('1')

    queue.enqueue(2)
    expect(queue.toString()).toBe('1,2')

    queue.clear()
    expect(queue.toString()).toBe('')

    const queueString = new Queue<string>()
    queueString.enqueue('el1')
    expect(queueString.toString()).toBe('el1')

    queueString.enqueue('el2')
    expect(queueString.toString()).toBe('el1,el2')
  })

  it('returns toString objects', () => {
    const queueMyObj = new Queue<MyObj<number>>()
    expect(queueMyObj.toString()).toBe('')

    queueMyObj.enqueue(new MyObj(1, 2))
    expect(queueMyObj.toString()).toBe('1|2')

    queueMyObj.enqueue(new MyObj(3, 4))
    expect(queueMyObj.toString()).toBe('1|2,3|4')
  })
})
