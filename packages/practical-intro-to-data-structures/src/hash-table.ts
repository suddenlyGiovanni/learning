/** Class representing a Hash Table */

export class HashTable<T> {
  private _storage: T[]

  public constructor() {
    this._storage = []
  }

  /*
   * Inserts a new key-value pair
   * @param {string} key - the key associated with the value
   * @param {*} value - the value to insert
   */
  public insert() {}

  /*
   * Deletes a key-value pair
   * @param {string} key - the key associated with the value
   * @return {*} value - the deleted value
   */
  public remove() {}

  /*
   * Returns the value associated with a key
   * @param {string} key - the key to search for
   * @return {*} - the value associated with the key
   */
  public retrieve() {}

  /*
   * Hashes string value into an integer that can be mapped to an array index
   * @param {string} str - the string to be hashed
   * @param {number} n - the size of the storage array
   * @return {number} - an integer between 0 and n
   */
  private _hash(str, n) {
    let sum = 0
    for (let i = 0; i < str.length; i++) sum += str.charCodeAt(i) * 3

    return sum % n
  }

  /** For debugging purpose */
  public toString(): string {
    return JSON.stringify(this, null, 2)
  }
}
