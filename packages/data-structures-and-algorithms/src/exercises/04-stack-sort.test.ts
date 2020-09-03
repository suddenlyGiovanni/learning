import assert from 'assert'

import { Stack, feedStack } from '../stack/stack-old'

import { sortStack } from './04-stack-sort'

// Tests:

export const main = (): void => {
  const unsortedStack = feedStack(new Stack<number>())([34, 3, 31, 98, 92, 23])

  const sortedSack = sortStack(unsortedStack)
  assert.deepEqual(sortedSack, {
    _length: 6,
    _stack: { '0': 98, '1': 92, '2': 34, '3': 31, '4': 23, '5': 3 },
  })
}
