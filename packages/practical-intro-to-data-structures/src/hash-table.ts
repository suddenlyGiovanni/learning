/* eslint-disable no-magic-numbers */
/* eslint-disable no-underscore-dangle, class-methods-use-this, multiline-comment-style */

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
   * Returns the value associated with a key
   * @template T
   * @param {string} key - the key to search for
   * @returns {T} value - the value associated with the key
   */
  retrieve(key: string): T
}

export type Tuple2<Key, Value> = [Key, Value]

type Storage<T> = Array<null | Tuple2<string, T> | Array<Tuple2<string, T>>>

/** Class representing a Hash Table */
export class HashTableClass<T> implements HashTableClass<T> {
  // { _storage: [[key, value], [key, value]]}
  private _storage: Storage<T>

  public constructor() {
    this._storage = Array(10) as null[]
  }

  /**
   * Inserts a new key-value pair
   */
  public insert(key: string, value: T): void {
    // Check if the saturation of the storage
    this.checkStorageSaturation()

    const tuple = this.makeTuple2(key, value)
    this._insert({ size: this.size, storage: this._storage, tuple })
  }

  /**
   * Deletes a key-value pair and return the deleted value
   */
  public remove(key: string): T {}

  /*
   * Returns the value associated with a key
   */
  public retrieve(key: string): T {
    const index = this._hash(key, this.size)
    const row = this._storage[index]
    // Row can be a Tuple2<string, T> | Array<Tuple2<string, T>>
    if (Array.isArray(row![0])) {
      // Row is Array<Tuple2<string, T>>
      const tuple = ((row as unknown) as Tuple2<string, T>[]).find(
        ([_key]) => key === _key
      )
      const [_, value] = tuple as Tuple2<string, T>
      return value //?
    }
    // Row is Tuple2<string, T>
    const [_, value] = (row as unknown) as Tuple2<string, T>
    return value //?
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
    const index = this._hash(key, size) //?

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

  private checkStorageSaturation(): void {
    const saturationPercentage = this.storageSaturationPercentage() //?
    if (saturationPercentage >= 50) {
      // If we get to 50% then we need to resize the array and re-hash all the entries
      this.resizeStorage()
    }
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
            this._insert({ size: doubleSize, storage: _newStorage, tuple })
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

  /**
   * Calculates the saturation percentage of the storage
   * @returns {number} saturation in percentage
   */
  private storageSaturationPercentage(): number {
    const hashRowsNumberTotal = this._storage.reduce((acc, cur) => {
      return cur === null ? acc : acc + 1
    }, 0)

    return Math.floor((hashRowsNumberTotal / this.size) * 100)
  }
}

const testHashTable = new HashTableClass<number>()

testHashTable.insert('one', 1)

testHashTable.insert('two', 2)

testHashTable.insert('three', 3)

testHashTable.insert('three', 3)

testHashTable.insert('four', 4)

testHashTable.insert('five', 5)

testHashTable.insert('six', 6)

testHashTable.insert('seven', 7)

testHashTable.insert('eight', 8)

testHashTable.retrieve('six') //?

testHashTable.retrieve('two') //2

testHashTable.retrieve('five') //?

testHashTable.toString() //?
