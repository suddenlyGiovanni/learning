/* eslint-disable no-warning-comments */
/* eslint-disable max-statements, @typescript-eslint/no-non-null-assertion, no-magic-numbers, no-underscore-dangle, class-methods-use-this, multiline-comment-style */

export interface HashTableClass<T> {
  /**
   * Inserts a new key-value pair
   * @template T
   * @param {string} key - the key associated with the value
   * @param {T} value - the value to insert
   */
  insert(key: string, value: T): void

  /**
   * Deletes a key-value pair
   * @template T
   * @param {string} key - the key associated with the value
   * @return {T} value - the deleted value
   */
  remove(key: string): T

  /**
   * Given an existing `key`, it returns the associated `value`
   * otherwise returns `undefined`
   * @template T
   * @param {string} key - the key to search for
   * @returns {T | undefined} value - the value associated with the key or undefined
   */
  retrieve(key: string): T
}

export type Tuple2<Key, Value> = [Key, Value]

type Storage<T> = Array<null | Tuple2<string, T> | Array<Tuple2<string, T>>>

/** Class representing a Hash Table */
export class HashTableClass<T> implements HashTableClass<T> {
  private readonly UPPER_BOUNDARY = 50

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

  public constructor() {
    this._storage = Array(10) as null[]
  }

  /**
   * Inserts a new key-value pair
   */
  public insert(key: string, value: T): void {
    // Check if the saturation of the storage
    this.checkLoadFactor()

    const tuple = this.makeTuple2(key, value)
    this._insert({ size: this.size, storage: this._storage, tuple })
  }

  /**
   * Given an existing `key`, it deletes a key-value pair and return the deleted value
   * else returns `undefined`
   */
  public remove(key: string): undefined | T {
    const index = this._hash(key, this.size)
    const row = this._storage[index]
    if (row) {
      // Row can be a Tuple2<string, T> | Array<Tuple2<string, T>>
      if (this.isArrayOfTuples(row)) {
        // Row is Array<Tuple2<string, T>>
        // how many collisions were stored in this sub array?
        const { length } = row

        const tupleIdx = row.findIndex(([_key]) => key === _key)
        /*
         * If the sub array is larger than 2 elements we can conserve the arry and just remove the
         * one element that we need
         */
        if (length > 2) {
          const [tuple] = row.splice(tupleIdx, 1)
          const [, value] = tuple
          return value
        }
        // We need to pluck the tuple from the array and then fold it to a single dimension
        const [tuple] = row.splice(tupleIdx, 1)
        const [, value] = tuple
        const rowReset = row.flat(1) as Tuple2<string, T>
        this._storage[index] = rowReset
        return value
      }
      // Row is Tuple2<string, T>
      const [, value] = row
      // Now we need to remove the tuple
      this._storage[index] = null
      return value
    }
    return undefined

    // TODO: check if the load factor fall under the predefined LOWER_BOUNDARY threshold!
    // TODO: if so shrink the size of the HashTable!
  }

  /*
   * Given an existing `key`, it returns the associated `value`
   * otherwise returns `undefined`
   */
  public retrieve(key: string): undefined | T {
    const index = this._hash(key, this.size)

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

  private get size(): number {
    return this._storage.length
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
    tuple: insertTuple,
    storage,
    size,
  }: {
    size: number
    storage: Storage<T>
    tuple: Tuple2<string, T>
  }): void {
    // Pass the key thought the hashing fn to get an indexs
    const [key] = insertTuple
    const index = this._hash(key, size)

    // Check if the index is already been used.
    if (storage[index]) {
      // We have an index collision
      // now, we could have stumbled upon:
      // 1 - a simple tuple: [key, value]. this is (one dimensional)
      // 2 - an array of tuples: [[key, value], [key, value], ....]
      if (Array.isArray(storage[index]![0])) {
        // We are in the second case
        // push the tuple to the end of the array. Done
        storage[index] = [
          ...(storage[index] as Tuple2<string, T>[]),
          insertTuple,
        ]
      } else {
        // We are in the first case
        // copy the value at that position
        const collidedTuple = storage[index] as Tuple2<string, T>
        // Create a new empty array, add the copied value, add the new tuple
        storage[index] = [collidedTuple, insertTuple]
      }
    } else {
      storage[index] = insertTuple
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
    // TODO: optimize, this is a liner operation where we need to perform it in constant time!
    // TODO: introduce new private properties (entriesNumber, bucketsNumber) to track the load factor
    const rowsTotalNumber = this._storage.reduce(
      (acc, cur) => (cur === null ? acc : acc + 1),
      0
    )

    return Math.floor((rowsTotalNumber / this.size) * 100)
  }

  private makeTuple2(key: string, value: T): Tuple2<string, T> {
    return [key, value]
  }

  private resizeStorage(): void {
    const doubleSize = this.size * 2
    const _newStorage = Array(doubleSize).fill(null) as Storage<T>
    this._storage.forEach((row) => {
      if (row !== null) {
        // Row can be a Tuple2<string, T> | Array<Tuple2<string, T>>
        if (Array.isArray(row[0])) {
          // Row is Array<Tuple2<string, T>>
          ;(row as Tuple2<string, T>[]).forEach((tuple) => {
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
            tuple: row as Tuple2<string, T>,
          })
        }
      }
    })

    // Replace the old storage with the new one
    this._storage = _newStorage
  }
}


// Examples:
// const testHashTable = new HashTableClass<number>()
// testHashTable.insert('one', 1)
// testHashTable.insert('two', 2)
// testHashTable.insert('three', 3)
// testHashTable.insert('three', 3)
// testHashTable.insert('four', 4)
// testHashTable.insert('five', 5)
// testHashTable.insert('six', 6)
// testHashTable.insert('seven', 7)
// testHashTable.insert('eight', 8)
// testHashTable.insert('nine', 9)
// testHashTable.retrieve('six')
// testHashTable.retrieve('two')
// testHashTable.retrieve('five')
// testHashTable.toString()
// testHashTable.remove('six')
// testHashTable.toString()
// testHashTable.remove('two')
// testHashTable.toString()
// testHashTable.remove('nine')
// testHashTable.toString()
