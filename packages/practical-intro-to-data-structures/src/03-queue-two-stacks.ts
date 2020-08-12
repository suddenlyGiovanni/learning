/* eslint-disable max-statements, no-plusplus */
/*
 * We are given a stack data structure with push and pop operations, the task is to implement
 * a queue using instances of stack data structure and operations on them.
 * Remember the interface of a stack & queue:
 * https://www.geeksforgeeks.org/wp-content/uploads/Stack-Queue.png
 */

import type { Queue } from './queue'
import { Stack, StackClass } from './stack'

export class QueueClass<T> implements Queue<T> {
  private activeStack: 'stackA' | 'stackB'

  private inactiveStack: 'stackA' | 'stackB'

  private length: number

  private readonly storage: {
    stackA: Stack<T>
    stackB: Stack<T>
  }

  public constructor() {
    this.storage = {
      stackA: new StackClass<T>(),
      stackB: new StackClass<T>(),
    }
    this.activeStack = 'stackA'
    this.inactiveStack = 'stackB'
    this.length = 0
  }

  public dequeue(): T | undefined {
    const value = this.storage[this.activeStack].pop()

    this.length--
    return value
  }

  public enqueue(x: T): void {
    const active = this.activeStack
    const inactive = this.inactiveStack
    if (this.length === 0) {
      // We are setting the head of the stack!
      this.storage[active].push(x)
      this.length++
      return undefined
    }

    if (this.length === 1) {
      this.storage[inactive].push(x)
      // Do empty the active storage in the inactive one and then apply the enqueue value
      while (this.storage[active].peek() !== undefined) {
        this.storage[inactive].push(this.storage[active].pop()!)
      }
      this.length++
      this.switchActiveInactive()
      return undefined
    }

    // These are all subsequent cases
    /*
     * If the active storage contains 2 or less elements, then we need to
     * move all the element to the empty stack
     */

    while (this.storage[active].peek() !== undefined) {
      this.storage[inactive].push(this.storage[active].pop()!)
    }
    /* Add the enqueue element at the end  of the stack: the order will now be last to first */
    this.storage[inactive].push(x)

    /*
     * And now we need to reverse the order of the stack.
     * to do so we just push all the elements the the other empty stack, and hence the elements
     * will be sorted from first to lasts
     */

    while (this.storage[inactive].peek() !== undefined) {
      this.storage[active].push(this.storage[inactive].pop()!)
    }
    this.length++
    return undefined
  }

  public peek(): T | undefined {
    return this.activeStack === 'stackA'
      ? this.storage.stackA.peek()
      : this.storage.stackB.peek()
  }

  public toString(): string {
    return JSON.stringify(this, null, 2)
  }

  private switchActiveInactive() {
    const temp = this.activeStack
    this.activeStack = this.inactiveStack
    this.inactiveStack = temp
  }
}

/*
 * Examples
 * const testQueue = new QueueClass<string>()
 * testQueue.enqueue('first')
 * testQueue.enqueue('second')
 * testQueue.enqueue('third')
 * testQueue.enqueue('forth')
 * testQueue.enqueue('fifth')
 * testQueue.enqueue('sixth')
 * testQueue.peek() //?
 * testQueue.dequeue() //?
 * testQueue.dequeue() //?
 * testQueue.dequeue() //?
 * testQueue.enqueue('seventh')
 * console.log(testQueue.toString()) //?
 */
