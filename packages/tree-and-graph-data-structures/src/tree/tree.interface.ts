export interface ITreeNode<T> {
  children: ITree<T>[]
  value: T
}

/**
 * # Tree interface
 * @template T
 *
 * Common operation on tree:
 * - Enumerating all the items
 * - Enumerating a section of a tree
 * - Searching for an item
 * - Adding a new item at a certain position on the tree
 * - Deleting an item
 * - Pruning: Removing a whole section of a tree
 * - Grafting: Adding a whole section to a tree
 * - Finding the root for any node
 * - Finding the lowest common ancestor of two nodes
 */

export interface ITree<T> extends ITreeNode<T> {
  contains(searchValue: T): boolean
  insert(parentTree: ITree<T>, value: T): void

  /**
   * Adds a new value as a child of the tree
   * @param {T} value - the value to add
   */
  insertChild(value: T): void

  /**
   * Removes a value from the tree
   * @param {T} value - the value to remove
   */
  remove(value: T): void

  reorder(nodeValue1: T, nodeValue2: T): void
}
