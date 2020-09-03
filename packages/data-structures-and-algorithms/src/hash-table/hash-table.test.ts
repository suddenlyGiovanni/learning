/* eslint-disable max-lines-per-function, max-statements */

import assert from 'assert'

import { HashTable } from './hash-table'

// Examples:

export const main = (): void => {
  const testHashTable = new HashTable<number>()
  testHashTable.insert('one', 1)
  testHashTable.insert('two', 2)
  testHashTable.insert('three', 3)
  testHashTable.insert('three', 3)
  testHashTable.insert('four', 4)
  testHashTable.insert('five', 5)
  testHashTable.insert('six', 6)
  testHashTable.insert('seven', 7)
  testHashTable.insert('eight', 8)
  testHashTable.insert('nine', 9)

  assert.strictEqual(testHashTable.retrieve('six'), 6)

  assert.strictEqual(testHashTable.retrieve('two'), 2)

  assert.strictEqual(testHashTable.retrieve('five'), 5)

  assert.strictEqual(
    testHashTable.toString(),
    JSON.stringify(
      {
        UPPER_BOUNDARY: 50,
        _tableSize: 20,
        _storage: [
          ['six', 6],
          null,
          null,
          null,
          null,
          null,
          ['one', 1],
          ['eight', 8],
          [
            ['three', 3],
            ['three', 3],
          ],
          null,
          null,
          null,
          ['four', 4],
          null,
          null,
          ['seven', 7],
          null,
          null,
          [
            ['two', 2],
            ['five', 5],
            ['nine', 9],
          ],
          null,
        ],
        _inputSize: 10,
      },
      null,
      2
    )
  )

  assert.strictEqual(testHashTable.remove('six'), 6)

  assert.strictEqual(
    testHashTable.toString(),
    JSON.stringify(
      {
        UPPER_BOUNDARY: 50,
        _tableSize: 20,
        _storage: [
          null,
          null,
          null,
          null,
          null,
          null,
          ['one', 1],
          ['eight', 8],
          [
            ['three', 3],
            ['three', 3],
          ],
          null,
          null,
          null,
          ['four', 4],
          null,
          null,
          ['seven', 7],
          null,
          null,
          [
            ['two', 2],
            ['five', 5],
            ['nine', 9],
          ],
          null,
        ],
        _inputSize: 9,
      },
      null,
      2
    )
  )

  assert.strictEqual(testHashTable.remove('two'), 2)

  assert.strictEqual(
    testHashTable.toString(),
    JSON.stringify(
      {
        UPPER_BOUNDARY: 50,
        _tableSize: 20,
        _storage: [
          null,
          null,
          null,
          null,
          null,
          null,
          ['one', 1],
          ['eight', 8],
          [
            ['three', 3],
            ['three', 3],
          ],
          null,
          null,
          null,
          ['four', 4],
          null,
          null,
          ['seven', 7],
          null,
          null,
          [
            ['five', 5],
            ['nine', 9],
          ],
          null,
        ],
        _inputSize: 8,
      },
      null,
      2
    )
  )

  assert.strictEqual(testHashTable.remove('nine'), 9)

  assert.strictEqual(
    testHashTable.toString(),
    JSON.stringify(
      {
        UPPER_BOUNDARY: 50,
        _tableSize: 20,
        _storage: [
          null,
          null,
          null,
          null,
          null,
          null,
          ['one', 1],
          ['eight', 8],
          [
            ['three', 3],
            ['three', 3],
          ],
          null,
          null,
          null,
          ['four', 4],
          null,
          null,
          ['seven', 7],
          null,
          null,
          ['five', 5],
          null,
        ],
        _inputSize: 7,
      },
      null,
      2
    )
  )
}
