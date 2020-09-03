/* eslint-disable max-statements, max-lines-per-function */

import assert from 'assert'

import { Queue } from './queue-old'

// Example


export const main = (): void => {
  const testQueue = new Queue<string>()
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {},
        _headIndex: null,
        _length: 0,
      },
      null,
      2
    )
  )

  testQueue.enqueue('zero')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '0': 'zero',
        },
        _headIndex: 0,
        _length: 1,
      },
      null,
      2
    )
  )

  testQueue.enqueue('one')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '0': 'zero',
          '1': 'one',
        },
        _headIndex: 0,
        _length: 2,
      },
      null,
      2
    )
  )

  testQueue.enqueue('two')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '0': 'zero',
          '1': 'one',
          '2': 'two',
        },
        _headIndex: 0,
        _length: 3,
      },
      null,
      2
    )
  )

  assert.strictEqual(testQueue.peek(), 'zero')
  assert.strictEqual(testQueue.dequeue(), 'zero')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '1': 'one',
          '2': 'two',
        },
        _headIndex: 1,
        _length: 2,
      },
      null,
      2
    )
  )

  assert.strictEqual(testQueue.peek(), 'one')
  assert.strictEqual(testQueue.dequeue(), 'one')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '2': 'two',
        },
        _headIndex: 2,
        _length: 1,
      },
      null,
      2
    )
  )

  assert.strictEqual(testQueue.peek(), 'two')
  assert.strictEqual(testQueue.dequeue(), 'two')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {},
        _headIndex: null,
        _length: 0,
      },
      null,
      2
    )
  )

  testQueue.enqueue('three')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '0': 'three',
        },
        _headIndex: 0,
        _length: 1,
      },
      null,
      2
    )
  )

  testQueue.enqueue('four')
  assert.strictEqual(
    testQueue.toString(),
    JSON.stringify(
      {
        _queue: {
          '0': 'three',
          '1': 'four',
        },
        _headIndex: 0,
        _length: 2,
      },
      null,
      2
    )
  )
}
