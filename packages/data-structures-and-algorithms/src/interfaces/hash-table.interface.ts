
/**
 * @export
 * @interface IHashTable
 * @template T
 */
export interface IHashTable<T> {
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
  remove(key: string): undefined | T

  /**
   * Given an existing `key`, it returns the associated `value`
   * otherwise returns `undefined`
   * @template T
   * @param {string} key - the key to search for
   * @returns {T | undefined} value - the value associated with the key or undefined
   */
  retrieve(key: string): undefined | T
}
