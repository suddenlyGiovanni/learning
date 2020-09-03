/* eslint-disable max-lines-per-function, max-statements */

import assert from 'assert'

import { Stack } from './stack-old'

// Examples

export const main = (): void => {
  const testStack = new Stack<string>()

  assert.strictEqual(testStack.peek(), undefined)

  testStack.push('first')
  assert.strictEqual(testStack.peek(), 'first')
  assert.deepStrictEqual(
    testStack.toString(),
    JSON.stringify({ _stack: { 0: 'first' }, _length: 1 }, null, 2)
  )

  testStack.push('second')
  assert.strictEqual(testStack.peek(), 'second')
  assert.deepStrictEqual(
    testStack.toString(),
    JSON.stringify(
      {
        _stack: {
          '0': 'first',
          '1': 'second',
        },
        _length: 2,
      },
      null,
      2
    )
  )

  testStack.push('third')
  assert.strictEqual(
    testStack.toString(),
    JSON.stringify(
      {
        _stack: {
          '0': 'first',
          '1': 'second',
          '2': 'third',
        },
        _length: 3,
      },
      null,
      2
    )
  )

  assert.strictEqual(testStack.peek(), 'third')
  assert.strictEqual(testStack.pop(), 'third')
  assert.strictEqual(
    testStack.toString(),
    JSON.stringify(
      { _stack: { '0': 'first', '1': 'second' }, _length: 2 },
      null,
      2
    )
  )
}
