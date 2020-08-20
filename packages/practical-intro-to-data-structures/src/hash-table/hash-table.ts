/*
  eslint-disable
  class-methods-use-this,
  max-lines-per-function,
  max-lines,
  max-statements,
  no-underscore-dangle,
*/

import assert from 'assert'

import type { IHashTable } from './hash-table.interface'

export type Tuple2<Key, Value> = [Key, Value]

type Storage<T> = Array<null | Tuple2<string, T> | Array<Tuple2<string, T>>>

/** Class representing a Hash Table */
export class HashTable<T> implements IHashTable<T> {
  private readonly UPPER_BOUNDARY = 50

  private _inputSize: number

  /**
   * @example
   *  const _storage = [
   *     [key, value],
   *     null,
   *     [
   *       [key, value],
   *       [key, value]
   *     ]
   *   ]
   *
   */
  private _storage: Storage<T>

  private _tableSize: number

  public constructor() {
    this._tableSize = 10
    this._storage = Array(this._tableSize).fill(null) as null[]
    this._inputSize = 0
  }

  /**
   * Inserts a new key-value pair
   */
  public insert(key: string, value: T): void {
    // Check if the saturation of the storage
    this.checkLoadFactor()

    const tuple = this.makeTuple2(key, value)
    this._insert({
      size: this._tableSize,
      storage: this._storage,
      tuple,
    })
    this._inputSize += 1
  }

  /**
   * Given an existing `key`, it deletes a key-value pair and return the deleted value
   * else returns `undefined`
   */
  public remove(key: string): undefined | T {
    const index = this._hash(key, this._tableSize)
    const row = this._storage[index]
    if (row) {
      // Row can be a Tuple2<string, T> | Array<Tuple2<string, T>>
      if (this.isArrayOfTuples(row)) {
        /*
         * Row is Array<Tuple2<string, T>>
         * how many collisions were stored in this sub array?
         */
        const { length } = row

        const tupleIdx = row.findIndex(([_key]) => key === _key)
        /*
         * If the sub array is larger than 2 elements we can conserve the arry and just remove the
         * one element that we need
         */
        if (length > 2) {
          const [tuple] = row.splice(tupleIdx, 1)
          this._inputSize -= 1
          const [, value] = tuple
          return value
        }
        // We need to pluck the tuple from the array and then fold it to a single dimension
        const [tuple] = row.splice(tupleIdx, 1)
        const [, value] = tuple
        const rowReset = row.flat(1) as Tuple2<string, T>
        this._storage[index] = rowReset
        this._inputSize -= 1
        return value
      }
      // Row is Tuple2<string, T>
      const [, value] = row
      // Now we need to remove the tuple
      this._storage[index] = null
      this._inputSize -= 1
      return value
    }
    return undefined

    /*
     * TODO: check if the load factor fall under the predefined LOWER_BOUNDARY threshold!
     * TODO: if so shrink the size of the HashTable!
     */
  }

  /*
   * Given an existing `key`, it returns the associated `value`
   * otherwise returns `undefined`
   */
  public retrieve(key: string): undefined | T {
    const index = this._hash(key, this._tableSize)

    const row = this._storage[index]
    if (row) {
      // Row can be a Tuple2<string, T> | Array<Tuple2<string, T>>
      if (this.isArrayOfTuples(row)) {
        // Row is Array<Tuple2<string, T>>
        const tuple = row.find(([_key]) => key === _key)
        const [, value] = tuple!
        return value
      }
      // Row is Tuple2<string, T>
      const [, value] = row
      return value
    }
    return undefined
  }

  /** For debugging purpose */
  public toString(): string {
    return JSON.stringify(this, null, 2)
  }

  /**
   * Hashes string value into an integer that can be mapped to an array index
   * @param {string} str - the string to be hashed
   * @param {number} n - the size of the storage array
   * @return {number} - an integer between 0 and n
   */
  private _hash(str: string, n: number): number {
    const sum = [...str].reduce((acc, char) => {
      const charCode = char.charCodeAt(0) * 3
      return acc + charCode
    }, 0)
    return sum % n
  }

  private _insert({
    tuple,
    storage,
    size,
  }: {
    size: number
    storage: Storage<T>
    tuple: Tuple2<string, T>
  }): void {
    // Pass the key thought the hashing fn to get an indexs
    const [key] = tuple
    const index = this._hash(key, size)
    const row = storage[index]
    // Check if the index is already been used.
    // eslint-disable-next-line no-negated-condition
    if (row) {
      /*
       * We have an index collision
       * now, we could have stumbled upon:
       * 1 - a simple tuple: [key, value]. this is (one dimensional)
       * 2 - an array of tuples: [[key, value], [key, value], ....]
       */
      if (this.isArrayOfTuples(row)) {
        /*
         * We are in the second case
         * push the tuple to the end of the array. Done
         */
        storage[index] = [...row, tuple]
      } else {
        /*
         * We are in the first case
         * copy the value at that position
         * Create a new empty array, add the copied value, add the new tuple
         */
        storage[index] = [row, tuple]
      }
    } else {
      storage[index] = tuple
    }
  }

  private checkLoadFactor(): void {
    if (this.loadFactor() >= this.UPPER_BOUNDARY) {
      // If we get to the UPPER_BOUNDARY then we need to resize the array and re-hash all the entries
      this.resizeStorage()
    }
  }

  private isArrayOfTuples(
    row: Tuple2<string, T> | Tuple2<string, T>[]
  ): row is Tuple2<string, T>[] {
    return Array.isArray(row[0])
  }

  /**
   * Calculates the load factor of the hash table
   * @returns {number} saturation in percentage
   */
  private loadFactor(): number {
    return Math.floor((this._inputSize / this._tableSize) * 100)
  }

  private makeTuple2(key: string, value: T): Tuple2<string, T> {
    return [key, value]
  }

  private resizeStorage(): void {
    const doubleSize = this._tableSize * 2
    const _newStorage = Array(doubleSize).fill(null) as Storage<T>

    this._storage.forEach((row) => {
      if (row !== null) {
        // Row can be a Tuple2<string, T> | Array<Tuple2<string, T>>
        if (this.isArrayOfTuples(row)) {
          // Row is Array<Tuple2<string, T>>
          row.forEach((tuple) => {
            this._insert({
              size: doubleSize,
              storage: _newStorage,
              tuple,
            })
          })
        } else {
          // Row is Tuple2<string, T>
          this._insert({
            size: doubleSize,
            storage: _newStorage,
            tuple: row,
          })
        }
      }
    })

    // Replace the old storage with the new one
    this._storage = _newStorage
    this._tableSize = doubleSize
  }
}

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
// main()
