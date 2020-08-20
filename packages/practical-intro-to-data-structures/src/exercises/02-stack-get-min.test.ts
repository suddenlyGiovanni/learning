/* eslint-disable max-statements */

import assert from 'assert'

import MinMaxStack from './02-stack-get-min'

// Examples:

export const main = (): void => {
  const testMinStack = new MinMaxStack<number>()

  testMinStack.push(10)

  assert.strictEqual(testMinStack.min(), 10)
  assert.strictEqual(testMinStack.max(), 10)

  testMinStack.push(9)
  assert.strictEqual(testMinStack.min(), 9)
  assert.strictEqual(testMinStack.max(), 10)

  testMinStack.push(11)
  assert.strictEqual(testMinStack.min(), 9)
  assert.strictEqual(testMinStack.max(), 11)

  testMinStack._storage // ?
  testMinStack._minStack // ?
  testMinStack._maxStack // ?

  assert.strictEqual(testMinStack.pop(), 11)
  assert.strictEqual(testMinStack.min(), 9)
  assert.strictEqual(testMinStack.max(), 10)

  assert.strictEqual(testMinStack.pop(), 9)
  assert.strictEqual(testMinStack.min(), 10)
  assert.strictEqual(testMinStack.max(), 10)

  testMinStack._storage // ?
  testMinStack._minStack // ?
  testMinStack._maxStack // ?

  testMinStack.push(8)
  assert.strictEqual(testMinStack.min(), 8)
  assert.strictEqual(testMinStack.max(), 10)

  testMinStack._storage // ?
  testMinStack._minStack // ?
  testMinStack._maxStack // ?

  assert.strictEqual(testMinStack.pop(), 8)
  assert.strictEqual(testMinStack.pop(), 10)
  assert.strictEqual(testMinStack.pop(), undefined)

  testMinStack._storage // ?
  testMinStack._minStack // ?
  testMinStack._maxStack // ?
}
