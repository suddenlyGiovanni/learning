/* eslint-disable max-statements */

import assert from 'assert'

import { QueueClass } from './03-stack-a-queue-with-two-stacks'

// Examples

export const main = (): void => {
  const testQueue = new QueueClass<string>()
  testQueue.enqueue('first')
  testQueue.enqueue('second')
  testQueue.enqueue('third')
  testQueue.enqueue('forth')
  testQueue.enqueue('fifth')
  testQueue.enqueue('sixth')
  assert.strictEqual(testQueue.peek(), 'first')
  assert.strictEqual(testQueue.dequeue(), 'first')
  assert.strictEqual(testQueue.dequeue(), 'second')
  assert.strictEqual(testQueue.dequeue(), 'third')
  testQueue.enqueue('seventh')
  console.log(testQueue.toString()) // ?
}
