/* eslint-disable max-statements */

import nodeAssert from 'assert'

import { KStack } from './01-stack-kstacks-with-one-array'

// Tests:

export const main = (): void => {
  const testKStack = new KStack<string>(3) // KStackClass { k: 3, storage: [] }
  testKStack.push('s1&v="one"', 1)
  testKStack.push('s3&v="two"', 3)
  testKStack.push('s3&v="three"', 3)
  testKStack.push('s2&v="four"', 2)
  testKStack.push('s3&v="five"', 3)
  nodeAssert.strictEqual(testKStack.peek(3), 's3&v="five"')
  nodeAssert.strictEqual(testKStack.pop(3), 's3&v="five"')
  nodeAssert.strictEqual(testKStack.pop(3), 's3&v="three"')
  nodeAssert.strictEqual(testKStack.pop(3), 's3&v="two"')
  nodeAssert.strictEqual(testKStack.pop(3), undefined)
  nodeAssert.strictEqual(testKStack.peek(3), undefined)
  nodeAssert.strictEqual(testKStack.peek(1), 's1&v="one"')
  nodeAssert.strictEqual(testKStack.peek(2), 's2&v="four"')
}
